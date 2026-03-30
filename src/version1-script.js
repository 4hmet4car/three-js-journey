import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import gsap from 'gsap'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'

/**
 * Debug UI
 */
const gui = new GUI({
    width: 350,
    closeFolders: true
})
gui.close()
const moveControls = gui.addFolder('Movement Controls')
const materialControls = gui.addFolder('Material Controls')
const lightControls = gui.addFolder('Light Controls')

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

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
loadingManager.onError = (url) =>
{
    console.log('Error loading ' + url)
}

const textureLoader = new THREE.TextureLoader(loadingManager)

const doorAlpha = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbient = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorColor = textureLoader.load('/textures/door/color.jpg')
const doorHeight = textureLoader.load('/textures/door/height.jpg')
const doorMetalness = textureLoader.load('/textures/door/metalness.jpg')
const doorNormal = textureLoader.load('/textures/door/normal.jpg')
const doorRoughness = textureLoader.load('/textures/door/roughness.jpg')

const matcap = textureLoader.load('/textures/matcaps/8.png')

const gradient = textureLoader.load('/textures/gradients/3.jpg')

doorColor.colorSpace = THREE.SRGBColorSpace
matcap.colorSpace = THREE.SRGBColorSpace


/**
 * Objects - Materials
 */

// MeshBasicMaterial
const basicMaterial = new THREE.MeshBasicMaterial()
basicMaterial.color = new THREE.Color('red')
//basicMaterial.alphaMap = doorAlpha
basicMaterial.side = THREE.DoubleSide

// MeshNormalMaterial
const normalMaterial = new THREE.MeshNormalMaterial()
normalMaterial.color = new THREE.Color('red')
normalMaterial.side = THREE.DoubleSide
//normalMaterial.flatShading = true

// MeshMatcapMaterial
const matcapMaterial = new THREE.MeshMatcapMaterial()
matcapMaterial.matcap = matcap
matcapMaterial.side = THREE.DoubleSide

// MeshDepthMaterial
const depthMaterial = new THREE.MeshDepthMaterial()
depthMaterial.side = THREE.DoubleSide

// MeshLambertMaterial
const lambertMaterial = new THREE.MeshLambertMaterial()
lambertMaterial.side = THREE.DoubleSide

// MeshPhongMaterial
const phongMaterial = new THREE.MeshPhongMaterial()
phongMaterial.shininess = 5
phongMaterial.specular = new THREE.Color(0x1188ff)
phongMaterial.side = THREE.DoubleSide

// MeshToonMaterial
const toonMaterial = new THREE.MeshToonMaterial()
toonMaterial.color = new THREE.Color('red')
gradient.generateMipmaps = false
gradient.minFilter = THREE.NearestFilter
gradient.magFilter = THREE.NearestFilter
toonMaterial.gradientMap = gradient
toonMaterial.side = THREE.DoubleSide

// MeshStandardMaterial
const standardMaterial = new THREE.MeshStandardMaterial()
standardMaterial.side = THREE.DoubleSide

// MeshPhysicalMaterial
const physicalMaterial = new THREE.MeshPhysicalMaterial()
physicalMaterial.side = THREE.DoubleSide
physicalMaterial.clearcoat = 1
physicalMaterial.clearcoatRoughness = 0
physicalMaterial.sheen = 1
physicalMaterial.sheenRoughness = 0.25
physicalMaterial.sheenColor.set(1,1,1)
physicalMaterial.iridescence = 0
physicalMaterial.iridescenceIOR = 1.3
physicalMaterial.iridescenceThicknessRange = [ 100, 400 ]
physicalMaterial.transmission = 1
physicalMaterial.ior = 1.5
physicalMaterial.thickness = 0.5

// Set transparent to true for stability
basicMaterial.transparent = true
normalMaterial.transparent = true
matcapMaterial.transparent = true
depthMaterial.transparent = true
lambertMaterial.transparent = true
phongMaterial.transparent = true
toonMaterial.transparent = true
standardMaterial.transparent = true
physicalMaterial.transparent = true

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 64, 64),
    basicMaterial)
const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1,1,128,128),
    basicMaterial)
const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3,0.2,64,128),
    basicMaterial)

sphere.position.x = -1.5
torus.position.x = 1.5

