import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { Timer } from 'three/examples/jsm/misc/Timer.js'

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
 * Textures
 */
// Loading Manager
const loadingManager = new THREE.LoadingManager();
loadingManager.onStart = function (url, itemsLoaded, itemsTotal) {
    console.log('Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
};

loadingManager.onLoad = function () {
    console.log('Loading complete!');
};

loadingManager.onProgress = function (url, itemsLoaded, itemsTotal) {
    console.log('Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
};

loadingManager.onError = function (url) {
    console.log('There was an error loading ' + url);
};


const textureLoader = new THREE.TextureLoader(loadingManager)

/**
 * Galaxy
 */

const milkywayTexture = textureLoader.load('./textures/milkyway.jpg')
milkywayTexture.colorSpace = THREE.SRGBColorSpace
milkywayTexture.minFilter = THREE.LinearFilter
milkywayTexture.generateMipmaps = false

const milkywayGeometry = new THREE.SphereGeometry(500, 32, 32)
milkywayGeometry.scale(-1, 1, 1)
const milkywayMaterial = new THREE.MeshBasicMaterial({ map: milkywayTexture })
const milkyway = new THREE.Mesh(milkywayGeometry, milkywayMaterial)
scene.add(milkyway)

const saturnTexture = textureLoader.load('./textures/saturn.jpg')
saturnTexture.colorSpace = THREE.SRGBColorSpace
saturnTexture.minFilter = THREE.LinearFilter
saturnTexture.generateMipmaps = false

const parameters = {}
parameters.particleCount = 10000
parameters.size = 0.001
parameters.speedMultiplier = 200

let saturnGeometry = null
let saturnMaterial = null
let saturn = null

let ringParticleGeometries = []
let ringParticleMaterials = []
let rings = []

const generateRing = (distanceFromCenter, width, thickness, particleCount) => {
    const ringParticleGeometry = new THREE.BufferGeometry()
    ringParticleGeometries.push(ringParticleGeometry)
    const ringParticlePositions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
        const theta = Math.random() * Math.PI * 2
        const r = distanceFromCenter + Math.random() * width
        const particleXPos = r * Math.cos(theta)
        const particleYPos = Math.random() * thickness
        const particleZPos = r * Math.sin(theta)

        ringParticlePositions[i * 3] = particleXPos
        ringParticlePositions[i * 3 + 1] = particleYPos
        ringParticlePositions[i * 3 + 2] = particleZPos
    }
    const ringParticlePositionsAttribute = new THREE.BufferAttribute(ringParticlePositions, 3)
    ringParticleGeometry.setAttribute('position', ringParticlePositionsAttribute)
    const ringParticleMaterial = new THREE.PointsMaterial({
        size: 0.001,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending
    })
    ringParticleMaterials.push(ringParticleMaterial)
    const ringParticles = new THREE.Points(ringParticleGeometry, ringParticleMaterial)
    ringParticles.rotation.x = - Math.PI * 0.15 // Saturn is tilted approx. 27 degrees
    ringParticles.rotation.z = - Math.PI * 0.15 // Saturn is tilted approx. 27 degrees
    rings.push(ringParticles)
}

const generatesaturn = () => {
    /**
     * Disposal
     */
    if (rings.length && saturn !== null) {
        console.log('lol')
        saturnGeometry.dispose()
        saturnMaterial.dispose()
        scene.remove(saturn)
        for(let i=0;i<rings.length;i++){
            ringParticleGeometries[i].dispose()
            ringParticleMaterials[i].dispose()
            scene.remove(rings[i])
        }
        ringParticleGeometries = []
        ringParticleMaterials = []
        rings = []
    }

    /**
     * Saturn
     */

    saturnGeometry = new THREE.SphereGeometry(0.582, 64, 64) //Saturn has a mean radius of approximately 58,232 km
    saturnMaterial = new THREE.MeshBasicMaterial({ map: saturnTexture })
    saturn = new THREE.Mesh(saturnGeometry, saturnMaterial)
    saturn.rotation.x = - Math.PI * 0.15 // Saturn is tilted approx. 27 degrees
    saturn.rotation.z = - Math.PI * 0.15 // Saturn is tilted approx. 27 degrees

    scene.add(saturn)

    /**
     * Rings of Saturn
     */
    generateRing(0.669,0.075,0.0003,10000) //D ring
    generateRing(0.746,0.175,0.00005,10000) //C ring
    generateRing(0.92,0.255,0.0001,10000) //B ring
    generateRing(1.221,0.146,0.0003,10000) //A ring
    generateRing(1.401,0.005,0.0003,10000) //F ring
    generateRing(1.66,0.09,0.0003,10000) //G ring
    generateRing(1.8,3,0.02,10000) //E ring
    
    for(let ring of rings){
        scene.add(ring)
    }
}

generatesaturn()

gui.add(parameters, 'size').min(0.001).max(0.1).step(0.001).onFinishChange(generatesaturn).name('Particle Size')
gui.add(parameters, 'speedMultiplier').min(1).max(200).step(0.001).name('Speed Multiplier')

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
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000)
camera.position.x = 3
camera.position.y = 2
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.minDistance = 1
controls.maxDistance = 30
// controls.enableZoom = false
controls.enablePan = false

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
// renderer.setClearColor(THREE)
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const timer = new Timer()

const tick = () => {
    const deltaTime = timer.getDelta()
    timer.update()

    // Update controls
    controls.update()

    if (rings.length) {
        for(let ring of rings){
            ring.rotateY((Math.PI * deltaTime / 37980) * parameters.speedMultiplier) // Saturn completes one full rotation in 37980 seconds
        }
        saturn.rotateY((Math.PI * deltaTime / 37980) * parameters.speedMultiplier)
        milkyway.rotation.y += 0.00000025 * parameters.speedMultiplier
    }

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()