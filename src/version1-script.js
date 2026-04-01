import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { RectAreaLightHelper } from 'three/examples/jsm/Addons.js'

/**
 * Base
 */
// Debug
const gui = new GUI({
    width: 350,
    closeFolders: true
})
gui.close()
const ambientControls = gui.addFolder('Ambient Light')
const directionalControls = gui.addFolder('Directional Light')
const hemisphereControls = gui.addFolder('Hemisphere Light')
const pointControls = gui.addFolder('Point Light')
const rectAreaControls = gui.addFolder('RectArea Light')
const spotControls = gui.addFolder('Spot Light')

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Lights
 */
const lightColors = {}
lightColors.ambient = '0xffffff'
lightColors.directional = '0x00fffc'
lightColors.hemiSky = '0xff0000'
lightColors.hemiGround = '0x0000ff'
lightColors.point = '0xff9000'
lightColors.rectArea = '0x4e00ff'
lightColors.spot = '0xf5c211'

// Ambient Light
const ambientLight = new THREE.AmbientLight()
ambientLight.color = new THREE.Color(0xffffff)
ambientLight.intensity = 0.5
ambientControls
    .add(ambientLight, 'visible')
    .name('Enable')
ambientControls
    .add(ambientLight, 'intensity')
    .min(0)
    .max(3)
    .name('Intensity')
ambientControls
    .addColor(lightColors, 'ambient')
    .name('Color')
    .onChange(()=>{ambientLight.color.set(lightColors.ambient)})

scene.add(ambientLight)

//Directional Light
const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.9)
directionalLight.position.set(1,0.25,0)
const directionalLightHelper = new THREE.DirectionalLightHelper( directionalLight, 0.1 )
directionalControls
    .add(directionalLight, 'visible')
    .name('Enable')
    .onChange((event)=>
    {
        directionalLight.visible = event
        directionalLightHelper.visible = event
    })
directionalControls
    .add(directionalLightHelper, 'visible')
    .name('Helper Visible')
directionalControls
    .add(directionalLight, 'intensity')
    .min(0)
    .max(3)
    .name('Intensity')
directionalControls
    .addColor(lightColors, 'directional')
    .name('Color')
    .onChange(()=>
    {
        directionalLight.color.set(lightColors.directional)
        directionalLightHelper.update()
    })
directionalControls
    .add(directionalLight.position, 'x')
    .min(-1)
    .max(1)
    .name('Position X')
    .onChange(()=>
    {
        directionalLightHelper.update()
    })
directionalControls
    .add(directionalLight.position, 'y')
    .min(-1)
    .max(1)
    .name('Position Y')
    .onChange(()=>
    {
        directionalLightHelper.update()
    })
directionalControls
    .add(directionalLight.position, 'z')
    .min(-1)
    .max(1)
    .name('Position Z')
    .onChange(()=>
    {
        directionalLightHelper.update()
    })

scene.add( directionalLight )
scene.add( directionalLightHelper )

// Hemisphere Light
const hemisphereLight = new THREE.HemisphereLight()
hemisphereLight.color = new THREE.Color(0xff0000)
hemisphereLight.groundColor = new THREE.Color(0x0000ff)
hemisphereLight.intensity = 0.9
hemisphereControls
    .add(hemisphereLight, 'visible')
    .name('Enable')
hemisphereControls
    .add(hemisphereLight, 'intensity')
    .min(0)
    .max(3)
    .name('Intensity')
hemisphereControls
    .addColor(lightColors, 'hemiSky')
    .name('Sky Color')
    .onChange(()=>{hemisphereLight.color.set(lightColors.hemiSky)})
hemisphereControls
    .addColor(lightColors, 'hemiGround')
    .name('Ground Color')
    .onChange(()=>{hemisphereLight.color.set(lightColors.hemiGround)})

scene.add(hemisphereLight)

// Point Light
const pointLight = new THREE.PointLight()
pointLight.color = new THREE.Color(0xff9000)
pointLight.intensity = 1.5
pointLight.distance = 10
pointLight.decay = 2
pointLight.position.set(1,0.3,1)
const pointLightHelper = new THREE.PointLightHelper( pointLight, 0.1 )
pointControls
    .add(pointLight, 'visible')
    .name('Enable')
    .onChange((event)=>
    {
        pointLight.visible = event
        pointLightHelper.visible = event
    })
pointControls
    .add(pointLightHelper, 'visible')
    .name('Helper Visible')
pointControls
    .add(pointLight, 'intensity')
    .min(0)
    .max(3)
    .name('Intensity')
pointControls
    .addColor(lightColors, 'point')
    .name('Color')
    .onChange(()=>
    {
        pointLight.color.set(lightColors.point)
        pointLightHelper.update()
    })
pointControls
    .add(pointLight, 'distance')
    .min(0)
    .max(10)
    .name('Distance')
pointControls
    .add(pointLight, 'decay')
    .min(0)
    .max(4)
    .name('Decay')
pointControls
    .add(pointLight.position, 'x')
    .min(-1)
    .max(1)
    .name('Position X')
    .onChange(()=>
    {
        pointLightHelper.update()
    })
pointControls
    .add(pointLight.position, 'y')
    .min(-1)
    .max(1)
    .name('Position Y')
    .onChange(()=>
    {
        pointLightHelper.update()
    })
pointControls
    .add(pointLight.position, 'z')
    .min(-1)
    .max(1)
    .name('Position Z')
    .onChange(()=>
    {
        pointLightHelper.update()
    })

