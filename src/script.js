import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { Timer } from 'three/examples/jsm/misc/Timer.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

/**
 * Base
 */
// Debug
const gui = new GUI()
gui.close()
const parameters = {}

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Loading Manager
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

/**
 * Loaders
 */
const dracoLoader = new DRACOLoader(manager)
dracoLoader.setDecoderPath('./draco/')
const gltfLoader = new GLTFLoader(manager)
gltfLoader.setDRACOLoader(dracoLoader)

/**
 * Models
 */
let duck = null
gltfLoader.load('./models/Duck/glTF-Draco/Duck.gltf',(gltf)=>{
    duck = gltf.scene
    duck.position.y = -1.2
    scene.add(duck)
})


/**
 * Objects
 */
const spheres = []

const object1 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)
object1.position.x = - 2

spheres.push(object1)

const object2 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)

spheres.push(object2)

const object3 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)
object3.position.x = 2

spheres.push(object3)

object1.updateMatrixWorld()
object2.updateMatrixWorld()
object3.updateMatrixWorld()

scene.add(object1, object2, object3)

/**
 * Raycaster
 */
const raycaster = new THREE.Raycaster()

// const rayOrigin = new THREE.Vector3(-3,0,0)
// const rayDirection = new THREE.Vector3(10,0,0)
// // console.log(rayDirection.length()) // Should be 10
// rayDirection.normalize()
// // console.log(rayDirection.length()) // Should be 1

// raycaster.set(rayOrigin,rayDirection)

// const intersect = raycaster.intersectObject(object2)
// console.log(intersect)

// const intersects = raycaster.intersectObjects([object1,object2,object3])
// console.log(intersects)



/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 8
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight('#ffffff', 0.9)

const directionalLight = new THREE.DirectionalLight('white',2)
directionalLight.position.set(2,2,2)

scene.add(directionalLight, ambientLight)

/**
 * Parameters
 */

parameters.speed = 1
parameters.amplitude = 1

gui.add(parameters, 'speed').min(0.1).max(2).step('0.1')
gui.add(parameters, 'amplitude').min(0.1).max(2).step('0.1')

/**
 * Mouse event listener
 */
const mouse = new THREE.Vector2()

window.addEventListener('mousemove', (_event) => {
    mouse.x = (_event.clientX / sizes.width) * 2 - 1
    mouse.y = -((_event.clientY / sizes.height) * 2 - 1)
    // console.log(mouse.x)
})

window.addEventListener('click',(event)=>{
    if(currentIntersect){
        switch (currentIntersect.object) {
            case object1:
                console.log('click on object 1')
                break;
            
            case object2:
            console.log('click on object 2')
            break;

            case object3:
            console.log('click on object 3')
            break;
    
            default:
                break;
        }
    }
})

/**
 * Witness
 */
let currentIntersect = null

/**
 * Animate
 */
const timer = new Timer()

const tick = () => {
    const elapsedTime = timer.getElapsed()
    timer.update()

    object1.position.y = Math.sin((elapsedTime + 1) * parameters.speed) * parameters.amplitude
    object2.position.y = Math.sin((elapsedTime + 2) * parameters.speed) * parameters.amplitude
    object3.position.y = Math.sin((elapsedTime + 3) * parameters.speed) * parameters.amplitude

    // Cast a ray
    raycaster.setFromCamera(mouse,camera)

    const intersects = raycaster.intersectObjects(spheres)

    for (const sphere of spheres) {
        sphere.material.color.set('red')        
    }

    for (const intersect of intersects) {
        intersect.object.material.color.set('white')    
    }

    // Witness variable for mouse enter and exit
    if (intersects.length) {
        if (!currentIntersect) {
            console.log('mouse enter')
        }
        currentIntersect = intersects[0]
    }else{
        if(currentIntersect){
            console.log('mouse leave')
        }
        currentIntersect = null
    }

    if (duck) {
        const intersect = raycaster.intersectObject(duck)
        if (intersect[0]) {
            duck.scale.set(1.2,1.2,1.2)
        }else{
            duck.scale.set(1,1,1)
        }
    }

    // const rayOrigin = new THREE.Vector3(-3,0,0)
    // const rayDirection = new THREE.Vector3(10,0,0)
    // rayDirection.normalize()

    // raycaster.set(rayOrigin,rayDirection)

    // // const intersect = raycaster.intersectObject(object1)
    // const intersects = raycaster.intersectObjects(spheres)

    // for (const sphere of spheres) {
    //     sphere.material.color.set('red')        
    // }

    // for (const intersect of intersects) {
    //     intersect.object.material.color.set('white')
    // }
    // console.log(intersects)

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()