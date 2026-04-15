import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

/**
 * Base
 */
// Debug
// const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const particleTexture = textureLoader.load('/textures/doge_alpha.png')

/**
 * Particles
 */
// Geometry
// const particlesGeometry = new THREE.SphereGeometry(1,32,32)
const cubeBuilder = (pointCount=3,sizeX=1,sizeY=1,sizeZ=1)=>{
    const cubePositionsArray = new Float32Array(pointCount * 3)
    // const cubeColorsArray = new Float32Array(pointCount * 3)
    const cubePositionsAttribute = new THREE.BufferAttribute(cubePositionsArray,3)
    // const cubeColorsAttribute = new THREE.BufferAttribute(cubeColorsArray,3)
    const cubeGeometry = new THREE.BufferGeometry()
    for(var i=0;i<pointCount*3;i=i+3){
        cubePositionsArray[i]=(Math.random()-0.5)*sizeX
        cubePositionsArray[i+1]=(Math.random()-0.5)*sizeY
        cubePositionsArray[i+2]=(Math.random()-0.5)*sizeZ
        // cubeColorsArray[i]=Math.random()
        // cubeColorsArray[i+1]=Math.random()
        // cubeColorsArray[i+2]=Math.random()
    }
    cubeGeometry.setAttribute('position',cubePositionsAttribute)
    // cubeGeometry.setAttribute('color',cubeColorsAttribute)
    return {geometry:cubeGeometry,sizeX:sizeX,sizeY:sizeY,sizeZ:sizeZ}
}

const epilepsy = (cube)=>{
    let bodyPositionsAttribute = cube.geometry.getAttribute('position')
    for(var i=0;i<bodyPositionsAttribute.count*3;i=i+3){
        bodyPositionsAttribute.array[i]=(Math.random()-0.5)*cube.sizeX
        bodyPositionsAttribute.array[i+1]=(Math.random()-0.5)*cube.sizeY
        bodyPositionsAttribute.array[i+2]=(Math.random()-0.5)*cube.sizeZ
    }
    cube.geometry.setAttribute('position',bodyPositionsAttribute)
    cube.geometry.dispose()
}

const particlesGeometry = cubeBuilder(1000,5,5,5)

// Material
const particlesMaterial = new THREE.PointsMaterial({
    transparent:true,
    map: particleTexture,
    alphaMap: particleTexture,
    size: .1,
    sizeAttenuation: true
})

// particlesMaterial.alphaTest = 0.001
// particlesMaterial.depthTest = false
particlesMaterial.depthWrite = false
particlesMaterial.blending = THREE.AdditiveBlending
// particlesMaterial.vertexColors = true

// Points
const particles = new THREE.Points(particlesGeometry.geometry, particlesMaterial)
scene.add(particles)

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
controls.enablePan = false
controls.enableZoom = false

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

let counter = 0

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    if(!(counter%60)){
        epilepsy(particlesGeometry)
    }

    counter += 1

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()