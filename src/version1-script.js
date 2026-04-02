import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
// import gsap from 'gsap'

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const shadowTexture = textureLoader.load('./textures/bakedShadow.jpg')
const simpleShadowTexture = textureLoader.load('./textures/simpleShadow.jpg')

/**
 * Base
 */
// Debug
const gui = new GUI({
    width: 300
})
gui.close()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3)
gui.add(ambientLight, 'intensity').min(0).max(3).step(0.001).name('Ambient Intensity')
gui.add(ambientLight, 'visible').name('Ambient Enabled')
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3)
directionalLight.position.set(2, 2, - 2)
gui.add(directionalLight, 'intensity').min(0).max(3).step(0.001).name('Directional Intensity')
gui.add(directionalLight.position, 'x').min(- 5).max(5).step(0.001).name('Directional Position X')
gui.add(directionalLight.position, 'y').min(- 5).max(5).step(0.001).name('Directional Position Y')
gui.add(directionalLight.position, 'z').min(- 5).max(5).step(0.001).name('Directional Position Z')

scene.add(directionalLight)

directionalLight.castShadow = true
directionalLight.shadow.mapSize.x = 1024
directionalLight.shadow.mapSize.y = 1024

directionalLight.shadow.camera.near = 1
directionalLight.shadow.camera.far = 10

directionalLight.shadow.camera.left = -1
directionalLight.shadow.camera.right = 1
directionalLight.shadow.camera.top = 1
directionalLight.shadow.camera.bottom = -1

directionalLight.shadow.radius = 50

const directionalLightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
directionalLightCameraHelper.visible = false
gui.add(directionalLightCameraHelper, 'visible').name('Directional Helper Visible')
scene.add(directionalLightCameraHelper)

// Spot Light
const spotLight = new THREE.SpotLight()
spotLight.color = new THREE.Color(0xffffff)
spotLight.intensity = 0.3
gui.add(spotLight, 'intensity').min(0).max(3).step(0.001).name('Spot Intensity')
spotLight.distance = 10
spotLight.angle = Math.PI * 0.3
spotLight.castShadow = true
spotLight.position.set(0, 2, 2)
scene.add(spotLight)
scene.add(spotLight.target)

spotLight.shadow.mapSize.x = 1024
spotLight.shadow.mapSize.y = 1024

spotLight.shadow.camera.near = 1
spotLight.shadow.camera.far = 6

spotLight.shadow.radius = 5

const spotLightCameraHelper = new THREE.CameraHelper(spotLight.shadow.camera)
spotLightCameraHelper.visible = false
gui.add(spotLightCameraHelper, 'visible').name('Spot Helper Visible')
scene.add(spotLightCameraHelper)

// Point Light
const pointLight = new THREE.PointLight()
pointLight.color = new THREE.Color(0xffffff)
pointLight.intensity = 2.7
gui.add(pointLight, 'intensity').min(0).max(3).step(0.001).name('Point Intensity')
pointLight.castShadow = true
pointLight.position.set(-1, 1, 0)
scene.add(pointLight)

pointLight.shadow.mapSize.x = 1024
pointLight.shadow.mapSize.y = 1024

pointLight.shadow.camera.near = 0.1
pointLight.shadow.camera.far = 5

const pointLightCameraHelper = new THREE.CameraHelper(pointLight.shadow.camera)
pointLightCameraHelper.visible = false
gui.add(pointLightCameraHelper, 'visible').name('Point Helper Visible')
scene.add(pointLightCameraHelper)

/**
 * Materials
 */
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.7
material.transparent = true
material.side = THREE.DoubleSide
gui.add(material, 'metalness').min(0).max(1).step(0.001).name('Material Metalness')
gui.add(material, 'roughness').min(0).max(1).step(0.001).name('Material Roughness')
material.map = shadowTexture

const material2 = new THREE.MeshStandardMaterial()

const shadowObject = {}
shadowObject.shadow = true

gui
    .add(shadowObject,'shadow')
    .name('Use Baked Shadow')
    .onChange(()=>
    {
        if(shadowObject.shadow){
            renderer.shadowMap.enabled = false
            material.map = shadowTexture
        }else{
            renderer.shadowMap.enabled = true
            material.map.dispose()
            material.map = null
        }
    })

/**
 * Objects
 */
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material2
)
sphere.castShadow = true

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    material
)
plane.receiveShadow = true
plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.5

scene.add(sphere, plane)

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
//renderer.shadowMap.enabled = true
//renderer.shadowMap.type = THREE.BasicShadowMap
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

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()