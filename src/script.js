import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

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
const textures = []

textures[0] = textureLoader.load('/textures/doge.png')
textures[1] = textureLoader.load('/textures/1.png')
textures[2] = textureLoader.load('/textures/2.png')
textures[3] = textureLoader.load('/textures/3.png')
textures[4] = textureLoader.load('/textures/4.png')
textures[5] = textureLoader.load('/textures/5.png')
textures[6] = textureLoader.load('/textures/6.png')

for(var tex of textures){
    tex.colorSpace = THREE.SRGBColorSpace
    tex.generateMipmaps = false
    tex.minFilter = THREE.LinearFilter
}

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

const particles = []

particles[0] = cubeBuilder(400,5,5,5)
particles[1] = cubeBuilder(100,5,5,5)
particles[2] = cubeBuilder(100,5,5,5)
particles[3] = cubeBuilder(100,5,5,5)
particles[4] = cubeBuilder(100,5,5,5)
particles[5] = cubeBuilder(100,5,5,5)
particles[6] = cubeBuilder(100,5,5,5)

// Material
const materials = []

for(var i=0;i<particles.length; i++){
    materials[i] = new THREE.PointsMaterial({
        transparent:true,
        map: textures[i],
        size: 0.3,
        sizeAttenuation: true,
        alphaTest: 0.5
    })
    const particle = new THREE.Points(particles[i].geometry,materials[i])
    scene.add(particle)
}

// const dogesMaterial = new THREE.PointsMaterial({
//     transparent:true,
//     map: textures[0],
//     size: 0.3,
//     sizeAttenuation: true,
//     alphaTest: 0.5,
//     depthWrite: false
// })

// dogesMaterial.depthTest = false
// dogesMaterial.blending = THREE.NormalBlending
// dogesMaterial.vertexColors = true

// Points
// const doges = new THREE.Points(particles[0].geometry, dogesMaterial)
// scene.add(doges)

// const cube = new THREE.Mesh(new THREE.BoxGeometry(2,2,2),new THREE.MeshBasicMaterial())
// scene.add(cube)

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

    if(!(counter%120)){
        epilepsy(particles[0])
        epilepsy(particles[1])
        epilepsy(particles[2])
        epilepsy(particles[3])
        epilepsy(particles[4])
        epilepsy(particles[5])
        epilepsy(particles[6])
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