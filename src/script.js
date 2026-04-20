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


const textureLoader = new THREE.TextureLoader(loadingManager)

/**
 * Galaxy
 */

const milkywayTexture = textureLoader.load('./textures/milkyway.jpg')
milkywayTexture.colorSpace = THREE.SRGBColorSpace
milkywayTexture.minFilter = THREE.LinearFilter
milkywayTexture.generateMipmaps = false

const milkywayGeometry = new THREE.SphereGeometry( 500, 32, 32 )
milkywayGeometry.scale(-1,1,1)
const milkywayMaterial = new THREE.MeshBasicMaterial( { map: milkywayTexture } )
const milkyway = new THREE.Mesh( milkywayGeometry, milkywayMaterial )
scene.add(milkyway)

const saturnTexture = textureLoader.load('./textures/saturn.jpg')
saturnTexture.colorSpace = THREE.SRGBColorSpace
saturnTexture.minFilter = THREE.LinearFilter
saturnTexture.generateMipmaps = false

const parameters = {}
parameters.particleCount = 10000
parameters.size = 0.01
parameters.radius = 0.582 //Saturn has a mean radius of approximately 58,232 km

let particleGeometry = null
let particleMaterial = null
let particles = null
let saturnGeometry = null
let saturnMaterial = null
let saturn = null

const generatesaturn = () => {
    /**
     * Disposal
     */
    if (particles !== null && saturn !== null) {
        particleGeometry.dispose()
        particleMaterial.dispose()
        saturnGeometry.dispose()
        saturnMaterial.dispose()
        scene.remove(particles,saturn)
    }

    /**
     * Black hole
     */

    saturnGeometry = new THREE.SphereGeometry( parameters.radius, 64, 64 )
    saturnMaterial = new THREE.MeshBasicMaterial( { map: saturnTexture } )
    saturn = new THREE.Mesh( saturnGeometry, saturnMaterial )

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
    scene.add(particles, saturn)
}

generatesaturn()

gui.add(parameters, 'particleCount').min(100).max(1000000).step(100).onFinishChange(generatesaturn)
gui.add(parameters, 'size').min(0.001).max(0.1).step(0.001).onFinishChange(generatesaturn)
gui.add(parameters, 'radius').min(0.1).max(2).step(0.1).onFinishChange(generatesaturn)

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
camera.position.y = 3
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