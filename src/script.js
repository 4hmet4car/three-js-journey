import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

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


const textureLoader = new THREE.CubeTextureLoader(loadingManager)

const backgroundTextures = textureLoader.load([
    './textures/background/px.png',
    './textures/background/nx.png',
    './textures/background/py.png',
    './textures/background/ny.png',
    './textures/background/pz.png',
    './textures/background/nz.png'
  ])

scene.background = backgroundTextures

/**
 * Galaxy
 */
const G = 6.671 * 10^-11 // Gravitional constant [m^3/(kg*s)]
const c = 299792458 // Light speed [m/s]
let M = null// Mass of the black hole [kg]

const parameters = {}
parameters.particleCount = 10000
parameters.size = 0.01
parameters.rayLength = 5
parameters.rayCount = 30
parameters.eventHorizon = 0.5

let particleGeometry = null
let particleMaterial = null
let particles = null
let blackHoleGeometry = null
let blackHoleMaterial = null
let blackHole = null

const generateBlackHole = () => {
    /**
     * Disposal
     */
    if (particles !== null && blackHole !== null) {
        particleGeometry.dispose()
        particleMaterial.dispose()
        blackHoleGeometry.dispose()
        blackHoleMaterial.dispose()
        scene.remove(particles,blackHole)
    }

    /**
     * Black hole
     */
    M = parameters.eventHorizon * c^2 / (2 * G)
    console.log(M)

    blackHoleGeometry = new THREE.SphereGeometry( parameters.eventHorizon, 32, 16 )
    blackHoleMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000 } )
    blackHole = new THREE.Mesh( blackHoleGeometry, blackHoleMaterial )

    /**
     * Light Rays
     */
    particleGeometry = new THREE.BufferGeometry()
    const particlePositions = new Float32Array(parameters.particleCount * 3)
    for (let i = 0; i < parameters.particleCount; i++) {
        const theta = Math.random() * Math.PI * 2 
        const r = 0.75 + Math.random()
        const particleXPos =  r * Math.cos(theta)
        const particleYPos =  Math.random() * 0.05
        const particleZPos =  r * Math.sin(theta)

        // const r = Math.hypot(particleXPos,particleYPos)

        particlePositions[i * 3] = particleXPos
        particlePositions[i * 3 + 1] = particleYPos
        particlePositions[i * 3 + 2] = particleZPos
    }
    const particlePositionsAttribute = new THREE.BufferAttribute(particlePositions, 3)
    particleGeometry.setAttribute('position', particlePositionsAttribute)
    particleMaterial = new THREE.PointsMaterial({
        size: parameters.size,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending
    })
    particles = new THREE.Points(particleGeometry, particleMaterial)
    
    // scene.add(particles)
    scene.add(particles, blackHole)
}

generateBlackHole()

gui.add(parameters, 'particleCount').min(100).max(1000000).step(100).onFinishChange(generateBlackHole)
gui.add(parameters, 'rayCount').min(10).max(50).step(10).onFinishChange(generateBlackHole)
gui.add(parameters, 'size').min(0.001).max(0.1).step(0.001).onFinishChange(generateBlackHole)
gui.add(parameters, 'rayLength').min(0.01).max(20).step(0.01).onFinishChange(generateBlackHole)
gui.add(parameters, 'eventHorizon').min(0.1).max(2).step(0.1).onFinishChange(generateBlackHole)

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
// renderer.setClearColor(THREE)
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    if(particles !== null){
        particles.rotation.y += 0.0001
    }

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()