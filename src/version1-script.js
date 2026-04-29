import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

/**
 * Base
 */
// Debug
const gui = new GUI()
const properties = {}
properties.action = 'Walk'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Models
 */
const manager = new THREE.LoadingManager()
manager.onStart = function ( url, itemsLoaded, itemsTotal ) {
	console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' )
}

manager.onLoad = function ( ) {
	console.log( 'Loading complete!')
}

manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
	console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' )
}

manager.onError = function ( url ) {
	console.log( 'There was an error loading ' + url )
}

const dracoLoader = new DRACOLoader(manager)
dracoLoader.setDecoderPath('./draco/')
const gltfLoader = new GLTFLoader(manager)
gltfLoader.setDRACOLoader(dracoLoader)

// // This can be used for loading gltf, gltf-binary, gltf-embedded, gltf-Draco(only if you supplied draco loader)
// gltfLoader.load(
//     '/models/Duck/glTF/Duck.gltf',
//     (gltf) =>
//     {
//         // console.log(gltf.scene.children)
//         // while(gltf.scene.children.length)
//         // {
//         //     scene.add(gltf.scene.children[0])
//         // }
//         const children = [...gltf.scene.children]
//         for( const child of children)
//         {
//             scene.add(child)
//         }
//     }
// )

/**
 * Fox
 */

// This is how you load animations
// and how you create gui for animation
let mixer = null
let activeAction = null
let previousAction = null
const actions = {}
gltfLoader.load(
    './models/Fox/glTF/Fox.gltf',
    (gltf) =>
    {
        mixer = new THREE.AnimationMixer(gltf.scene)
        for(const action of gltf.animations)
        {
            actions[action.name] = mixer.clipAction(action)
        }
        activeAction = actions.Walk
        activeAction.play()
        createGui()
        gltf.scene.scale.set(0.025,0.025,0.025)
        gltf.scene.position.set(0,6,0)
        scene.add(gltf.scene)
    }
)

const createGui = () =>
{
    const actionCtrl = gui.add(properties,'action',['Run','Walk','Survey']).name('Active action')
    actionCtrl.onChange(
        ()=>
        {
            previousAction = activeAction;
            activeAction = actions[ properties.action ];

            if ( previousAction !== activeAction ) {

                previousAction.fadeOut( 0.5 );

            }

            activeAction
                .reset()
                .setEffectiveTimeScale( 1 )
                .setEffectiveWeight( 1 )
                .fadeIn( 0.5 )
                .play();
        }
    )
}

/**
 * Apple
 */
let tyre = null

gltfLoader.load(
    './models/Tyre/old_tyre_1k.gltf',
    (gltf) =>
    {
        console.log(gltf.scene.children[0])
        tyre = gltf.scene.children[0]
        tyre.scale.set(20,20,20)
        tyre.rotation.y = -Math.PI * 0.5
        scene.add(tyre)
        // console.log(gltf.scene.children[0])
    }
)

/**
 * Floor
 */
// const floor = new THREE.Mesh(
//     new THREE.PlaneGeometry(10, 10),
//     new THREE.MeshStandardMaterial({
//         color: '#444444',
//         metalness: 0,
//         roughness: 0.5
//     })
// )
// floor.receiveShadow = true
// floor.rotation.x = - Math.PI * 0.5
// scene.add(floor)

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.8)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.camera.left = - 7
directionalLight.shadow.camera.top = 7
directionalLight.shadow.camera.right = 7
directionalLight.shadow.camera.bottom = - 7
directionalLight.position.set(5, 5, 5)
scene.add(directionalLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

let zoom = 13

let aspect = sizes.width / sizes.height
let left = -aspect * zoom
let right = aspect * zoom

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    aspect = sizes.width / sizes.height
    left = -aspect * zoom
    right = aspect * zoom
    camera.left = left
    camera.right = right
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.OrthographicCamera(left , right, 1 * zoom , -1 * zoom , 0.1, 100)
camera.position.x = 4
camera.position.y = 4
camera.position.z = 4
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.target.set(0, 0.75, 0)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    // Play animation
    if(mixer)
    {
        mixer.update(deltaTime)
    }

    if(tyre){
        tyre.rotation.x -= 0.008
    }

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()