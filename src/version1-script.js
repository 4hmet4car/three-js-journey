import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
// import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader.js'
// import { GroundedSkybox } from 'three/addons/objects/GroundedSkybox.js'
import { Timer } from 'three/examples/jsm/misc/Timer.js'

/**
 * Loaders
 */
const gltfLoader = new GLTFLoader()

// const cubeTextureLoader = new THREE.CubeTextureLoader()

// const rgbeLoader = new RGBELoader()

// const exrLoader = new EXRLoader()

const textureLoader = new THREE.TextureLoader()


/**
 * Base
 */
// Debug
const gui = new GUI()
gui.close()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Environment Map
 */
scene.environmentIntensity = 1
scene.backgroundBlurriness = 0
scene.backgroundIntensity = 1
// scene.backgroundRotation.x = 1
// scene.environmentRotation.x = 1

gui.add(scene, 'environmentIntensity').min(0).max(10).step(0.001)
gui.add(scene, 'backgroundIntensity').min(0).max(10).step(0.001)
gui.add(scene, 'backgroundBlurriness').min(0).max(1).step(0.001)
gui.add(scene.backgroundRotation, 'y').min(0).max(Math.PI * 2).step(0.001).name('backgroundRotation')
gui.add(scene.environmentRotation, 'y').min(0).max(Math.PI * 2).step(0.001).name('environmentRotation')

// // LDR (Low Dynamic Range) cube texture
// const environmentMap = cubeTextureLoader.load([
//     '/environmentMaps/0/px.png', //Positive X
//     '/environmentMaps/0/nx.png', //Negative X
//     '/environmentMaps/0/py.png', //Positive Y
//     '/environmentMaps/0/ny.png', //Negative Y
//     '/environmentMaps/0/pz.png', //Positive Z
//     '/environmentMaps/0/nz.png', //Negative Z
// ])

// scene.environment = environmentMap
// scene.background = environmentMap

// // HDR (RGBE) texture equirectangular
// rgbeLoader.load('/environmentMaps/0/2k.hdr',(environmentMap)=>{
//     environmentMap.mapping = THREE.EquirectangularReflectionMapping
//     scene.background = environmentMap
//     scene.environment = environmentMap
// })

// // HDR (EXR) texture
// exrLoader.load('/environmentMaps/nvidiaCanvas-4k.exr',(environmentMap)=>{
//     environmentMap.mapping = THREE.EquirectangularReflectionMapping
//     scene.background = environmentMap
//     scene.environment = environmentMap
// })

// // LDR equirectangular
// const environmentMap = textureLoader.load('/environmentMaps/blockadesLabsSkybox/anime_art_style_japan_streets_with_cherry_blossom_.jpg')
// environmentMap.mapping = THREE.EquirectangularReflectionMapping
// environmentMap.colorSpace = THREE.SRGBColorSpace
// scene.background = environmentMap
// scene.environment = environmentMap

// // Ground projected skybox
// rgbeLoader.load('/environmentMaps/2/2k.hdr', (environmentMap) => {
//     environmentMap.mapping = THREE.EquirectangularReflectionMapping
//     scene.environment = environmentMap

//     // Skybox
//     const skybox = new GroundedSkybox(environmentMap,15,70)
//     skybox.position.y = 15
//     scene.add(skybox)
// })

/**
 * Real time environment map
 */
const environmentMap = textureLoader.load('/environmentMaps/blockadesLabsSkybox/interior_views_cozy_wood_cabin_with_cauldron_and_p.jpg')
environmentMap.mapping = THREE.EquirectangularReflectionMapping
environmentMap.colorSpace = THREE.SRGBColorSpace
scene.background = environmentMap

// Holy donut
const holyDonut = new THREE.Mesh(
    new THREE.TorusGeometry(8,0.5),
    new THREE.MeshBasicMaterial({color:new THREE.Color(10,4,2)})
)
holyDonut.position.y = 3.5
holyDonut.layers.enable(1)
scene.add(holyDonut)

// Cube render target
const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(
    256,
    {
        type: THREE.HalfFloatType
    }
)

scene.environment = cubeRenderTarget.texture

// Cube Camera
const cubeCamera = new THREE.CubeCamera(0.1,100,cubeRenderTarget)
cubeCamera.layers.set(1)

/**
 * Torus Knot
 */
const torusKnot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(1, 0.4, 100, 16),
    new THREE.MeshStandardMaterial({
        roughness: 0.3,
        metalness: 1,
        color: 0xaaaaaa
    })
)
torusKnot.position.x = -4
torusKnot.position.y = 4
scene.add(torusKnot)

/**
 * Flight Helmet
 */
gltfLoader.load('/models/FlightHelmet/glTF/FlightHelmet.gltf', (gltf) => {
    gltf.scene.scale.set(10, 10, 10)
    scene.add(gltf.scene)
})

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
camera.position.set(18, 15, 18)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.target.y = 3.5
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
 * Animate
 */
const timer = new Timer()
const tick = () => {
    // Time
    const elapsedTime = timer.getElapsed()
    timer.update()

    // Real time environment map
    if(holyDonut){
        holyDonut.rotation.x = Math.sin(elapsedTime) * 2

        cubeCamera.update(renderer,scene)
    }

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()