scene.add(sphere,plane,torus)

// Material Controls
const materials = {}

materials.material = basicMaterial

materialControls
    .add(materials, 'material',
        {
            MeshBasicMaterial: basicMaterial,
            MeshNormalMaterial: normalMaterial,
            MeshMatcapMaterial: matcapMaterial,
            MeshDepthMaterial: depthMaterial,
            MeshLambertMaterial: lambertMaterial,
            MeshPhongMaterial: phongMaterial,
            MeshToonMaterial: toonMaterial,
            MeshStandardMaterial: standardMaterial,
            MeshPhysicalMaterial: physicalMaterial
        })
    .name('Material Type')
    .onChange(()=>
    {
        sphere.material = materials.material
        plane.material = materials.material
        torus.material = materials.material
    })

const materialProperties = {}

materialProperties.opacity = 1

materialControls
    .add(materialProperties, 'opacity')
    .min(0)
    .max(1)
    .step(0.1)
    .onChange(() =>
    {
        basicMaterial.opacity = materialProperties.opacity
        normalMaterial.opacity = materialProperties.opacity
        matcapMaterial.opacity = materialProperties.opacity
        depthMaterial.opacity = materialProperties.opacity
        lambertMaterial.opacity = materialProperties.opacity
        phongMaterial.opacity = materialProperties.opacity
        toonMaterial.opacity = materialProperties.opacity
        standardMaterial.opacity = materialProperties.opacity
        physicalMaterial.opacity = materialProperties.opacity
    })

materialProperties.wireframe = false

materialControls
    .add(materialProperties, 'wireframe')
    .onChange(() =>
    {
        basicMaterial.wireframe = materialProperties.wireframe
        normalMaterial.wireframe = materialProperties.wireframe
        matcapMaterial.wireframe = materialProperties.wireframe
        depthMaterial.wireframe = materialProperties.wireframe
        lambertMaterial.wireframe = materialProperties.wireframe
        phongMaterial.wireframe = materialProperties.wireframe
        toonMaterial.wireframe = materialProperties.wireframe
        standardMaterial.wireframe = materialProperties.wireframe
        physicalMaterial.wireframe = materialProperties.wireframe
    })

materialProperties.colorMap = false

materialControls
    .add(materialProperties, 'colorMap')
    .onChange(() =>
    {
        if(materialProperties.colorMap){
            basicMaterial.map = doorColor
            matcapMaterial.map = doorColor
            depthMaterial.map = doorColor
            lambertMaterial.map = doorColor
            phongMaterial.map = doorColor
            toonMaterial.map = doorColor
            standardMaterial.map = doorColor
            physicalMaterial.map = doorColor
        }else{
            basicMaterial.map.dispose()
            matcapMaterial.map.dispose()
            depthMaterial.map.dispose()
            lambertMaterial.map.dispose()
            phongMaterial.map.dispose()
            toonMaterial.map.dispose()
            standardMaterial.map.dispose()
            physicalMaterial.map.dispose()
            basicMaterial.map = null
            matcapMaterial.map = null
            depthMaterial.map = null
            lambertMaterial.map = null
            phongMaterial.map = null
            toonMaterial.map = null
            standardMaterial.map = null
            physicalMaterial.map = null
        }
    })

materialProperties.aoMap = false

materialControls
    .add(materialProperties, 'aoMap')
    .onChange(() =>
    {
        if(materialProperties.aoMap){
            basicMaterial.aoMap = doorAmbient
            lambertMaterial.aoMap = doorAmbient
            phongMaterial.aoMap = doorAmbient
            toonMaterial.aoMap = doorAmbient
            standardMaterial.aoMap = doorAmbient
            physicalMaterial.aoMap = doorAmbient
        }else{
            basicMaterial.aoMap.dispose()
            lambertMaterial.aoMap.dispose()
            phongMaterial.aoMap.dispose()
            toonMaterial.aoMap.dispose()
            standardMaterial.aoMap.dispose()
            physicalMaterial.aoMap.dispose()
            basicMaterial.aoMap = null
            lambertMaterial.aoMap = null
            phongMaterial.aoMap = null
            toonMaterial.aoMap = null
            standardMaterial.aoMap = null
            physicalMaterial.aoMap = null
        }
    })

