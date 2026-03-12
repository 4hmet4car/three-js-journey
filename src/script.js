import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Timer } from 'three/addons/misc/Timer.js'
import GUI from 'lil-gui'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js'

/**
 * Base
 */
// Debug
const gui = new GUI({
    closeFolders: true
})

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Materials
const black = new THREE.MeshStandardMaterial({ color: '#3f3e3d' })
const gray = new THREE.MeshStandardMaterial({ color: '#e0dddb' })

/**
 * House
 */
// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 30),
    new THREE.MeshStandardMaterial()
)
floor.rotation.x = -Math.PI * 0.5
floor.rotation.y = -Math.PI * 0.015
floor.position.y = -0.75
floor.position.z = -8
scene.add(floor)

// House container
const house = new THREE.Group()
scene.add(house)

// Atelier container
const atelier = new THREE.Group()

// Living container
const living = new THREE.Group()

// Walls
const atelierLeft = new THREE.Mesh(
    new THREE.BoxGeometry(0.9, 1.5, 10, 1, 1, 1),
    gray
)
atelierLeft.position.y = atelierLeft.geometry.parameters.height * 0.5
atelierLeft.position.z = -atelierLeft.geometry.parameters.depth * 0.5
atelierLeft.position.x = -0.05

const atelierFront = new THREE.Mesh(
    new THREE.BoxGeometry(0.1, 1.5, 0.5, 1, 1, 1),
    gray
)
atelierFront.position.y = atelierFront.geometry.parameters.height * 0.5
atelierFront.position.z = -atelierFront.geometry.parameters.depth * 0.5
atelierFront.position.x = 0.45

const atelierBack = new THREE.Mesh(
    new THREE.BoxGeometry(0.1, 1.5, 3, 1, 1, 1),
    gray
)
atelierBack.position.y = atelierBack.geometry.parameters.height * 0.5
atelierBack.position.z = -atelierBack.geometry.parameters.depth * 0.5 - 1
atelierBack.position.x = 0.45

const atelierBottom = new THREE.Mesh(
    new THREE.BoxGeometry(0.1, 0.2, 3, 1, 1, 1),
    gray
)
atelierBottom.position.y = atelierBottom.geometry.parameters.height * 0.5
atelierBottom.position.z = -atelierBottom.geometry.parameters.depth * 0.5 - 0.5
atelierBottom.position.x = 0.45

const atelierTop = new THREE.Mesh(
    new THREE.BoxGeometry(0.1, 0.6, 0.5, 1, 1, 1),
    gray
)
atelierTop.position.y = atelierTop.geometry.parameters.height * 0.5 + 0.9
atelierTop.position.z = -atelierTop.geometry.parameters.depth * 0.5 - 0.5
atelierTop.position.x = 0.45

const atelierFloor = new THREE.Mesh(
    new THREE.BoxGeometry(2.3, 1, 10, 1, 1, 1),
    gray
)
atelierFloor.position.y = -atelierFloor.geometry.parameters.height * 0.5
atelierFloor.position.z = -atelierFloor.geometry.parameters.depth * 0.5 + 0.5
atelierFloor.position.x = 0.3

const atelierBlackFloor = new THREE.Mesh(
    new THREE.PlaneGeometry(2.1, 2.3, 1, 1),
    black
)
atelierBlackFloor.position.y = 0.005
atelierBlackFloor.position.z = -atelierBlackFloor.geometry.parameters.height * 0.5 + 0.4
atelierBlackFloor.position.x = 0.3
atelierBlackFloor.rotation.x = -Math.PI * 0.5

atelier.add(atelierFloor, atelierBlackFloor, atelierLeft, atelierFront, atelierBack, atelierBottom, atelierTop)

const livingTop = new THREE.Mesh(
    new THREE.BoxGeometry(1, 3.05, 10, 1, 1, 1),
    black
)
livingTop.position.y = livingTop.geometry.parameters.height * 0.5 + 0.95
livingTop.position.x = 0.9
livingTop.position.z = -livingTop.geometry.parameters.depth * 0.5 + -2

const livingHump = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 1.75, 0.25, 1, 1, 1),
    black
)
livingHump.position.y = livingHump.geometry.parameters.height * 0.5 + 2.5
livingHump.position.x = 1.15
livingHump.position.z = -livingHump.geometry.parameters.depth * 0.5 + -1.75

living.add(livingTop, livingHump)

const enterance = new THREE.Mesh(
    new THREE.BoxGeometry(1, 0.95, 10, 1, 1, 1),
    gray
)
enterance.position.y = enterance.geometry.parameters.height * 0.5
enterance.position.x = 0.9
enterance.position.z = -enterance.geometry.parameters.depth * 0.5 + -4

const middleBalcony = new THREE.Mesh(
    new THREE.BoxGeometry(0.95, 0.55, 0.1, 1, 1, 1),
    black
)
middleBalcony.position.y = middleBalcony.geometry.parameters.height * 0.5
middleBalcony.position.x = 0.925
middleBalcony.position.z = -middleBalcony.geometry.parameters.depth * 0.5 - 2

