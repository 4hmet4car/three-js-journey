import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import * as CANNON from 'cannon-es'
import { Timer } from 'three/examples/jsm/misc/Timer.js'

// console.log(CANNON)

/**
 * Debug
 */
const gui = new GUI()
gui.close()

const parameters = {}
parameters.environment = true

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Sounds
 */
const hitSound = new Audio('./sounds/hit.mp3')

// const playHitSound = (collision) =>
// {
//     const impactStrength = collision.contact.getImpactVelocityAlongNormal()
//     setTimeout(()=>{
//         if(10 > impactStrength && impactStrength > 0.5)
//         {
//             hitSound.volume = 0.16 + impactStrength * 0.84
//             hitSound.currentTime = 0
//             hitSound.play()
//         }
//     },30)
// }

// const playHitSound = (collision) =>
// {
//     const impactStrength = collision.contact.getImpactVelocityAlongNormal()
//     if(impactStrength > 1.5)
//     {
//         hitSound.currentTime = 0
//         hitSound.play()
//     }
// }

const playHitSound = (collision) => {

    const impactStrength = collision.contact.getImpactVelocityAlongNormal()

    console.log(hitSound.currentTime)

    if (impactStrength > 0.5) {
        hitSound.volume = impactStrength > 7 ? 1 : impactStrength / 7
        hitSound.currentTime = 0
        setTimeout(hitSound.play(),30)
    }
}

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()

const environmentMapTexture = cubeTextureLoader.load([
    '/textures/environmentMaps/0/px.png',
    '/textures/environmentMaps/0/nx.png',
    '/textures/environmentMaps/0/py.png',
    '/textures/environmentMaps/0/ny.png',
    '/textures/environmentMaps/0/pz.png',
    '/textures/environmentMaps/0/nz.png'
])

scene.background = null
scene.environment = null

gui
    .add(parameters,'environment')
    .onChange(()=>
    {
        if(parameters.environment)
        {
            scene.background = environmentMapTexture
            scene.environment = environmentMapTexture
            floor.material.envMap = environmentMapTexture
        }else
        {
            scene.background = null
            scene.environment.dispose()
            scene.environment = null
            floor.material.envMap = null
        }
    })

/**
 * Physics
 */
const world = new CANNON.World()
world.broadphase = new CANNON.SAPBroadphase(world)
world.allowSleep = true
world.gravity.set(0, -9.82, 0)

// Material

// You can create one material for each object, but it is too demanding
// instead you can create one default material and make everything use that one

// This is different materials for each object

// const concreteMaterial = new CANNON.Material('concrete')
// const plasticMaterial = new CANNON.Material('plastic')

// const concretePlasticContactMaterial = new CANNON.ContactMaterial(
//     concreteMaterial,
//     plasticMaterial,
//     {
//         friction: 0.1,
//         restitution: 0.7
//     }
// )
// world.addContactMaterial(concretePlasticContactMaterial)

// This is one material every object
const defaultMaterial = new CANNON.Material('default')

const defaultContactMaterial = new CANNON.ContactMaterial(
    defaultMaterial,
    defaultMaterial,
    {
        friction: 0.1,
        restitution: 0.2,
    }
)
world.addContactMaterial(defaultContactMaterial)
world.defaultContactMaterial = defaultContactMaterial

// // Sphere Physics
// const sphereShape = new CANNON.Sphere(0.5)
// const sphereBody = new CANNON.Body({
//     mass: 1,
//     position: new CANNON.Vec3(0,3,0),
//     shape: sphereShape,
//     //material: plasticMaterial // This is for assigning seperate materials
// })
// sphereBody.applyLocalForce(new CANNON.Vec3(150,0,0), new CANNON.Vec3(0,0,0))
// world.addBody(sphereBody)

// gui
//     .add(sphereBody,'mass')
//     .min(1)
//     .max(10)
//     .step(0.1)

// Floor collider body
const floorShape = new CANNON.Plane()
const floorBody = new CANNON.Body()
// floorBody.material = concreteMaterial // This is for assigning seperate materials
floorBody.mass = 0
floorBody.addShape(floorShape)
floorBody.quaternion.setFromAxisAngle(
    new CANNON.Vec3(-1,0,0),
    Math.PI * 0.5
)
world.addBody(floorBody)

// /**
//  * Test sphere
//  */
// const sphere = new THREE.Mesh(
//     new THREE.SphereGeometry(0.5, 32, 32),
//     new THREE.MeshStandardMaterial({
//         metalness: 0.3,
//         roughness: 0.4,
//         envMap: environmentMapTexture,
//         envMapIntensity: 0.5
//     })
// )
// sphere.castShadow = true
// sphere.position.y = 0.5
// scene.add(sphere)

