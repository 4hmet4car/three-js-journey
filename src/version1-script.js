import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import GUI from 'lil-gui'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

/**
 * Base
 */
// Debug
// const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Model Loader
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

let model = null

gltfLoader.load(
    './models/Duck/glTF-Draco/Duck.gltf',
    (gltf) =>
    {
        model = gltf.scene
        model.position.y = -1.2
        scene.add(model)
    }
)

/**
 * Objects
 */
const object1 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)
object1.position.x = - 2

const object2 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)

const object3 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)
object3.position.x = 2

scene.add(object1, object2, object3)

/**
 * Raycaster
 */
const raycaster = new THREE.Raycaster()

// const rayOrigin = new THREE.Vector3(-3,0,0)
// const rayDirection = new THREE.Vector3(10,0,0)
// rayDirection.normalize() //Ray direction must be normalized.

// object1.updateMatrixWorld()
// object2.updateMatrixWorld()
// object3.updateMatrixWorld()

// raycaster.set(rayOrigin, rayDirection)

// const intersect = raycaster.intersectObject(object1)
// const intersects = raycaster.intersectObjects([object1,object2,object3])

// console.log(intersect)
// console.log(intersects)



/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
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
 * Mouse event listener
 */
const mouse = new THREE.Vector2()

window.addEventListener(
    'mousemove',
    (cursor)=>
    {
        mouse.x = ((cursor.clientX / sizes.width) - 0.5 ) * 2
        mouse.y = ((cursor.clientY / sizes.height) - 0.5 ) * -2
    }
)

window.addEventListener(
    'click',
    () =>
    {
        if(currentIntersect)
        {
            if(currentIntersect.object===object1)
            {
                console.log('Click object 1')
            }
            if(currentIntersect.object===object2)
            {
                console.log('Click object 2')
            }
            if(currentIntersect.object===object3)
            {
                console.log('Click object 3')
            }
        }
    }
)

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 10
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
const ambientLight = new THREE.AmbientLight()
const directionalLight = new THREE.DirectionalLight()
directionalLight.position.set(3,3,3)
scene.add(ambientLight,directionalLight)

/**
 * Animate
 */
const clock = new THREE.Clock()

let currentIntersect = null

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Animate the objects
    object1.position.y  = Math.sin(elapsedTime)
    object2.position.y  = Math.sin(elapsedTime + 0.5)
    object3.position.y  = Math.sin(elapsedTime + 1)

    // // Raycaster
    // const rayOrigin = new THREE.Vector3(-3,0,0)
    // const rayDirection = new THREE.Vector3(10,0,0)
    // rayDirection.normalize()

    // raycaster.set(rayOrigin,rayDirection)

    // const objectsToTest = [object1,object2,object3]

    // for(const object of objectsToTest)
    // {
    //     object.material.color.set(0xff0000)
    // }
    
    // const intersects = raycaster.intersectObjects(objectsToTest)

    // for(const intersect of intersects)
    // {
    //     intersect.object.material.color.set(0x0000ff)
    // }

    // Raycaster with mouse
    raycaster.setFromCamera(mouse,camera)
    const objectsToTest = [object1,object2,object3]
    for(const object of objectsToTest)
    {
        object.material.color.set(0xff0000)
    }
    const intersects = raycaster.intersectObjects(objectsToTest)
    for(const intersect of intersects)
    {
        intersect.object.material.color.set(0x0000ff)
    }

    if(intersects.length)
    {
        if(!currentIntersect)
        {
            console.log('mouse enter')
        }
        currentIntersect = intersects[0]
    }
    else
    {
        if(currentIntersect)
        {
            console.log('mouse leave')
        }
        currentIntersect = null
    }

    if(model)
    {
        const modelIntersect = raycaster.intersectObject(model)

        if(modelIntersect.length)
        {
            model.scale.set(1.5,1.5,1.5)
        }
        else
        {
            model.scale.set(1,1,1)
        }
    }
    
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()