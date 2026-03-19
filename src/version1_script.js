import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import GUI from 'lil-gui'

/**
 * Debug UI
 */
const gui = new GUI({
    width: 300,
    title: 'Debug UI',
    closeFolders: false
})

gui.close()

//gui.hide()

window.addEventListener('keydown', (event) =>
{
    if(event.key == 'h'){
        gui.show(gui._hidden)
    }
})

const debugObject = {}

const tweaks = gui.addFolder('Tweaks')

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */

debugObject.color = '#555555'

const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2)
const material = new THREE.MeshBasicMaterial({
    color: debugObject.color,
    wireframe: true
})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

tweaks
    .add(mesh.position, 'y')
    .min(-1)
    .max(1)
    .step(0.01)
    .name('elevation')

tweaks
    .add(material, 'wireframe')

tweaks
    .add(mesh, 'visible')

tweaks
    .addColor(debugObject, 'color')
    .onChange(() =>
    {
        material.color.set(debugObject.color)
    })

debugObject.spin = () =>
{
    gsap.to(mesh.rotation, {duration: 1, y: mesh.rotation.y + Math.PI * 2})
}

tweaks
    .add(debugObject, 'spin')

debugObject.subdivision = 2

tweaks
    .add(debugObject, 'subdivision')
    .min(1)
    .max(20)
    .step(1)
    .onFinishChange(() =>
    {
        mesh.geometry.dispose()
        mesh.geometry = new THREE.BoxGeometry(
            1, 1, 1,
            debugObject.subdivision, debugObject.subdivision, debugObject.subdivision)
    })

debugObject.slide = true

    let slide = gsap.fromTo(mesh.position, {x: 1}, {x: -1, repeat: -1, yoyoEase: true})

console.log(slide.paused())

tweaks
    .add(debugObject, 'slide')
    .onChange((event) =>
    {
        if(!event){
            slide.pause()
        }else{
            slide.resume()
        }
    })

tweaks
    .add(slide, 'pause')

tweaks
    .add(slide, 'resume')

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
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
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

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()