/**
 * Floor
 */
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({
        color: '#d2cbc5',
        metalness: 0.3,
        roughness: 0.4,
        envMap: environmentMapTexture,
        envMapIntensity: 0.5
    })
)
floor.receiveShadow = true
floor.rotation.x = - Math.PI * 0.5
scene.add(floor)

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 2.1)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.camera.left = - 7
directionalLight.shadow.camera.top = 7
directionalLight.shadow.camera.right = 7
directionalLight.shadow.camera.bottom = - 7
directionalLight.position.set(5, 5, -5)
scene.add(directionalLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// window.addEventListener('resize', () =>
// {
//     // Update sizes
//     sizes.width = window.innerWidth
//     sizes.height = window.innerHeight

//     // Update camera
//     camera.aspect = sizes.width / sizes.height
//     camera.updateProjectionMatrix()

//     // Update renderer
//     renderer.setSize(sizes.width, sizes.height)
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// })

// /**
//  * Camera
//  */
// // Base camera
// const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
// camera.position.set(- 3, 3, 3)
// scene.add(camera)

let aspect = sizes.width / sizes.height
let left = -aspect * 4
let right = aspect * 4

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    aspect = sizes.width / sizes.height
    left = -aspect * 4
    right = aspect * 4
    camera.left = -aspect * 4
    camera.right = aspect * 4
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.OrthographicCamera(left , right, 1 * 4 , -1 * 4 , 0.1, 100)
camera.position.x = 20
camera.position.y = 20
camera.position.z = 20
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = false
controls.enableRotate = false
controls.enableZoom = false
controls.autoRotate = false
controls.maxPolarAngle = Math.PI * 0.49


gui.add(controls,'autoRotate')
gui
    .add(controls,'enablePan')
    .name("Camera Controls")
    .onChange(()=>
        {
            controls.enableRotate = controls.enablePan
            controls.enableZoom = controls.enablePan
        })

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Utils
 */
const objectsToUpdate = []

const sphereGeometry = new THREE.SphereGeometry(1,20,20)
const objectMaterials =[
    new THREE.MeshStandardMaterial({
        metalness: 0.5,
        roughness: 0.2,
        color: '#171a4a',
        envMap: environmentMapTexture
    }),
    new THREE.MeshStandardMaterial({
        metalness: 0.5,
        roughness: 0.2,
        color: '#6cb0ba',
        envMap: environmentMapTexture
    }),
    new THREE.MeshStandardMaterial({
        metalness: 0.5,
        roughness: 0.2,
        color: '#f6d532',
        envMap: environmentMapTexture
    }),
    new THREE.MeshStandardMaterial({
        metalness: 0.5,
        roughness: 0.2,
        color: '#e78b0f',
        envMap: environmentMapTexture
    }),
]

const createSphere = (radius, position) =>
{
    // Three.js mesh
    const mesh = new THREE.Mesh(
        sphereGeometry,
        objectMaterials[Math.round(Math.random() * 3)]
    )
    mesh.scale.set(radius,radius,radius)
    mesh.castShadow = true
    mesh.position.copy(position)

    // CANNON body
    const shape = new CANNON.Sphere(radius)
    const body = new CANNON.Body({
        mass:1,
        shape: shape,
    })
    body.position.copy(position)
    body.addEventListener('collide',playHitSound)

    world.addBody(body)
    scene.add(mesh)

    objectsToUpdate.push({
        mesh: mesh,
        body: body
    })
}

parameters.addSphere = () =>
    {
        createSphere(
            Math.random() * 0.5 + 0.05,
            new THREE.Vector3(
                (Math.random() - 0.5) * 3,
                Math.random() + 2,
                (Math.random() - 0.5) * 3
            )
        )
    }

gui.add(parameters,'addSphere')

const boxGeometry = new THREE.BoxGeometry(1,1,1)

const createBox = (width, height, depth, position) =>
{
    // Three.js mesh
    const mesh = new THREE.Mesh(
        boxGeometry,
        objectMaterials[Math.round(Math.random() * 3)]
    )
    mesh.scale.set(width,height,depth)
    mesh.castShadow = true
    mesh.position.copy(position)

    // CANNON body
    const shape = new CANNON.Box(new CANNON.Vec3(width/2,height/2,depth/2))
    const body = new CANNON.Body({
        mass:1,
        shape: shape,
    })
    // body.fixedRotation = true
    // body.updateMassProperties()
    body.position.copy(position)
    body.addEventListener('collide',playHitSound)

    world.addBody(body)
    scene.add(mesh)

    objectsToUpdate.push({
        mesh: mesh,
        body: body
    })
}

parameters.addBox = () =>
    {
        createBox(
            Math.random() * 0.5 + 0.05,
            Math.random() * 0.5 + 0.05,
            Math.random() * 0.5 + 0.05,
            new THREE.Vector3(
                (Math.random() - 0.5) * 3,
                Math.random() + 2,
                (Math.random() - 0.5) * 3
            )
        )
    }

gui.add(parameters,'addBox')

/**
 * Animate
 */
parameters.pulse = () =>
{
    for(const object of objectsToUpdate)
    {
        object.body.applyImpulse(new CANNON.Vec3(0,5,0))
    }
}

gui.add(parameters,'pulse')

parameters.reset = () =>
{
    for(const object of objectsToUpdate)
    {
        // Remove body
        object.body.removeEventListener('collide', playHitSound)
        world.removeBody(object.body)
        
        // Remove mesh
        scene.remove(object.mesh)
    }

    objectsToUpdate.splice(0, objectsToUpdate.length)
}

gui.add(parameters,'reset')

const timer = new Timer()
let previousTime = 0

const tick = () =>
{
    const elapsedTime = timer.getElapsed()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime
    timer.update()

    // Update physics world
    // sphereBody.applyForce(new CANNON.Vec3(-0.5,0,0), sphereBody.position)

    world.step(1 / 60, deltaTime, 3)

    for(const object of objectsToUpdate)
    {
        object.mesh.position.copy(object.body.position)
        object.mesh.quaternion.copy(object.body.quaternion)
    }

    // sphere.position.copy(sphereBody.position)
    // sphere.position.x = sphereBody.position.x
    // sphere.position.y = sphereBody.position.y
    // sphere.position.z = sphereBody.position.z

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()