const middleBalconyRight = new THREE.Mesh(
    new THREE.BoxGeometry(0.1, 0.55, 1, 1, 1, 1),
    black
)
middleBalconyRight.position.y = middleBalconyRight.geometry.parameters.height * 0.5
middleBalconyRight.position.x = 1.35
middleBalconyRight.position.z = -middleBalconyRight.geometry.parameters.depth * 0.5 - 2.1

const middleBalconyTop = new THREE.Mesh(
    new THREE.BoxGeometry(0.1, 0.4, 0.5, 1, 1, 1),
    black
)
middleBalconyTop.position.y = middleBalconyTop.geometry.parameters.height * 0.5 + 0.55
middleBalconyTop.position.x = 1.35
middleBalconyTop.position.z = -middleBalconyTop.geometry.parameters.depth * 0.5 - 2.6

const inStairs = new THREE.Mesh(
    new THREE.BoxGeometry(0.8, 3, 10, 1, 1, 1),
    gray
)
inStairs.position.y = inStairs.geometry.parameters.height * 0.5
inStairs.position.x = 1.8
inStairs.position.z = -inStairs.geometry.parameters.depth * 0.5 - 4

const inStairsFloor = new THREE.Mesh(
    new THREE.BoxGeometry(0.8, 1, 10, 1, 1, 1),
    gray
)
inStairsFloor.position.y = -inStairsFloor.geometry.parameters.height * 0.5
inStairsFloor.position.x = 1.8
inStairsFloor.position.z = -inStairsFloor.geometry.parameters.depth * 0.5 - 1.5

const stairSideVertices = [
    new THREE.Vector2(-2, 0),
    new THREE.Vector2(0, 0),
    new THREE.Vector2(0, 1)
]
const stairSideExtrudeSettings = {
    depth: 0.15,
    bevelEnabled: false,
}
const stairSideShape = new THREE.Shape(stairSideVertices)
const stairSideGeometry = new THREE.ExtrudeGeometry(stairSideShape, stairSideExtrudeSettings)

const stairSide = new THREE.Mesh(stairSideGeometry, gray)
stairSide.position.x = inStairsFloor.position.x + inStairsFloor.geometry.parameters.width / 2 - stairSide.geometry.parameters.options.depth
stairSide.position.y = -1
stairSide.position.z = -1.5
stairSide.rotation.y = Math.PI * 0.5

const stairVertices = [
    new THREE.Vector2(-1.75, 0),
    new THREE.Vector2(-1.75, 0.125),
    new THREE.Vector2(-1.5, 0.125),
    new THREE.Vector2(-1.5, 0.25),
    new THREE.Vector2(-1.25, 0.25),
    new THREE.Vector2(-1.25, 0.375),
    new THREE.Vector2(-1, 0.375),
    new THREE.Vector2(-1, 0.5),
    new THREE.Vector2(-0.75, 0.5),
    new THREE.Vector2(-0.75, 0.625),
    new THREE.Vector2(-0.5, 0.625),
    new THREE.Vector2(-0.5, 0.75),
    new THREE.Vector2(-0.25, 0.75),
    new THREE.Vector2(-0.25, 0.875),
    new THREE.Vector2(-0, 0.875),
]
const stairExtrudeSettings = {
    depth: 0.7,
    bevelEnabled: false,
}
const stairShape = new THREE.Shape(stairVertices)
const stairGeometry = new THREE.ExtrudeGeometry(stairShape, stairExtrudeSettings)

const stairs = new THREE.Mesh(stairGeometry, gray)
stairs.position.x = inStairsFloor.position.x - inStairsFloor.geometry.parameters.width / 2
stairs.position.y = -1
stairs.position.z = -1.5
stairs.rotation.y = Math.PI * 0.5

const closet = new THREE.Mesh(
    new THREE.BoxGeometry(1, 3, 10, 1, 1, 1),
    black
)
closet.position.y = closet.geometry.parameters.height * 0.5
closet.position.x = 2.7
closet.position.z = -closet.geometry.parameters.depth * 0.5 - 3.5

const closetFloor = new THREE.Mesh(
    new THREE.BoxGeometry(2.8, 1, 10, 1, 1, 1),
    gray
)
closetFloor.position.y = -closetFloor.geometry.parameters.height * 0.5
closetFloor.position.x = 3.6
closetFloor.position.z = -closetFloor.geometry.parameters.depth * 0.5 - 2.8

const bedroom = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1.5, 0.5, 1, 1, 1),
    black
)
bedroom.position.y = bedroom.geometry.parameters.height * 0.5 + 1
bedroom.position.x = 2.7
bedroom.position.z = -bedroom.geometry.parameters.depth * 0.5 - 3

const rightBalcony = new THREE.Mesh(
    new THREE.BoxGeometry(2.5, 0.55, 0.1, 1, 1, 1),
    gray
)
rightBalcony.position.y = rightBalcony.geometry.parameters.height * 0.5
rightBalcony.position.x = 3.45
rightBalcony.position.z = -rightBalcony.geometry.parameters.depth * 0.5 - 3

