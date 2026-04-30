import * as THREE from 'three'
import { Timer } from 'three/examples/jsm/misc/Timer.js'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

/**
 * Base
 */
// Debug
const gui = new GUI()
gui.close()
const properties = {}
properties.action = 'Walk'
properties.changePage = () =>{
    window.location.href = 'version1.html'
}

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Models
 */
const manager = new THREE.LoadingManager()
manager.onStart = function (url, itemsLoaded, itemsTotal) {
    console.log('Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.')
}

manager.onLoad = function () {
    console.log('Loading complete!')
}

manager.onProgress = function (url, itemsLoaded, itemsTotal) {
    console.log('Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.')
}

manager.onError = function (url) {
    console.log('There was an error loading ' + url)
}

// const dracoLoader = new DRACOLoader(manager)
// dracoLoader.setDecoderPath('./draco/')
const gltfLoader = new GLTFLoader(manager)
// gltfLoader.setDRACOLoader(dracoLoader)

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
    (gltf) => {
        mixer = new THREE.AnimationMixer(gltf.scene)
        gltf.scene.children[0].children[0].castShadow = true
        for (const action of gltf.animations) {
            actions[action.name] = mixer.clipAction(action)
        }
        activeAction = actions.Walk
        activeAction.play()
        createGui()
        gltf.scene.scale.set(0.025, 0.025, 0.025)
        gltf.scene.position.set(0, 5.9, 0)
        scene.add(gltf.scene)
    }
)

const createGui = () => {
    const actionCtrl = gui.add(properties, 'action', ['Run', 'Walk', 'Survey']).name('Active action')
    actionCtrl.onChange(
        (event) => {
            if(event == 'Survey'){
                rotationMultiplierTarget = 0
            }else{
                rotationMultiplierTarget = 0.5
            }

            previousAction = activeAction;
            activeAction = actions[properties.action];

            if (previousAction !== activeAction) {

                previousAction.fadeOut(0.5);

            }

            activeAction
                .reset()
                .setEffectiveTimeScale(1)
                .setEffectiveWeight(1)
                .fadeIn(0.5)
                .play();
        }
    )
    gui.add(properties,'changePage').name('Go to Version 1')
}



/**
 * Apple
 */
let campbell = null

gltfLoader.load(
    './models/Campbell/scene.gltf',
    (gltf) => {
        console.log(gltf.scene.children[0].children[0].children[0].children[0].children[0])
        campbell = gltf.scene.children[0].children[0].children[0].children[0].children[0]
        campbell.material.metalness = 0.05
        campbell.material.roughness = 0.5
        campbell.scale.set(1.75, 1.75, 1.75)
        campbell.rotation.z = Math.PI * 0.5
        campbell.receiveShadow = true
        scene.add(campbell)
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
const ambientLight = new THREE.AmbientLight(0xffffff, 2)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.8)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(512, 512)
directionalLight.shadow.camera.far = 20
directionalLight.shadow.camera.left = - 10
directionalLight.shadow.camera.top = 10
directionalLight.shadow.camera.right = 10
directionalLight.shadow.camera.bottom = - 10
directionalLight.position.set(6, 8, -4)
scene.add(directionalLight)

// const directionalLightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
// directionalLightCameraHelper.visible = true
// scene.add(directionalLightCameraHelper)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

let zoom = 25

let aspect = sizes.width / sizes.height
let left = -aspect * zoom
let right = aspect * zoom

window.addEventListener('resize', () => {
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
const camera = new THREE.OrthographicCamera(left, right, 1 * zoom, -1 * zoom, 0.1, 100)
camera.position.x = 8
camera.position.y = 8
camera.position.z = 8
camera.lookAt(new THREE.Vector3(0,0,0))
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.target.set(0, 0, 0)
// controls.enableDamping = true
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    alpha: true,
    canvas: canvas
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const timer = new Timer()
let previousTime = 0
let rotationMultiplier = 0.5
let rotationMultiplierTarget = 0.5

const tick = () => {
    const elapsedTime = timer.getElapsed()
    timer.update()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    // Play animation
    if (mixer) {
        mixer.update(deltaTime)
    }

    rotationMultiplier = rotationMultiplier + (rotationMultiplierTarget - rotationMultiplier) * 0.15
    if (campbell) {
        campbell.rotation.x -= deltaTime * rotationMultiplier
    }

    // Update controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()