scene.add(pointLight)
scene.add( pointLightHelper )

// RectArea Light
const rectAreaLight = new THREE.RectAreaLight()
rectAreaLight.color = new THREE.Color(0x4e00ff)
rectAreaLight.intensity = 6
rectAreaLight.width = 1
rectAreaLight.height = 1
rectAreaLight.position.set(-1,1,1)
rectAreaLight.lookAt(0,0,0)
const rectLightHelper = new RectAreaLightHelper(rectAreaLight)
rectAreaControls
    .add(rectAreaLight, 'visible')
    .name('Enable')
    .onChange((event)=>
    {
        rectAreaLight.visible = event
        rectLightHelper.visible = event
    })
rectAreaControls
    .add(rectLightHelper, 'visible')
    .name('Helper Visible')
rectAreaControls
    .add(rectAreaLight, 'intensity')
    .min(0)
    .max(10)
    .name('Intensity')
rectAreaControls
    .addColor(lightColors, 'rectArea')
    .name('Color')
    .onChange(()=>{rectAreaLight.color.set(lightColors.rectArea)})
rectAreaControls
    .add(rectAreaLight, 'width')
    .min(0)
    .max(10)
    .name('Width')
rectAreaControls
    .add(rectAreaLight, 'height')
    .min(0)
    .max(10)
    .name('Height')
rectAreaControls
    .add(rectAreaLight.position, 'x')
    .min(-1)
    .max(1)
    .name('Position X')
    .onChange(()=>{rectAreaLight.lookAt(0,0,0)})
rectAreaControls
    .add(rectAreaLight.position, 'y')
    .min(-1)
    .max(1)
    .name('Position Y')
    .onChange(()=>{rectAreaLight.lookAt(0,0,0)})
rectAreaControls
    .add(rectAreaLight.position, 'z')
    .min(-1)
    .max(1)
    .name('Position Z')
    .onChange(()=>{rectAreaLight.lookAt(0,0,0)})
    
scene.add(rectAreaLight)
scene.add(rectLightHelper)

// Spot Light
const spotLight = new THREE.SpotLight()
spotLight.color = new THREE.Color(0xf5c211)
spotLight.intensity = 4.5
spotLight.distance = 5
spotLight.angle = Math.PI * 0.1
spotLight.penumbra = 0.25
spotLight.decay = 2
spotLight.position.set(-1,1,-1)
const spotLightHelper = new THREE.SpotLightHelper(spotLight)
spotControls
    .add(spotLight, 'visible')
    .name('Enable')
    .onChange((event)=>
    {
        spotLight.visible = event
        spotLightHelper.visible = event
    })
spotControls
    .add(spotLightHelper, 'visible')
    .name('Helper Visible')
spotControls
    .add(spotLight, 'intensity')
    .min(0)
    .max(10)
    .name('Intensity')
spotControls
    .addColor(lightColors, 'spot')
    .name('Color')
    .onChange(()=>
    {
        spotLight.color.set(lightColors.spot)
        spotLightHelper.update()
    })
spotControls
    .add(spotLight, 'castShadow')
spotControls
    .add(spotLight, 'distance')
    .min(0)
    .max(10)
    .name('Distance')
    .onChange(()=>
    {
        spotLightHelper.update()
    })
spotControls
    .add(spotLight, 'angle')
    .min(0)
    .max(Math.PI/2)
    .name('Angle')
    .onChange(()=>
    {
        spotLightHelper.update()
    })
spotControls
    .add(spotLight, 'penumbra')
    .min(0)
    .max(1)
    .name('Penumbra')
spotControls
    .add(spotLight, 'decay')
    .min(0)
    .max(10)
    .name('Decay')
spotControls
    .add(spotLight.position, 'x')
    .min(-1)
    .max(1)
    .name('Position X')
    .onChange(()=>
    {
        spotLightHelper.update()
    })
spotControls
    .add(spotLight.position, 'y')
    .min(-1)
    .max(1)
    .name('Position Y')
    .onChange(()=>
    {
        spotLightHelper.update()
    })
spotControls
    .add(spotLight.position, 'z')
    .min(-1)
    .max(1)
    .name('Position Z')
    .onChange(()=>
    {
        spotLightHelper.update()
    })
spotControls
    .add(spotLight.target.position, 'x')
    .min(-1)
    .max(1)
    .name('Target Position X')
    .onChange(()=>
    {
        spotLightHelper.update()
    })
spotControls
    .add(spotLight.target.position, 'y')
    .min(-1)
    .max(1)
    .name('Target Position Y')
    .onChange(()=>
    {
        spotLightHelper.update()
    })
spotControls
    .add(spotLight.target.position, 'z')
    .min(-1)
    .max(1)
    .name('Target Position Z')
    .onChange(()=>
    {
        spotLightHelper.update()
    })
    
scene.add(spotLight)
scene.add(spotLightHelper)

/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.4

// Objects
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
)
sphere.position.x = - 1.5

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(0.75, 0.75, 0.75),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 32, 64),
    material
)
torus.position.x = 1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    material
)
plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.65

scene.add(sphere, cube, torus, plane)

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
camera.position.x = 1 * 4.6
camera.position.y = 1 * 4.6
camera.position.z = 2 * 4.6
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

    // Update objects
    sphere.rotation.y = 0.1 * elapsedTime
    cube.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.15 * elapsedTime
    cube.rotation.x = 0.15 * elapsedTime
    torus.rotation.x = 0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()