const rightBalconyRight = new THREE.Mesh(
    new THREE.BoxGeometry(0.6, 0.9, 0.1, 1, 1, 1),
    black
)
rightBalconyRight.position.y = rightBalconyRight.geometry.parameters.height * 0.5 + 0.55
rightBalconyRight.position.x = 4.4
rightBalconyRight.position.z = -rightBalconyRight.geometry.parameters.depth * 0.5 - 3

const rightBalconyTop = new THREE.Mesh(
    new THREE.BoxGeometry(0.9, 0.45, 0.1, 1, 1, 1),
    black
)
rightBalconyTop.position.y = rightBalconyTop.geometry.parameters.height * 0.5 + 1
rightBalconyTop.position.x = 2.9 + 0.75
rightBalconyTop.position.z = -rightBalconyTop.geometry.parameters.depth * 0.5 - 3

house.add(stairs, stairSide, atelier, living, enterance, middleBalcony, middleBalconyRight, middleBalconyTop, inStairs, inStairsFloor, closet, closetFloor, bedroom, rightBalcony, rightBalconyRight, rightBalconyTop)

// Trees container
const trees = new THREE.Group()
scene.add(trees)

// Tree trunk
const trunkGeometry = new THREE.ConeGeometry(0.05, 0.5, 8)
const trunkMaterial = new THREE.MeshStandardMaterial()

// Tree leaves
const leavesGeometry = new THREE.TetrahedronGeometry(0.3, 3)
const leavesMaterial = new THREE.MeshStandardMaterial()

for (let i = 0; i < 30; i++) {
    const angle = Math.random() * Math.PI * 2
    const radius = 9 + Math.random() * 4
    const x = Math.sin(angle) * radius * 0.5
    const z = Math.cos(angle) * radius

    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial)
    trunk.position.y = trunk.geometry.parameters.height * 0.5

    const leaves = new THREE.Mesh(leavesGeometry, leavesMaterial)
    leaves.position.y = leaves.geometry.parameters.radius + 0.2

    const tree = new THREE.Group()
    tree.add(trunk, leaves)

    tree.position.y = -Math.random() * 0.1 - 0.6
    tree.position.x = x + 2
    tree.position.z = z - 7
    tree.rotation.x = (Math.random() - 0.5) * 0.2
    tree.rotation.y = (Math.random() - 0.5) * 0.2
    tree.rotation.z = (Math.random() - 0.5) * 0.2

    trees.add(tree)
}


/**
 * Lights
 */

//House lights
const atelierLight = new THREE.RectAreaLight('#ffd900', 1, 0.5, 0.75)
const atelierLightHelper = new RectAreaLightHelper(atelierLight)
atelierLight.add(atelierLightHelper)
atelierLight.rotation.y = Math.PI * -0.5
atelierLight.position.x = 0.4099
atelierLight.position.z = -0.75
atelierLight.position.y = atelierLight.height * 0.5 + atelierBottom.geometry.parameters.height

const inStairsLight = new THREE.RectAreaLight('#ffd900', 1, 0.8, 0.4)
const inStairsLightHelper = new RectAreaLightHelper(inStairsLight)
inStairsLight.add(inStairsLightHelper)
inStairsLight.rotation.y = Math.PI
inStairsLight.position.x = 1.8
inStairsLight.position.y = 1.45
inStairsLight.position.z = -3.9999

const humpLight = new THREE.RectAreaLight('#ffd900', 1, 0.4, 1.65)
const humpLightHelper = new RectAreaLightHelper(humpLight)
humpLight.add(humpLightHelper)
humpLight.rotation.y = Math.PI
humpLight.position.x = 1.15
humpLight.position.y = livingHump.geometry.parameters.height * 0.5 + 2.5
humpLight.position.z = -1.7499

const enteranceLight1 = new THREE.PointLight('#ffd900', 0.5)
enteranceLight1.position.x = 1.15
enteranceLight1.position.y = 0.94
enteranceLight1.position.z = -2.25

const enteranceLight2 = new THREE.PointLight('#ffd900', 0.5)
enteranceLight2.position.x = 1.15
enteranceLight2.position.y = 0.94
enteranceLight2.position.z = -3.7

house.add(atelierLight, inStairsLight, humpLight, enteranceLight1, enteranceLight2)

// Ambient light
const ambientLight = new THREE.AmbientLight('#ffffff', 0.5)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight('#ffffff', 1.5)
directionalLight.position.set(3, 2, -8)
scene.add(directionalLight)

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
camera.position.x = 4.4 * 1
camera.position.y = 3.1 * 1
camera.position.z = 4.9 * 1
scene.add(camera)

// window.addEventListener('mousedown',()=>{
//     console.log(camera.position)
// })

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.target.copy(middleBalcony.position)

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
const timer = new Timer()

const tick = () => {
    // Timer
    timer.update()
    const elapsedTime = timer.getElapsed()

    // console.log(camera.position)

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()