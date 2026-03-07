import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 *  Objects
 */

// // Box geometry
// const geometry = new THREE.BoxGeometry(1, 1, 1)

// // One triangle
// const positionsArray = new Float32Array([
//     0,0,0,
//     0,1,0,
//     1,0,0
// ])
// const positionsAttribute = new THREE.BufferAttribute(positionsArray,3)
// const geometry = new THREE.BufferGeometry()
// geometry.setAttribute('position', positionsAttribute)

// Random triangles
const count = 999
const cubePositionsArray = new Float32Array(count * 3 * 3)
const cubePositionsAttribute = new THREE.BufferAttribute(cubePositionsArray,3)
const spherePositionsArray = new Float32Array(count * 3 * 3)
const spherePositionsAttribute = new THREE.BufferAttribute(spherePositionsArray,3)
const cubeGeometry = new THREE.BufferGeometry()
const sphereGeometry = new THREE.BufferGeometry()

const cubeBuilder = ()=>{
    for(var i=0;i<count*3*3;i++){
        cubePositionsArray[i]=Math.random()-0.5
    }
    cubeGeometry.setAttribute('position',cubePositionsAttribute)
}

const sphereBuilder = ()=>{
    for(var i=0;i<count*3;i=i+3){
        const ra1 = Math.random() - 0.5
        const ra2 = Math.random() * 2 - 1
        spherePositionsArray[i]=Math.cos(Math.PI*ra1)*Math.cos(Math.PI*ra2) * 0.5
        spherePositionsArray[i+1]=(Math.cos(Math.PI*ra1)*Math.sin(Math.PI*ra2) + 2) * 0.5
        spherePositionsArray[i+2]=Math.sin(Math.PI*ra1) * 0.5
    }
    sphereGeometry.setAttribute('position',spherePositionsAttribute)
}

sphereBuilder()

const material = new THREE.MeshBasicMaterial({ 
    color: 0x000000,
    wireframe: true
})
const cube = new THREE.Mesh(cubeGeometry, material)
const sphere = new THREE.Mesh(sphereGeometry, material)
scene.add(cube,sphere)

// Sizes
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

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
})
renderer.setClearColor(0xffffff)
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    cubeBuilder()
    cubeGeometry.dispose()
    
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()