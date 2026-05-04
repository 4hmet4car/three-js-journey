import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
// import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader.js'
// import { GroundedSkybox } from 'three/addons/objects/GroundedSkybox.js'

/**
 * Loaders
 */
// Loading Manager
const manager = new THREE.LoadingManager();
manager.onStart = function ( url, itemsLoaded, itemsTotal ) {
	console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
};

manager.onLoad = function ( ) {
	console.log( 'Loading complete!');
};

manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
	console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
};

manager.onError = function ( url ) {
	console.log( 'There was an error loading ' + url );
};

// GLTF Loader
const gltfloader = new GLTFLoader(manager)

// Cube Map Loader
// const cubeTextureLoader = new THREE.CubeTextureLoader(manager)

// RGBE Loader (HDRI Loader)
// const rgbeLoader = new RGBELoader(manager)

// EXR Loader
// const exrLoader = new EXRLoader(manager)

// Texture Loader
const textureLoader =  new THREE.TextureLoader(manager)

/**
 * Base
 */
// Debug
const gui = new GUI({
    width: 300,
})
gui.close()
const parameters = {}
parameters.lockEnvBGRotation = true

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Environment Map
 */
scene.environmentIntensity = 1
scene.backgroundIntensity = 1
scene.backgroundBlurriness = 0
scene.backgroundRotation.y = 0
scene.environmentRotation.y = 0

// // LDR cube texture
// const environmentMap = cubeTextureLoader.load([
//     './environmentMaps/0/px.png',
//     './environmentMaps/0/nx.png',
//     './environmentMaps/0/py.png',
//     './environmentMaps/0/ny.png',
//     './environmentMaps/0/pz.png',
//     './environmentMaps/0/nz.png'
// ])

// scene.environment = environmentMap
// scene.background = environmentMap

// // HDR (RGBE) equirectangular
// rgbeLoader.load('./environmentMaps/blender-2k-2.hdr',(environmentMap)=>
// {
//     environmentMap.mapping = THREE.EquirectangularReflectionMapping

//     scene.environment = environmentMap
//     scene.background = environmentMap
// })

// // EXR equirectangular
// exrLoader.load('./environmentMaps/nvidiaCanvas-4k.exr',(environmentMap)=>
// {
//     environmentMap.mapping = THREE.EquirectangularReflectionMapping

//     scene.environment = environmentMap
//     scene.background = environmentMap
// })

// // JPG equirectangular
// const environmentMap = textureLoader.load('./environmentMaps/blockadesLabsSkybox/anime_art_style_japan_streets_with_cherry_blossom_.jpg')
// environmentMap.colorSpace = THREE.SRGBColorSpace
// environmentMap.mapping = THREE.EquirectangularReflectionMapping
// scene.environment = environmentMap
// scene.background = environmentMap

// // Ground projected skybox
// rgbeLoader.load('./environmentMaps/2/2k.hdr',(environmentMap)=>
// {
//     environmentMap.mapping = THREE.EquirectangularReflectionMapping
//     scene.environment = environmentMap

//     // Skybox
//     const skybox = new GroundedSkybox(environmentMap, 15, 70)
//     // skybox.material.wireframe = true
//     skybox.position.y = 15
//     scene.add(skybox)
// })

/**
 * Realtime environment map
 */
const environmentMap = textureLoader.load('./environmentMaps/blockadesLabsSkybox/interior_views_cozy_wood_cabin_with_cauldron_and_p.jpg')
environmentMap.colorSpace = THREE.SRGBColorSpace
environmentMap.mapping = THREE.EquirectangularReflectionMapping

scene.background = environmentMap

gui
    .add(scene,'environmentIntensity')
    .min(0)
    .max(10)
    .step(0.1)

gui
    .add(scene,'backgroundIntensity')
    .min(0)
    .max(10)
    .step(0.1)

gui
    .add(scene,'backgroundBlurriness')
    .min(0)
    .max(1)
    .step(0.01)

gui
    .add(parameters,'lockEnvBGRotation')
    .onChange(()=>
    {
        scene.environmentRotation.y = scene.backgroundRotation.y
        environmentRotationGUI.updateDisplay()
    })