materialProperties.displacementMap = false

materialControls
    .add(materialProperties, 'displacementMap')
    .onChange(() =>
    {
        if(materialProperties.displacementMap){
            depthMaterial.displacementMap = doorHeight
            lambertMaterial.displacementMap = doorHeight
            matcapMaterial.displacementMap = doorHeight
            normalMaterial.displacementMap = doorHeight
            phongMaterial.displacementMap = doorHeight
            toonMaterial.displacementMap = doorHeight
            standardMaterial.displacementMap = doorHeight
            physicalMaterial.displacementMap = doorHeight
            depthMaterial.displacementScale = 0.05
            lambertMaterial.displacementScale = 0.05
            matcapMaterial.displacementScale = 0.05
            normalMaterial.displacementScale = 0.05
            phongMaterial.displacementScale = 0.05
            toonMaterial.displacementScale = 0.05
            standardMaterial.displacementScale = 0.05
            physicalMaterial.displacementScale = 0.05
        }else{
            depthMaterial.displacementMap.dispose()
            lambertMaterial.displacementMap.dispose()
            matcapMaterial.displacementMap.dispose()
            normalMaterial.displacementMap.dispose()
            phongMaterial.displacementMap.dispose()
            toonMaterial.displacementMap.dispose()
            standardMaterial.displacementMap.dispose()
            physicalMaterial.displacementMap.dispose()
            /* sphere.geometry.dispose()
            plane.geometry.dispose()
            torus.geometry.dispose()
            sphere.geometry = new THREE.SphereGeometry(0.5, 16, 16)
            plane.geometry = new THREE.PlaneGeometry(1)
            torus.geometry = new THREE.TorusGeometry(0.3,0.2) */
            depthMaterial.displacementMap = null
            lambertMaterial.displacementMap = null
            matcapMaterial.displacementMap = null
            normalMaterial.displacementMap = null
            phongMaterial.displacementMap = null
            toonMaterial.displacementMap = null
            standardMaterial.displacementMap = null
            physicalMaterial.displacementMap = null
        }
    })

materialProperties.metalnessMap = false

materialControls
    .add(materialProperties, 'metalnessMap')
    .onChange(() =>
    {
        if(materialProperties.metalnessMap){
            standardMaterial.metalness = 1
            physicalMaterial.metalness = 1
            standardMaterial.metalnessMap = doorMetalness
            physicalMaterial.metalnessMap = doorMetalness
        }else{
            standardMaterial.metalnessMap.dispose()
            physicalMaterial.metalnessMap.dispose()
            standardMaterial.metalnessMap = null
            physicalMaterial.metalnessMap = null
        }
    })

materialProperties.metalness = 1

materialControls
    .add(materialProperties, 'metalness')
    .min(0)
    .max(1)
    .step(0.1)
    .onChange(() =>
    {
        standardMaterial.metalness = materialProperties.metalness
        physicalMaterial.metalness = materialProperties.metalness
    })

materialProperties.roughnessMap = false

materialControls
    .add(materialProperties, 'roughnessMap')
    .onChange(() =>
    {
        if(materialProperties.roughnessMap){
            standardMaterial.roughness = 1
            physicalMaterial.roughness = 1
            standardMaterial.roughnessMap = doorRoughness
            physicalMaterial.roughnessMap = doorRoughness
        }else{
            standardMaterial.roughnessMap.dispose()
            physicalMaterial.roughnessMap.dispose()
            standardMaterial.roughnessMap = null
            physicalMaterial.roughnessMap = null
        }
    })

materialProperties.roughness = 1

materialControls
    .add(materialProperties, 'roughness')
    .min(0)
    .max(1)
    .step(0.1)
    .onChange(() =>
    {
        standardMaterial.roughness = materialProperties.roughness
        physicalMaterial.roughness = materialProperties.roughness
    })

materialProperties.normalMap = false

