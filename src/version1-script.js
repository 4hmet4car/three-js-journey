import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

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
 * Textures
 */
// Loading Manager
const loadingManager = new THREE.LoadingManager();
loadingManager.onStart = function ( url, itemsLoaded, itemsTotal ) {
    console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
};

loadingManager.onLoad = function ( ) {
    console.log( 'Loading complete!');
};

loadingManager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
    console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
};

loadingManager.onError = function ( url ) {
    console.log( 'There was an error loading ' + url );
};


const textureLoader = new THREE.TextureLoader(loadingManager)

const particleTextures = {}
for(let i = 1; i < 14; i++)
{
    particleTextures[i-1] = textureLoader.load('./textures/particles/' + i + '.png' )
}

/**
 * Galaxy
 */
const parameters = {}
parameters.count = 100000
parameters.size = 0.1
parameters.radius = 20
parameters.branches = 8
parameters.spin = 1
parameters.randomness = 0.4
parameters.randomnessPower = 3
parameters.insideColor = 0x1b3984
parameters.outsideColor = 0xff6030
parameters.texture = particleTextures[7]
parameters.speed = 1
parameters.jets = 7
parameters.jetDensity = 7

let particleGeometry = null
let particleMaterial = null
let particles = null

const generateGalaxy = () =>
{
    console.log("IM THE CREEPER, CATCH ME IF YOU CAN!")

    // Destroy old galaxy
    if(particles !== null)
    {
        particleGeometry.dispose()
        particleMaterial.dispose()
        scene.remove(particles)
    }

    // Geometry
    particleGeometry = new THREE.BufferGeometry

    const particlePositions = new Float32Array(parameters.count * 3)
    const particleColors = new Float32Array(parameters.count * 3)

    const colorInside = new THREE.Color(parameters.insideColor)
    const colorOutside = new THREE.Color(parameters.outsideColor)

    for(let i=0; i<parameters.count; i++)
    {
        const i3 = i * 3

        const radius = Math.pow(Math.random(),parameters.randomnessPower) * parameters.radius
        const spinAngle = radius * parameters.spin
        const branchAngle = (i % parameters.branches) * Math.PI * 2 / parameters.branches

        const randomX = Math.pow(Math.random(),parameters.randomnessPower) * parameters.randomness * (Math.random() < 0.5 ? 1 : -1)
        const randomY = Math.pow(Math.random(),parameters.randomnessPower) * parameters.randomness * (Math.random() < 0.5 ? 1 : -1) * Math.pow(parameters.jets, 1 / (parameters.jetDensity * radius))
        const randomZ = Math.pow(Math.random(),parameters.randomnessPower) * parameters.randomness * (Math.random() < 0.5 ? 1 : -1)

        particlePositions[i3 + 0] = Math.cos(branchAngle + spinAngle) * radius + randomX
        particlePositions[i3 + 1] = 0 + randomY
        particlePositions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ

        const mixedColor = colorInside.clone()
        mixedColor.lerp(colorOutside, radius / parameters.radius)

        particleColors[i3 + 0] = mixedColor.r
        particleColors[i3 + 1] = mixedColor.g
        particleColors[i3 + 2] = mixedColor.b

    }
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions,3))
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors,3))
    
    // Material
    particleMaterial = new THREE.PointsMaterial()
    particleMaterial.alphaMap = parameters.texture
    particleMaterial.size = parameters.size
    particleMaterial.sizeAttenuation = true
    particleMaterial.depthWrite = false
    particleMaterial.blending = THREE.AdditiveBlending
    // particleMaterial.color = new THREE.Color(255,0,0)
    particleMaterial.vertexColors = true
    particles = new THREE.Points(particleGeometry,particleMaterial)
    scene.add(particles)
}

generateGalaxy()

gui.add(parameters,'count').min(100).max(1000000).step(100).name('Star Count').onChange(generateGalaxy)
gui.add(parameters,'size').min(0.05).max(0.3).step(0.001).name('Star Size').onChange(generateGalaxy)
gui.add(parameters,'radius').min(0.01).max(50).step(0.01).name('Galaxy Radius').onChange(generateGalaxy)
gui.add(parameters,'branches').min(2).max(20).step(1).name('Galaxy Branches').onChange(generateGalaxy)
gui.add(parameters,'spin').min(-5).max(5).step(0.001).name('Curvature').onChange(generateGalaxy)
gui.add(parameters,'randomness').min(0).max(2).step(0.0001).name('Randomness').onChange(generateGalaxy)
gui.add(parameters,'randomnessPower').min(1).max(10).step(0.001).name('Randomness Power').onChange(generateGalaxy)
gui.addColor(parameters,'insideColor').name('Inside Color').onChange(generateGalaxy)
gui.addColor(parameters,'outsideColor').name('Outside Color').onChange(generateGalaxy)
gui
    .add(parameters,'texture',
        {
            1: particleTextures[0],
            2: particleTextures[1],
            3: particleTextures[2],
            4: particleTextures[3],
            5: particleTextures[4],
            6: particleTextures[5],
            7: particleTextures[6],
            8: particleTextures[7],
            9: particleTextures[8],
            10: particleTextures[9],
            11: particleTextures[10],
            12: particleTextures[11],
            13: particleTextures[12],
            14: null,
        })
    .name('Particle Texture')
    .onChange(generateGalaxy)
gui.add(parameters,'speed').min(1).max(1000).step(0.000001).name('Speed')
gui.add(parameters,'jets').min(0).max(30).step(1).name('Jest Size').onChange(generateGalaxy)
gui.add(parameters,'jetDensity').min(1).max(10).step(1).name('Jest Density').onChange(generateGalaxy)

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
camera.position.x = 3
camera.position.y = 3
camera.position.z = 3
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

    // Update controls
    controls.update()

    // Spin
    particles.rotation.y = elapsedTime * Math.PI * 0.01 * parameters.speed

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()