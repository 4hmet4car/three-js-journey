import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'

/**
 * Loaders
 */
const manager = new THREE.LoadingManager();
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

const gltfLoader = new GLTFLoader(manager)
const rgbeLoader = new RGBELoader(manager)
const textureLoader = new THREE.TextureLoader(manager)

/**
 * Textures
 */
const floorARMTexture = textureLoader.load('./textures/wood_cabinet_worn_long/wood_cabinet_worn_long_arm_1k.jpg')
const floorColorTexture = textureLoader.load('./textures/wood_cabinet_worn_long/wood_cabinet_worn_long_diff_1k.jpg')
const floorNormalTexture = textureLoader.load('./textures/wood_cabinet_worn_long/wood_cabinet_worn_long_nor_gl_1k.png')

const wallARMTexture = textureLoader.load('./textures/castle_brick_broken_06/castle_brick_broken_06_arm_1k.jpg')
const wallColorTexture = textureLoader.load('./textures/castle_brick_broken_06/castle_brick_broken_06_diff_1k.jpg')
const wallNormalTexture = textureLoader.load('./textures/castle_brick_broken_06/castle_brick_broken_06_nor_gl_1k.png')

floorColorTexture.colorSpace = THREE.SRGBColorSpace
wallColorTexture.colorSpace = THREE.SRGBColorSpace

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Update all materials
 */
const updateAllMaterials = () =>
{
    scene.traverse((child) =>
    {
        if(child.isMesh)
        {
            // Activate shadow here
            child.castShadow = true
            child.receiveShadow = true
        }
    })
}

/**
 * Environment map
 */
// Intensity
scene.environmentIntensity = 0.1
gui
    .add(scene, 'environmentIntensity')
    .min(0)
    .max(10)
    .step(0.001)

// HDR (RGBE) equirectangular
rgbeLoader.load('/environmentMaps/0/2k.hdr', (environmentMap) =>
{
    environmentMap.mapping = THREE.EquirectangularReflectionMapping

    scene.background = environmentMap
    scene.environment = environmentMap
})

/**
 * Directional Light
 */
const directionalLight = new THREE.DirectionalLight()
directionalLight.intensity = 2
directionalLight.position.set(-4,6.5,2.5)
scene.add(directionalLight)

// Shadows
directionalLight.castShadow = true
directionalLight.shadow.camera.near = -5
directionalLight.shadow.camera.far = 20
directionalLight.shadow.camera.top = 10
directionalLight.shadow.camera.bottom = -10
directionalLight.shadow.camera.left = -10
directionalLight.shadow.camera.right = 10
directionalLight.shadow.mapSize.set(1024,1024)
directionalLight.shadow.normalBias = 0.003
directionalLight.shadow.bias = -0.007
gui.add(directionalLight,'castShadow')
gui.add(directionalLight.shadow,'normalBias').min(-0.05).max(0.05).step(0.001)
gui.add(directionalLight.shadow,'bias').min(-0.05).max(0.05).step(0.001)

// Helper
const helper = new THREE.CameraHelper( directionalLight.shadow.camera )
helper.visible = false
scene.add(helper)

// Target
directionalLight.target.position.set(0,0,0)
directionalLight.target.updateWorldMatrix()

// Light Controls
gui.add(directionalLight,'intensity').min(0).max(10).step(0.001).name('LightIntensity')
gui.add(helper,'visible').name('LightHelper')
gui.add(directionalLight.position,'x').min(-10).max(10).step(0.001).name('LightX').onChange(()=>{helper.update()})
gui.add(directionalLight.position,'y').min(-10).max(10).step(0.001).name('LightY').onChange(()=>{helper.update()})
gui.add(directionalLight.position,'z').min(-10).max(10).step(0.001).name('LightZ').onChange(()=>{helper.update()})

/**
 * Models
 */
// // Helmet
// gltfLoader.load(
//     '/models/FlightHelmet/glTF/FlightHelmet.gltf',
//     (gltf) =>
//     {
//         gltf.scene.scale.set(10, 10, 10)
//         scene.add(gltf.scene)

//         updateAllMaterials()
//     }
// )

// Hamburger
gltfLoader.load(
    '/models/hamburger2.glb',
    (gltf) =>
    {
        gltf.scene.scale.set(2, 2, 2)
        scene.add(gltf.scene)

        updateAllMaterials()
    }
)

/**
 * Meshes
 */

// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(8,8),
    new THREE.MeshStandardMaterial({
        transparent: true,
        map: floorColorTexture,
        normalMap: floorNormalTexture,
        roughnessMap: floorARMTexture,
        metalnessMap: floorARMTexture,
        aoMap: floorARMTexture
    })
)
floor.rotation.x = - Math.PI * 0.5

// Wall
const wall = new THREE.Mesh(
    new THREE.PlaneGeometry(8,8),
    new THREE.MeshStandardMaterial({
        transparent: true,
        map: wallColorTexture,
        normalMap: wallNormalTexture,
        roughnessMap: wallARMTexture,
        metalnessMap: wallARMTexture,
        aoMap: wallARMTexture
    })
)
wall.position.y = 4
wall.position.z = - 4

scene.add(wall, floor)

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
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(4, 5, 4)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.target.y = 3.5
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: window.devicePixelRatio > 1 ? false : true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Tone mapping
renderer.toneMapping = THREE.ReinhardToneMapping
renderer.toneMappingExposure = 3

gui
    .add(renderer,'toneMappingExposure')
    .min(0)
    .max(10)
    .step(0.001)

gui
    .add(renderer,'toneMapping',
    {
        NoToneMapping: THREE.NoToneMapping,
        LinearToneMapping: THREE.LinearToneMapping,
        ReinhardToneMapping: THREE.ReinhardToneMapping,
        CineonToneMapping: THREE.CineonToneMapping,
        ACESFilmicToneMapping: THREE.ACESFilmicToneMapping,
    }
)

// Shadows
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

/**
 * Animate
 */
const tick = () =>
{
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()