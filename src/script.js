import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { HDRCubeTextureLoader } from 'three/examples/jsm/loaders/HDRCubeTextureLoader.js'

/**
 * Debug GUI
 */
const gui = new GUI()

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

/**
 * Loading Manager
 */
const loadingManager = new THREE.LoadingManager()
loadingManager.onStart = function ( url, itemsLoaded, itemsTotal ) {
    console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' )
}

loadingManager.onLoad = function ( ) {
    console.log( 'Loading complete!')
}

loadingManager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
    console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' )
}

loadingManager.onError = function ( url ) {
    console.log( 'There was an error loading ' + url )
}

/**
 * Loaders
 */
const textureLoader = new THREE.TextureLoader(loadingManager)

const doorColorTexture = textureLoader.load('./textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('./textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('./textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('./textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('./textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('./textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('./textures/door/roughness.jpg')
const matcapTexture = textureLoader.load('./textures/matcaps/7.png')
const gradientTexture = textureLoader.load('./textures/gradients/3.jpg')

doorColorTexture.colorSpace = THREE.SRGBColorSpace
matcapTexture.colorSpace = THREE.SRGBColorSpace

// Scene
const scene = new THREE.Scene()

/**
 * Lights
 */
// const ambientLight = new THREE.AmbientLight(0xffffff, 1)
// scene.add(ambientLight)

// const pointLight =  new THREE.PointLight(0xffffff,30)
// pointLight.position.x = 2
// pointLight.position.y = 3
// pointLight.position.z = 4
// scene.add(pointLight)

/**
 * Environment map
 */
const hdrCubeTextureLoader = new HDRCubeTextureLoader(loadingManager)
hdrCubeTextureLoader.hdrLoader.load('./textures/environmentMap/2k.hdr', (environmentMap)=>{
    environmentMap.mapping = THREE.EquirectangularReflectionMapping
    scene.background = environmentMap
    scene.environment = environmentMap
})

/**
 * Materials
 */
// // Mesh Basic Material
// const material =  new THREE.MeshBasicMaterial()
// material.map = doorColorTexture
// material.color = new THREE.Color(0xff0000)
// material.wireframe = true
// material.transparent = true
// material.opacity = 0.2
// material.alphaMap = doorAlphaTexture
// material.side = THREE.DoubleSide

// // Mesh Normal Material
// const material = new THREE.MeshNormalMaterial()
// material.flatShading = true

// // Mesh Matcap Material
// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcapTexture

// // Mesh Depth Material
// const material = new THREE.MeshDepthMaterial()

// // Mesh Lambert Material
// const material = new THREE.MeshLambertMaterial()

// // Mesh Phong Material
// const material = new THREE.MeshPhongMaterial()
// material.shininess = 100
// material.specular = new THREE.Color(0x1188ff)

// // Mesh Toon Material
// const material = new THREE.MeshToonMaterial()
// gradientTexture.generateMipmaps = false
// gradientTexture.minFilter = THREE.NearestFilter
// gradientTexture.magFilter = THREE.NearestFilter
// material.gradientMap = gradientTexture

// // Mesh Standard Material
// const material = new THREE.MeshStandardMaterial()
// material.metalness = 1
// material.roughness = 1
// material.map = doorColorTexture
// material.aoMap = doorAmbientOcclusionTexture
// material.aoMapIntensity = 1
// material.displacementMap = doorHeightTexture
// material.displacementScale = 0.1
// material.metalnessMap = doorMetalnessTexture
// material.roughnessMap = doorRoughnessTexture
// material.normalMap = doorNormalTexture
// material.normalScale.set(0.5,0.5)
// material.transparent = true
// material.alphaMap = doorAlphaTexture

// gui.add(material,'metalness').min(0).max(1).step(0.0001)
// gui.add(material,'roughness').min(0).max(1).step(0.0001)

// Mesh Standard Material
const material = new THREE.MeshPhysicalMaterial()
material.metalness = 0
material.roughness = 0
// material.map = doorColorTexture
// material.aoMap = doorAmbientOcclusionTexture
// material.aoMapIntensity = 1
// material.displacementMap = doorHeightTexture
// material.displacementScale = 0.1
// material.metalnessMap = doorMetalnessTexture
// material.roughnessMap = doorRoughnessTexture
// material.normalMap = doorNormalTexture
// material.normalScale.set(0.5,0.5)
// material.transparent = true
// material.alphaMap = doorAlphaTexture

material.clearcoat = 0
material.clearcoatRoughness = 0

gui.add(material,'clearcoat').min(0).max(1).step(0.0001)
gui.add(material,'clearcoatRoughness').min(0).max(1).step(0.0001)

material.sheen = 0
material.sheenRoughness = 0
material.sheenColor.set(1,1,1)

gui.add(material,'sheen').min(0).max(1).step(0.0001)
gui.add(material,'sheenRoughness').min(0).max(1).step(0.0001)
gui.addColor(material,'sheenColor')

material.iridescence = 0
material.iridescenceIOR = 1
material.iridescenceThicknessRange = [100,800]

gui.add(material,'iridescence').min(0).max(1).step(0.0001)
gui.add(material,'iridescenceIOR').min(1).max(2.333).step(0.0001)
gui.add(material.iridescenceThicknessRange,'0').min(1).max(1000).step(1)
gui.add(material.iridescenceThicknessRange,'1').min(1).max(1000).step(1)

material.transmission = 0
material.ior = 2.417
material.thickness = 0.5
gui.add(material,'transmission').min(0).max(1).step(0.0001)
gui.add(material,'ior').min(1).max(10).step(0.0001)
gui.add(material,'thickness').min(0).max(1).step(0.0001)

gui.add(material,'metalness').min(0).max(1).step(0.0001)
gui.add(material,'roughness').min(0).max(1).step(0.0001)

const diamondMaterial = new THREE.MeshPhysicalMaterial()
diamondMaterial.metalness = 0
diamondMaterial.roughness = 0
diamondMaterial.flatShading = true
diamondMaterial.transmission = 1
diamondMaterial.ior = 2.417
diamondMaterial.thickness = 1
gui.add(diamondMaterial,'transmission').min(0).max(1).step(0.0001)
gui.add(diamondMaterial,'ior').min(1).max(10).step(0.0001)
gui.add(diamondMaterial,'thickness').min(0).max(1).step(0.0001)

gui.add(diamondMaterial,'metalness').min(0).max(1).step(0.0001)
gui.add(diamondMaterial,'roughness').min(0).max(1).step(0.0001)

/**
 * Objects
 */
const diamondpoints = [
    new THREE.Vector2(0,0),
    new THREE.Vector2(0.5,0.5),
    new THREE.Vector2(0.25,0.75),
    new THREE.Vector2(0,0.75)]
const diamondGeometry = new THREE.LatheGeometry( diamondpoints,7 )
diamondGeometry.translate(0,-0.5,0)

const sphereGeometry = new THREE.SphereGeometry(0.5,64,64)
// const planeGeometry = new THREE.PlaneGeometry(1,1,64,64)
const torusGeometry = new THREE.TorusGeometry(0.3,0.2,64,128)

const diamond = new THREE.Mesh( diamondGeometry, diamondMaterial );
const sphere = new THREE.Mesh(sphereGeometry,material)
// const plane = new THREE.Mesh(planeGeometry,material)
const torus = new THREE.Mesh(torusGeometry,material)

// diamond.position.y = -0.5
sphere.position.x = 1.25
torus.position.x = -1.25

scene.add(diamond,sphere,torus)

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
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
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
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    sphere.rotation.y = 0.1 * elapsedTime
    diamond.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime
    
    sphere.rotation.x = -0.15 * elapsedTime
    diamond.rotation.x = -0.15 * elapsedTime
    torus.rotation.x = -0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()