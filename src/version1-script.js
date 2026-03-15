import * as THREE from 'three'
import gsap from 'gsap'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

/* requestAnimationFrame method
// Time
let time = Date.now()

// Animations
const tick = () =>
{
    // Time
    const currentTime = Date.now()
    const deltaTime = currentTime - time
    time = currentTime
    //console.log(deltaTime)
    
    // Update objects
    mesh.rotation.y += 0.001 * deltaTime

    // Render
    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)
}

tick()
*/


/* /* Clock method
// Clock
const clock = new THREE.Clock() // Clock is a threeJs class so we need to instanciate it

// Animations
const tick = () =>
{
    // Clock
    const elapsedTime = clock.getElapsedTime()
    //console.log(elapsedTime)
    
    // Update objects
    //mesh.rotation.y = 2 * Math.PI * elapsedTime // One rev per second
    camera.position.y = Math.sin(elapsedTime)
    camera.position.x = Math.cos(elapsedTime)

    camera.lookAt(mesh.position)
    
    // Render
    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)
}

tick()
*/

gsap.to(mesh.position, { duration: 1, yoyo: true, x: 2, repeat:- 1})

// Animations
const tick = () =>
{   
    // Render
    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)
}

tick()

