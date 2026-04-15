import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import gsap from 'gsap'

/**
 * Base
 */
// Debug
const gui = new GUI()
const particlesFolder = gui.addFolder('Particles')
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
 * Particles
 */
const particleObject = {}
particleObject.size = 0.2
particleObject.count = 20000
particleObject.texture = particleTextures[7]

// Geometry

const particlesGeometry = new THREE.BufferGeometry()
createParticleGeometry(particleObject.count)
console.log(particlesGeometry)

// Material
const particlesMaterial = new THREE.PointsMaterial()
particlesMaterial.color = new THREE.Color(0xff88cc)
particlesMaterial.alphaMap = particleObject.texture
// particlesMaterial.alphaTest = 0.001
// particlesMaterial.depthTest = false
particlesMaterial.size = particleObject.size
particlesMaterial.sizeAttenuation = true
// particlesMaterial.transparent = true
particlesMaterial.depthWrite = false
particlesMaterial.blending = THREE.AdditiveBlending
particlesMaterial.vertexColors = true

// Points
const particles = new THREE.Points(particlesGeometry,particlesMaterial)
scene.add(particles)

// Particle controls
particlesFolder
    .add(particlesMaterial,'size')
    .min(0.0001)
    .max(0.5)
    .step(0.0001)
    .name('Particle Size')

particlesFolder
    .add(particleObject,'count')
    .min(0)
    .max(40000)
    .step(1)
    .name('Particle Count')
    .onChange(()=>
    {
        particlesGeometry.deleteAttribute('position')
        createParticleGeometry(particleObject.count)
    })

particlesFolder
    .add(particleObject,'texture',
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
            13: particleTextures[12]
        })
    .name('Particle Texture')
    .onChange(()=>
    {
        particlesMaterial.alphaMap = particleObject.texture
    })

// Particle functions
function createParticleGeometry(count) {
    const particlePositions = new Float32Array(count * 3)
    const particleColors = new Float32Array(count * 3)
    for(let i = 0; i < particlePositions.length; i++)
    {
        particlePositions[i] = (Math.random() - 0.5) * 10
        particleColors[i] = Math.random()
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions,3))
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors,3))
}

// Button color randomizer
const colorRand = () => Math.floor(Math.random() * (255-100)) + 100
const versionButtonColor = `rgb(${colorRand()}, ${colorRand()}, ${colorRand()})`
const versionButton = document.querySelector(".version2")
versionButton.style.color = versionButtonColor
versionButton.style.borderColor = versionButtonColor

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

gsap.to(particles.rotation,{duration: 20, repeat: -1, ease: 'none', y: Math.PI*2})

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