materialControls
    .add(materialProperties, 'normalMap')
    .onChange(() =>
    {
        if(materialProperties.normalMap){
            lambertMaterial.normalMap = doorNormal
            matcapMaterial.normalMap = doorNormal
            normalMaterial.normalMap = doorNormal
            phongMaterial.normalMap = doorNormal
            toonMaterial.normalMap = doorNormal
            standardMaterial.normalMap = doorNormal
            physicalMaterial.normalMap = doorNormal
        }else{
            lambertMaterial.normalMap.dispose()
            matcapMaterial.normalMap.dispose()
            normalMaterial.normalMap.dispose()
            phongMaterial.normalMap.dispose()
            toonMaterial.normalMap.dispose()
            standardMaterial.normalMap.dispose()
            physicalMaterial.normalMap.dispose()
            lambertMaterial.normalMap = null
            matcapMaterial.normalMap = null
            normalMaterial.normalMap = null
            phongMaterial.normalMap = null
            toonMaterial.normalMap = null
            standardMaterial.normalMap = null
            physicalMaterial.normalMap = null
        }
    })

materialProperties.alphaMap = false

materialControls
    .add(materialProperties, 'alphaMap')
    .onChange(() =>
    {
        if(materialProperties.alphaMap){
            lambertMaterial.alphaMap = doorAlpha
            depthMaterial.alphaMap = doorAlpha
            matcapMaterial.alphaMap = doorAlpha
            basicMaterial.alphaMap = doorAlpha
            phongMaterial.alphaMap = doorAlpha
            toonMaterial.alphaMap = doorAlpha
            standardMaterial.alphaMap = doorAlpha
            physicalMaterial.alphaMap = doorAlpha
        }else{
            lambertMaterial.alphaMap.dispose()
            depthMaterial.alphaMap.dispose()
            matcapMaterial.alphaMap.dispose()
            basicMaterial.alphaMap.dispose()
            phongMaterial.alphaMap.dispose()
            toonMaterial.alphaMap.dispose()
            standardMaterial.alphaMap.dispose()
            physicalMaterial.alphaMap.dispose()
            lambertMaterial.alphaMap = null
            depthMaterial.alphaMap = null
            matcapMaterial.alphaMap = null
            basicMaterial.alphaMap = null
            phongMaterial.alphaMap = null
            toonMaterial.alphaMap = null
            standardMaterial.alphaMap = null
            physicalMaterial.alphaMap = null
        }
    })

materialProperties.clearcoat = 1

materialControls
    .add(materialProperties, 'clearcoat')
    .min(0)
    .max(1)
    .step(0.1)
    .onChange(() =>
    {
        physicalMaterial.clearcoat = materialProperties.clearcoat
    })

materialProperties.clearcoatRoughness = 0

materialControls
    .add(materialProperties, 'clearcoatRoughness')
    .min(0)
    .max(1)
    .step(0.1)
    .onChange(() =>
    {
        physicalMaterial.clearcoatRoughness = materialProperties.clearcoatRoughness
    })

materialProperties.sheen = 1

materialControls
    .add(materialProperties, 'sheen')
    .min(0)
    .max(1)
    .step(0.1)
    .onChange(() =>
    {
        physicalMaterial.sheen = materialProperties.sheen
    })

materialProperties.sheenRoughness = 0

materialControls
    .add(materialProperties, 'sheenRoughness')
    .min(0)
    .max(1)
    .step(0.1)
    .onChange(() =>
    {
        physicalMaterial.sheenRoughness = materialProperties.sheenRoughness
    })

materialProperties.sheenColor = '#ffffff'

materialControls
    .addColor(materialProperties, 'sheenColor')
    .onChange(() =>
    {
        physicalMaterial.sheenColor.set(materialProperties.sheenColor)
    })

materialProperties.iridescence = 0

materialControls
    .add(materialProperties, 'iridescence')
    .min(0)
    .max(1)
    .step(0.1)
    .onChange(() =>
    {
        physicalMaterial.iridescence = materialProperties.iridescence
    })

materialProperties.iridescenceIOR = 1.3

materialControls
    .add(materialProperties, 'iridescenceIOR')
    .min(1)
    .max(2.333)
    .step(0.001)
    .onChange(() =>
    {
        physicalMaterial.iridescenceIOR = materialProperties.iridescenceIOR
    })

materialProperties.iridescenceThicknessRange = [ 100, 400 ]

