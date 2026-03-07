import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import GUI from 'lil-gui'

/**
 * Debug GUI
 */
const gui = new GUI({
    width: 300,
    title: 'Debug Interface',
    closeFolders: false
})
// gui.close()
// gui.hide()
const sphereTweaks = gui.addFolder('Sphere Tweaks')//.close()
const debugObject = {}
debugObject.widthSegments = 32
debugObject.heightSegments = 32

window.addEventListener('keydown',(event)=>{
    if(event.key=='h'){
        gui.show(gui._hidden)
    }
})

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
debugObject.color = '#ff0000'

const geometry = new THREE.SphereGeometry( 1, debugObject.widthSegments, debugObject.heightSegments )
const material = new THREE.MeshBasicMaterial({ color: debugObject.color, wireframe:false })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

sphereTweaks
    .add(mesh.position,'y')
    .min(-3)
    .max(3)
    .step(0.01)
    .name('elevation')

sphereTweaks
    .add(mesh,'visible')

sphereTweaks
    .add(material,'wireframe')

sphereTweaks
    .addColor(debugObject,'color')
    .onChange((value)=>{
        material.color.set(value)
    })

debugObject.spin = ()=>{
    gsap.to(mesh.rotation,{y:mesh.rotation.y+Math.PI,duration:2})
}

sphereTweaks
    .add(debugObject,'spin')

sphereTweaks
    .add(debugObject,'heightSegments')
    .min(2)
    .max(72)
    .step(1)
    .onFinishChange((value)=>{
        mesh.geometry.dispose()
        mesh.geometry = new THREE.SphereGeometry( 1, debugObject.widthSegments, value )
    })

sphereTweaks
    .add(debugObject,'widthSegments')
    .min(3)
    .max(72)
    .step(1)
    .onFinishChange((value)=>{
        mesh.geometry.dispose()
        mesh.geometry = new THREE.SphereGeometry( 1, value, debugObject.heightSegments )
    })

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
renderer.setClearColor('white')

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