const backgroundRotationGUI = gui
    .add(scene.backgroundRotation,'y')
    .min(0)
    .max(Math.PI * 2)
    .step(0.01)
    .name('backgroundRotationY')
    .onChange(()=>
    {
        if(parameters.lockEnvBGRotation)
        {
            scene.environmentRotation.y = scene.backgroundRotation.y
            environmentRotationGUI.updateDisplay()
        }
    })

const environmentRotationGUI = gui
    .add(scene.environmentRotation,'y')
    .min(0)
    .max(Math.PI * 2)
    .step(0.01)
    .name('environmentRotationY')
    .onChange(()=>
    {
        if(parameters.lockEnvBGRotation)
        {
            scene.backgroundRotation.y = scene.environmentRotation.y
            backgroundRotationGUI.updateDisplay()
        }
    })

// // Lights
// const ambientLight = new THREE.AmbientLight()
// const directionalLight = new THREE.DirectionalLight()
// directionalLight.position.set(2,2,2)
// scene.add(ambientLight,directionalLight)

/**
 * Torus Knot
 */
const torusKnot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(1, 0.4, 100, 16),
    new THREE.MeshStandardMaterial({ roughness: 0, metalness: 1, color: 0xaaaaaa})
)
torusKnot.position.x = -4
torusKnot.position.y = 4

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(1,16,16),
    new THREE.MeshStandardMaterial({ roughness: 0, metalness: 1, color: 0xaaaaaa})
)
sphere.position.x = 4
sphere.position.y = 4

scene.add(torusKnot, sphere)

/**
 * Holy Donut
 */
const holyDonut = new THREE.Mesh(
    new THREE.TorusGeometry(8,0.5),
    new THREE.MeshBasicMaterial({color: new THREE.Color(10, 4, 2)})
)
// console.log(holyDonut)
holyDonut.position.y = 3.5
scene.add(holyDonut)

// Cube render target for model
const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(
    256,
    {
        type: THREE.HalfFloatType,
    }
)

// scene.environment = cubeRenderTarget.texture

// Cube Camera for model
const cubeCamera = new THREE.CubeCamera(0.1,100,cubeRenderTarget)

// Cube render target for sphere
const sphereRenderTarget = new THREE.WebGLCubeRenderTarget(
    256,
    {
        type: THREE.HalfFloatType,
    }
)

sphere.material.envMap = sphereRenderTarget.texture

// Cube Camera for torus
const sphereCamera = new THREE.CubeCamera(0.1,100,sphereRenderTarget)
gui.add(sphere.position,'x').min(0).max(10).name('sphereX')

// Cube render target for torusKnot
const torusKnotRenderTarget = new THREE.WebGLCubeRenderTarget(
    256,
    {
        type: THREE.HalfFloatType,
    }
)

torusKnot.material.envMap = torusKnotRenderTarget.texture

// Cube Camera for torusKnot
const torusKnotCamera = new THREE.CubeCamera(0.1,100,torusKnotRenderTarget)
gui.add(torusKnot.position,'x').min(-10).max(0).name('torusKnotX')

/**
 * Models
 */
gltfloader.load('./models/FlightHelmet/glTF/FlightHelmet.gltf', (gltf)=>
    {
        const children = [...gltf.scene.children]
        for(const child of children){
            child.scale.set(10,10,10)
            child.material.envMap = cubeRenderTarget.texture
            scene.add(child)
        }
    }
)

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
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()
const tick = () =>
{
    // Time
    const elapsedTime = clock.getElapsedTime()

    // Realtime environment map
    
    // Rotate donut
    if(holyDonut)
    {
        holyDonut.rotation.x = Math.sin(elapsedTime) * 2

        // Update the render target cube
        cubeCamera.update(renderer, scene)
        sphere.visible = false // Prevent self reflection
        torusKnot.visible = false // Prevent self reflection
        sphereCamera.position.copy( sphere.position )
        torusKnotCamera.position.copy( torusKnot.position )
        sphereCamera.update( renderer, scene )
        torusKnotCamera.update( renderer, scene )
        sphere.visible = true
        torusKnot.visible = true
    }

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()