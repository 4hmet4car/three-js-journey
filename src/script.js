import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

/**
 * Loaders
 */
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('./draco/')
const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)
const rgbeLoader = new RGBELoader()
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
 * Update all materials
 */
const updateAllMaterials = () =>
{
    scene.traverse((child) =>
    {
        if(child.isMesh)
        {
            child.castShadow = true
            child.receiveShadow = true
        }
    })
}

/**
 * Environment map
 */
// Intensity
scene.environmentIntensity = 1
// scene.environmentIntensity = 0 // it was for shadow bias fix
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
const directionalLight = new THREE.DirectionalLight('white',6)
directionalLight.position.set(-4,6.5,2.5)
scene.add(directionalLight)

gui.add(directionalLight,'intensity').min(0).max(10).step(0.001).name('lightIntensity')
gui.add(directionalLight.position, 'x').min(-10).max(10).step(0.001).name('lightX')
gui.add(directionalLight.position, 'y').min(-10).max(10).step(0.001).name('lightY')
gui.add(directionalLight.position, 'z').min(-10).max(10).step(0.001).name('lightZ')

//Shadows
directionalLight.castShadow = true
directionalLight.shadow.camera.far = 15
directionalLight.shadow.mapSize.set(1024,1024)
directionalLight.shadow.normalBias = 0.023
directionalLight.shadow.bias = -0.007

gui.add(directionalLight,'castShadow')
gui.add(directionalLight.shadow,'normalBias').min(-0.05).max(0.05).step(0.001)
gui.add(directionalLight.shadow,'bias').min(-0.05).max(0.05).step(0.001)

//Helper
const directionalLightHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
directionalLightHelper.visible = false
scene.add(directionalLightHelper)

gui.add(directionalLightHelper,'visible').name('directionalLightHelper')

//Target
directionalLight.target.position.set(0,4,0)
directionalLight.target.updateWorldMatrix()

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

// Smeg
gltfLoader.load('/models/smeg.glb',(gltf)=>{
    gltf.scene.scale.set(3, 3, 3)
    scene.add(gltf.scene)
    updateAllMaterials()
})

/**
 * Floor
 */
const floorDiffuseTexture = textureLoader.load('./textures/wood_cabinet_worn_long/wood_cabinet_worn_long_diff_1k.jpg')
const floorNormalTexture = textureLoader.load('./textures/wood_cabinet_worn_long/wood_cabinet_worn_long_nor_gl_1k.png')
const floorARMTexture = textureLoader.load('./textures/wood_cabinet_worn_long/wood_cabinet_worn_long_arm_1k.jpg')

floorDiffuseTexture.colorSpace = THREE.SRGBColorSpace

const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(8,8),
    new THREE.MeshStandardMaterial({
        map: floorDiffuseTexture,
        normalMap: floorNormalTexture,
        aoMap: floorARMTexture,
        roughnessMap: floorARMTexture,
        metalnessMap: floorARMTexture,
    })
)

floor.rotation.x = - Math.PI * 0.5

scene.add(floor)

/**
 * Wall
 */
const wallDiffuseTexture = textureLoader.load('./textures/castle_brick_broken_06/castle_brick_broken_06_diff_1k.jpg')
const wallNormalTexture = textureLoader.load('./textures/castle_brick_broken_06/castle_brick_broken_06_nor_gl_1k.png')
const wallARMTexture = textureLoader.load('./textures/castle_brick_broken_06/castle_brick_broken_06_arm_1k.jpg')

wallDiffuseTexture.colorSpace = THREE.SRGBColorSpace

const wall = new THREE.Mesh(
    new THREE.PlaneGeometry(8,8),
    new THREE.MeshStandardMaterial({
        map: wallDiffuseTexture,
        normalMap: wallNormalTexture,
        aoMap: wallARMTexture,
        roughnessMap: wallARMTexture,
        metalnessMap: wallARMTexture,
    })
)

wall.position.set(0,4,-4)

scene.add(wall)

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
camera.position.set(12, 8, 12)
// camera.position.set(-2, 6, 4) // it was for shadow bias fix
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.target.y = 2
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: window.devicePixelRatio > 1 ? false : true
})
// console.log(renderer)
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Tone Mapping
renderer.toneMapping = THREE.ReinhardToneMapping
renderer.toneMappingExposure = 1
// renderer.toneMappingExposure = 0.5 // it was for shadow bias fix

gui.add(renderer,'toneMapping',{
    No: THREE.NoToneMapping,
    Linear: THREE.LinearToneMapping,
    Reinhard: THREE.ReinhardToneMapping,
    Cineon: THREE.CineonToneMapping,
    ACESFilmic: THREE.ACESFilmicToneMapping,
})

gui.add(renderer, 'toneMappingExposure').min(0).max(10).step(0.001)

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