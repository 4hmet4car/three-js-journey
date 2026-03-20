import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import GUI from 'lil-gui'

/**
 * Controls GUI
 */
const gui = new GUI()
gui.close()

// GUI Folders
const animations = gui.addFolder('Animation')
const textureTweaks = gui.addFolder('Texture')

/**
 * Textures
 */
// Loading Manager
const loadingManager = new THREE.LoadingManager()
// Progression Report
loadingManager.onStart = () =>
{
    console.log('Start')
}
loadingManager.onLoad = () =>
{
    console.log('Loaded')
}
loadingManager.onProgress = (url) =>
{
    console.log('Loading ' + url)
}
loadingManager.onError = () =>
{
    console.log('Error')
}

// Texture Loader
const textureLoader = new THREE.TextureLoader(loadingManager)
// Loading Textures
const colorTexture = textureLoader.load('/textures/minecraft.png')
colorTexture.colorSpace = THREE.SRGBColorSpace // You have to indocate the correct color space
const alphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const heightTexture = textureLoader.load('/textures/door/height.jpg')
const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const normalTexture = textureLoader.load('/textures/door/normal.jpg')

// Texture Wrapping
colorTexture.wrapS = THREE.RepeatWrapping
colorTexture.wrapT = THREE.RepeatWrapping

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color( 0x71c0a7 );

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ map: colorTexture })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const zoom = 2

let aspect = (sizes.width / sizes.height) * zoom

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    aspect = (sizes.width / sizes.height) * zoom

    // Update camera
    // camera.aspect = sizes.width / sizes.height
    camera.left = -aspect
    camera.right = aspect
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.OrthographicCamera( -aspect, aspect, zoom, -zoom, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 1
camera.zoom = 1
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

const debugObject = {}

debugObject.spin = ()=>
{
    gsap.to(mesh.rotation, { y: mesh.rotation.y + Math.PI / 2})
}

animations
    .add(debugObject, 'spin')

textureTweaks
    .add(colorTexture.repeat, 'x')
    .min(1)
    .max(20)
    .step(1)
    .name('repeat x')

textureTweaks
    .add(colorTexture.repeat, 'y')
    .min(1)
    .max(20)
    .step(1)
    .name('repeat y')

textureTweaks
    .add(colorTexture.offset, 'x')
    .min(0)
    .max(1)
    .step(0.01)
    .name('offset x')

textureTweaks
    .add(colorTexture.offset, 'y')
    .min(0)
    .max(1)
    .step(0.01)
    .name('offset y')

textureTweaks
    .add(colorTexture, 'rotation')
    .min(0)
    .max(Math.PI)
    .step(0.01)
    .name('rotation')

textureTweaks
    .add(colorTexture.center, 'x')
    .min(0)
    .max(1)
    .step(0.01)
    .name('center x')

textureTweaks
    .add(colorTexture.center, 'y')
    .min(0)
    .max(1)
    .step(0.01)
    .name('center y')

colorTexture.generateMipmaps = false
colorTexture.minFilter = THREE.NearestFilter
colorTexture.magFilter = THREE.NearestFilter

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()