materialControls
    .add(materialProperties.iridescenceThicknessRange, '0')
    .name('Irridescence Lower Range')
    .min(0)
    .max(1000)
    .step(1)
    .onChange(() =>
    {
        physicalMaterial.iridescenceThicknessRange[0] = materialProperties.iridescenceThicknessRange[0]
    })

materialControls
    .add(materialProperties.iridescenceThicknessRange, '1')
    .name('Irridescence Higher Range')
    .min(0)
    .max(1000)
    .step(1)
    .onChange(() =>
    {
        physicalMaterial.iridescenceThicknessRange[1] = materialProperties.iridescenceThicknessRange[1]
    })

materialProperties.transmission = 1

materialControls
    .add(materialProperties, 'transmission')
    .min(0)
    .max(1)
    .step(0.1)
    .onChange(() =>
    {
        physicalMaterial.transmission = materialProperties.transmission
    })

materialProperties.ior = 1.5

materialControls
    .add(materialProperties, 'ior')
    .name('transmissionIOR')
    .min(1)
    .max(10)
    .step(0.001)
    .onChange(() =>
    {
        physicalMaterial.ior = materialProperties.ior
    })

materialProperties.thickness = 0.5

    materialControls
    .add(materialProperties, 'thickness')
    .min(0)
    .max(1)
    .step(0.1)
    .onChange(() =>
    {
        physicalMaterial.thickness = materialProperties.thickness
    })


/**
 * Lights
 */

// Ambient Light
const ambientLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambientLight)

// Point Light
const pointLight = new THREE.PointLight(0xffffff, 30)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

const pointLightAxes = new THREE.AxesHelper()
console.log(pointLightAxes)
pointLightAxes.position.x = pointLight.position.x
pointLightAxes.position.y = pointLight.position.y
pointLightAxes.position.z = pointLight.position.z
pointLightAxes.lookAt(0,0,0)
pointLightAxes.visible = false
scene.add(pointLightAxes)

// Light Controls
lightControls
    .add(pointLightAxes,'visible')
    .name('Point Light Helper')

lightControls
    .add(ambientLight, 'intensity')
    .name('Ambient Light Intensity')
    .min(0)
    .max(10)
    .step(0.1)

lightControls
    .add(pointLight, 'intensity')
    .name('Point Light Intensity')
    .min(20)
    .max(1000)
    .step(1)

lightControls
    .add(pointLight.position, 'x')
    .name('Point Light X')
    .min(-10)
    .max(10)
    .step(0.1)
    .onChange((pos) =>
    {
       pointLightAxes.position.x = pos
       pointLightAxes.lookAt(0,0,0)
    })

lightControls
    .add(pointLight.position, 'y')
    .name('Point Light Y')
    .min(-10)
    .max(10)
    .step(0.1)
    .onChange((pos) =>
    {
       pointLightAxes.position.y = pos
       pointLightAxes.lookAt(0,0,0)
    })

lightControls
    .add(pointLight.position, 'z')
    .name('Point Light Z')
    .min(-10)
    .max(10)
    .step(0.1)
    .onChange((pos) =>
    {
       pointLightAxes.position.z = pos
       pointLightAxes.lookAt(0,0,0)
    })

/**
 * Environment map
 */
const environment = {}

const rgbeLoader = new RGBELoader()
rgbeLoader.load('./textures/environmentMap/2k.hdr', (environmentMap) =>
{
    environmentMap.mapping = THREE.EquirectangularReflectionMapping

    environment.map = environmentMap
})

environment.isMap = false

lightControls
    .add(environment, 'isMap')
    .name('Environment Map')
    .onChange(() =>
    {
        if(environment.isMap){
            scene.background = environment.map
            scene.environment = environment.map
        }else{
            scene.background = null
            scene.environment = null
        }
    })



/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1 * 3
camera.position.y = 1 * 3
camera.position.z = 2 * 3
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

const movementObject = {}

movementObject.rotation = gsap.to(
    [sphere.rotation,plane.rotation,torus.rotation],
    {
        duration: 20,
        y : Math.PI * 2,
        x : -Math.PI * 2,
        repeat: -1,
        ease: 'none',
        paused: false
    })

// Animation controls
moveControls
    .add(movementObject.rotation, 'pause')
moveControls
    .add(movementObject.rotation, 'resume')

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