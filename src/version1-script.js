import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Timer } from 'three/addons/misc/Timer.js'
import GUI from 'lil-gui'
import { Sky } from 'three/examples/jsm/Addons.js'
import gsap from 'gsap'

/**
 * Base
 */
// Debug
const gui = new GUI({
    width: 300
})
const viewportControls = gui.addFolder('Viewport Controls')
const floorControls = gui.addFolder('Floor Controls')
const houseControls = gui.addFolder('House Controls')
const skyControls = gui.addFolder('Sky Controls')

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
// Loading Manager
const loadingManager = new THREE.LoadingManager()
loadingManager.onStart = function (url, itemsLoaded, itemsTotal) {
    console.log('Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
}

loadingManager.onLoad = function () {
    console.log('Loading complete!');
}

loadingManager.onProgress = function (url, itemsLoaded, itemsTotal) {
    console.log('Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
}

loadingManager.onError = function (url) {
    console.log('There was an error loading ' + url);
}

// Texture Loader
const textureLoader = new THREE.TextureLoader(loadingManager)

// Floor Textures
const floorAlphaTexture = textureLoader.load('./floor/alpha.jpg')
const floorARMTexture = textureLoader.load('./floor/snowy_floor/snow_01_arm_1k.webp')
const floorColorTexture = textureLoader.load('./floor/snowy_floor/snow_01_diff_1k.webp')
const floorDisplacementTexture = textureLoader.load('./floor/snowy_floor/snow_01_disp_1k.webp')
const floorNormalTexture = textureLoader.load('./floor/snowy_floor/snow_01_nor_gl_1k.webp')

floorColorTexture.colorSpace = THREE.SRGBColorSpace

floorColorTexture.repeat.set(16, 16)
floorARMTexture.repeat.set(16, 16)
floorDisplacementTexture.repeat.set(16, 16)
floorNormalTexture.repeat.set(16, 16)

floorColorTexture.wrapS = THREE.RepeatWrapping
floorARMTexture.wrapS = THREE.RepeatWrapping
floorDisplacementTexture.wrapS = THREE.RepeatWrapping
floorNormalTexture.wrapS = THREE.RepeatWrapping

floorColorTexture.wrapT = THREE.RepeatWrapping
floorARMTexture.wrapT = THREE.RepeatWrapping
floorDisplacementTexture.wrapT = THREE.RepeatWrapping
floorNormalTexture.wrapT = THREE.RepeatWrapping

// Wall Textures
const wallARMTexture = textureLoader.load('./walls/wooden_walls/planks_brown_10_arm_1k.webp')
const wallColorTexture = textureLoader.load('./walls/wooden_walls/planks_brown_10_diff_1k.webp')
const wallDisplacementTexture = textureLoader.load('./walls/wooden_walls/planks_brown_10_disp_1k.webp')
const wallNormalTexture = textureLoader.load('./walls/wooden_walls/planks_brown_10_nor_gl_1k.webp')

wallColorTexture.colorSpace = THREE.SRGBColorSpace

wallColorTexture.repeat.set(4, 4)
wallARMTexture.repeat.set(4, 4)
wallDisplacementTexture.repeat.set(4, 4)
wallNormalTexture.repeat.set(4, 4)

wallColorTexture.wrapS = THREE.RepeatWrapping
wallARMTexture.wrapS = THREE.RepeatWrapping
wallDisplacementTexture.wrapS = THREE.RepeatWrapping
wallNormalTexture.wrapS = THREE.RepeatWrapping

wallColorTexture.wrapT = THREE.RepeatWrapping
wallARMTexture.wrapT = THREE.RepeatWrapping
wallDisplacementTexture.wrapT = THREE.RepeatWrapping
wallNormalTexture.wrapT = THREE.RepeatWrapping

// Pole Textures
const poleARMTexture = textureLoader.load('./pole/bark_brown_02_arm_1k.webp')
const poleColorTexture = textureLoader.load('./pole/bark_brown_02_diff_1k.webp')
const poleDisplacementTexture = textureLoader.load('./pole/bark_brown_02_disp_1k.webp')
const poleNormalTexture = textureLoader.load('./pole/bark_brown_02_nor_gl_1k.webp')

poleColorTexture.colorSpace = THREE.SRGBColorSpace

poleColorTexture.repeat.set(1, 4)
poleARMTexture.repeat.set(1, 4)
poleDisplacementTexture.repeat.set(1, 4)
poleNormalTexture.repeat.set(1, 4)

poleColorTexture.wrapS = THREE.RepeatWrapping
poleARMTexture.wrapS = THREE.RepeatWrapping
poleDisplacementTexture.wrapS = THREE.RepeatWrapping
poleNormalTexture.wrapS = THREE.RepeatWrapping

poleColorTexture.wrapT = THREE.RepeatWrapping
poleARMTexture.wrapT = THREE.RepeatWrapping
poleDisplacementTexture.wrapT = THREE.RepeatWrapping
poleNormalTexture.wrapT = THREE.RepeatWrapping

// Roof Textures
const roofARMTexture = textureLoader.load('./roof/roof_slates_02_arm_1k.webp')
const roofColorTexture = textureLoader.load('./roof/roof_slates_02_diff_1k.webp')
const roofNormalTexture = textureLoader.load('./roof/roof_slates_02_nor_gl_1k.webp')

roofColorTexture.colorSpace = THREE.SRGBColorSpace

roofColorTexture.repeat.set(1, 1)
roofARMTexture.repeat.set(1, 1)
roofNormalTexture.repeat.set(1, 1)

roofColorTexture.wrapS = THREE.RepeatWrapping
roofARMTexture.wrapS = THREE.RepeatWrapping
roofNormalTexture.wrapS = THREE.RepeatWrapping

roofColorTexture.wrapT = THREE.RepeatWrapping
roofARMTexture.wrapT = THREE.RepeatWrapping
roofNormalTexture.wrapT = THREE.RepeatWrapping

// Bush Textures
const bushARMTexture = textureLoader.load('./bushes/leaves_forest_ground_arm_1k.webp')
const bushColorTexture = textureLoader.load('./bushes/leaves_forest_ground_diff_1k.webp')
const bushNormalTexture = textureLoader.load('./bushes/leaves_forest_ground_nor_gl_1k.webp')

bushColorTexture.colorSpace = THREE.SRGBColorSpace

bushColorTexture.repeat.set(2, 1)
bushARMTexture.repeat.set(2, 1)
bushNormalTexture.repeat.set(2, 1)

bushColorTexture.wrapS = THREE.RepeatWrapping
bushARMTexture.wrapS = THREE.RepeatWrapping
bushNormalTexture.wrapS = THREE.RepeatWrapping

bushColorTexture.wrapT = THREE.RepeatWrapping
bushARMTexture.wrapT = THREE.RepeatWrapping
bushNormalTexture.wrapT = THREE.RepeatWrapping

// Grave Textures
const graveARMTexture = textureLoader.load('./graves/rock_wall_08_arm_1k.webp')
const graveColorTexture = textureLoader.load('./graves/rock_wall_08_diff_1k.webp')
const graveNormalTexture = textureLoader.load('./graves/rock_wall_08_nor_gl_1k.webp')

graveColorTexture.colorSpace = THREE.SRGBColorSpace

graveColorTexture.repeat.set(0.6, 0.8)
graveARMTexture.repeat.set(0.6, 0.8)
graveNormalTexture.repeat.set(0.6, 0.8)

graveColorTexture.wrapS = THREE.RepeatWrapping
graveARMTexture.wrapS = THREE.RepeatWrapping
graveNormalTexture.wrapS = THREE.RepeatWrapping

graveColorTexture.wrapT = THREE.RepeatWrapping
graveARMTexture.wrapT = THREE.RepeatWrapping
graveNormalTexture.wrapT = THREE.RepeatWrapping

// Door Textures
const doorAlphaTexture = textureLoader.load('./door/alpha.webp')
const doorAmbientTexture = textureLoader.load('./door/ambientOcclusion.webp')
const doorColorTexture = textureLoader.load('./door/color.webp')
const doorHeightTexture = textureLoader.load('./door/height.webp')
const doorMetalnessTexture = textureLoader.load('./door/metalness.webp')
const doorNormalTexture = textureLoader.load('./door/normal.webp')
const doorRoughnessTexture = textureLoader.load('./door/roughness.webp')

doorColorTexture.colorSpace = THREE.SRGBColorSpace

// Axes Helper
const axesHelper = new THREE.AxesHelper(5)
axesHelper.position.y = 0.01
scene.add(axesHelper)

viewportControls
    .add(axesHelper, 'visible')
    .name('Axes Helper')

/**
 * House
 */
// Floor Container
const floorGroup = new THREE.Group()
scene.add(floorGroup)

// Floor
const floorObject = {}
floorObject.width = 25
floorObject.height = 25
floorObject.displacementScale = 0.1
floorObject.displacementBias = 0

const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(floorObject.width, floorObject.height, 128, 128),
    new THREE.MeshStandardMaterial({
        alphaMap: floorAlphaTexture,
        transparent: true,
        map: floorColorTexture,
        aoMap: floorARMTexture,
        roughnessMap: floorARMTexture,
        metalnessMap: floorARMTexture,
        normalMap: floorNormalTexture,
        displacementMap: floorDisplacementTexture,
        displacementScale: 0.1,
        displacementBias: 0,
        alphaTest: 0.001
    })
)
floor.material.side = THREE.DoubleSide
floor.rotation.x = - Math.PI * 0.5
floorGroup.add(floor)

// Floor Controls
floorControls
    .add(floorObject, 'width')
    .name('Width')
    .min(10)
    .max(30)
    .onChange(() => {
        const tempHeight = floor.geometry.parameters.height
        floor.geometry.dispose()
        floor.geometry = new THREE.PlaneGeometry(floorObject.width, tempHeight, 128, 128)
    })

floorControls
    .add(floorObject, 'height')
    .name('Height')
    .min(10)
    .max(30)
    .onChange(() => {
        const tempWidth = floor.geometry.parameters.width
        floor.geometry.dispose()
        floor.geometry = new THREE.PlaneGeometry(tempWidth, floorObject.height, 128, 128)
    })

floorControls
    .add(floorObject, 'displacementScale')
    .name('Displacement Scale')
    .min(-1)
    .max(1)
    .onChange(() => {
        floor.material.displacementScale = floorObject.displacementScale
    })

floorControls
    .add(floorObject, 'displacementBias')
    .name('Displacement Bias')
    .min(-1)
    .max(1)
    .onChange(() => {
        floor.material.displacementBias = floorObject.displacementBias
    })

// House container
const houseGroup = new THREE.Group()
scene.add(houseGroup)

// House
const houseObject = {}
houseObject.wallWidth = 4
houseObject.wallHeight = 2.5
houseObject.wallDepth = 4
houseObject.roofHeight = 1.5
houseObject.roofMargin = 0.1
houseObject.roofWidth = Math.sqrt((Math.min(houseObject.wallWidth / 2, houseObject.wallDepth / 2) ** 2) * 2) + houseObject.roofMargin
houseObject.doorWidth = 2.2
houseObject.bushSize = 1

// House Walls
const walls = new THREE.Mesh(
    new THREE.BoxGeometry(houseObject.wallWidth, houseObject.wallHeight, houseObject.wallDepth, 64, 64, 64),
    new THREE.MeshStandardMaterial({
        transparent: true,
        map: wallColorTexture,
        aoMap: wallARMTexture,
        roughnessMap: wallARMTexture,
        metalnessMap: wallARMTexture,
        normalMap: wallNormalTexture,
        displacementMap: wallDisplacementTexture,
        displacementScale: 0.03
    })
)
walls.position.y = houseObject.wallHeight / 2
houseGroup.add(walls)

// House Roof

const roofVertices = new Float32Array([
    // Base square vertices
    -houseObject.wallWidth * 0.5 - 0.1, 0, -houseObject.wallWidth * 0.5 - 0.1,   // 0
    houseObject.wallWidth * 0.5 + 0.1, 0, -houseObject.wallWidth * 0.5 - 0.1,   // 1
    houseObject.wallWidth * 0.5 + 0.1, 0, houseObject.wallWidth * 0.5 + 0.1,   // 2
    -houseObject.wallWidth * 0.5 - 0.1, 0, houseObject.wallWidth * 0.5 + 0.1,   // 3

    // Apex of the pyramid
    0, houseObject.roofHeight, 0    // 4
])

const roofIndices = [
    // Base face (quad)
    0, 1, 2,
    0, 2, 3,

    // Side faces (triangles)
    0, 1, 4, // front face
    1, 2, 4, // right face
    2, 3, 4, // back face
    3, 0, 4  // left face
]

// Define the UVs for each vertex
const roofUVs = new Float32Array([
    // Base square UVs
    0, 0,   // 0
    1, 0,   // 1
    1, 1,   // 2
    0, 1,   // 3

    // Apex UV (simple, map to the center for all side faces)
    0.5, 0.5 // 4
]);

const roofGeometry = new THREE.BufferGeometry()

// Add vertices to geometry
roofGeometry.setAttribute('position', new THREE.BufferAttribute(roofVertices, 3))

// Add faces (indices) to geometry
roofGeometry.setIndex(roofIndices)

// Add UVs to geometry
roofGeometry.setAttribute('uv', new THREE.BufferAttribute(roofUVs, 2));

const roof = new THREE.Mesh(
    roofGeometry,
    new THREE.MeshStandardMaterial({
        transparent: true,
        map: roofColorTexture,
        aoMap: roofARMTexture,
        roughnessMap: roofARMTexture,
        metalnessMap: roofARMTexture,
        normalMap: roofNormalTexture,
        side: THREE.DoubleSide
    })
)
roof.position.y = houseObject.wallHeight
houseGroup.add(roof)

// House Door
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(houseObject.doorWidth, houseObject.doorWidth, 128, 128),
    new THREE.MeshStandardMaterial({
        map: doorColorTexture,
        transparent: true,
        alphaMap: doorAlphaTexture,
        aoMap: doorAmbientTexture,
        displacementMap: doorHeightTexture,
        normalMap: doorNormalTexture,
        metalnessMap: doorMetalnessTexture,
        roughnessMap: doorRoughnessTexture,
        displacementScale: 0.15,
        displacementBias: -0.02,
        //depthWrite: false
        alphaTest: 0.001
    })
)
door.position.y = houseObject.doorWidth / 2 - 0.1
door.position.z = houseObject.wallDepth / 2 + 0.01
houseGroup.add(door)

// House Poles
const poleGeometry = new THREE.CylinderGeometry(0.05, 0.05, houseObject.wallHeight, 8, 32, true)
const poleMaterial = new THREE.MeshStandardMaterial({
    transparent: true,
    map: poleColorTexture,
    aoMap: poleARMTexture,
    roughnessMap: poleARMTexture,
    metalnessMap: poleARMTexture,
    normalMap: poleNormalTexture,
    displacementMap: poleDisplacementTexture,
    displacementScale: 0.05,
    displacementBias: 0
})

const pole1 = new THREE.Mesh(poleGeometry, poleMaterial)
pole1.position.set(houseObject.wallWidth / 2, houseObject.wallHeight / 2, houseObject.wallDepth / 2)

const pole2 = new THREE.Mesh(poleGeometry, poleMaterial)
pole2.position.set(-houseObject.wallWidth / 2, houseObject.wallHeight / 2, houseObject.wallDepth / 2)

const pole3 = new THREE.Mesh(poleGeometry, poleMaterial)
pole3.position.set(houseObject.wallWidth / 2, houseObject.wallHeight / 2, -houseObject.wallDepth / 2)

const pole4 = new THREE.Mesh(poleGeometry, poleMaterial)
pole4.position.set(-houseObject.wallWidth / 2, houseObject.wallHeight / 2, -houseObject.wallDepth / 2)

houseGroup.add(pole1, pole2, pole3, pole4)

// Bushes
const bushGeometry = new THREE.SphereGeometry(houseObject.bushSize, 16, 16)
const bushMaterial = new THREE.MeshStandardMaterial({
    color: '#ccffcc',
    transparent: true,
    map: bushColorTexture,
    aoMap: bushARMTexture,
    roughnessMap: bushARMTexture,
    metalnessMap: bushARMTexture,
    normalMap: bushNormalTexture,
})

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
bush1.scale.set(0.5, 0.5, 0.5)
bush1.position.set(0.8, 0.2, 2.2)
bush1.rotation.x = - 0.75

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush2.scale.set(0.25, 0.25, 0.25)
bush2.position.set(1.4, 0.1, 2.1)
bush2.rotation.x = - 0.75

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush3.scale.set(0.4, 0.4, 0.4)
bush3.position.set(-0.8, 0.1, 2.2)
bush3.rotation.x = - 0.75

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
bush4.scale.set(0.15, 0.15, 0.15)
bush4.position.set(-1, 0.05, 2.6)
bush4.rotation.x = - 0.75

houseGroup.add(bush1, bush2, bush3, bush4)

// Graves
const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2)
const graveMaterial = new THREE.MeshStandardMaterial({
    transparent: true,
    map: graveColorTexture,
    aoMap: graveARMTexture,
    roughnessMap: graveARMTexture,
    metalnessMap: graveARMTexture,
    normalMap: graveNormalTexture,
})

const graves = new THREE.Group()
scene.add(graves)

for (let i = 0; i < 30; i++) {
    const angle = Math.random() * Math.PI * 2

    const grave = new THREE.Mesh(graveGeometry, graveMaterial)
    graves.add(grave)
    //console.log(grave)
    grave.position.x = Math.cos(angle) * (houseObject.wallWidth + 1.5) + (Math.random() - 0.5) * 3
    grave.position.y = 0.4 - Math.random() * 0.3
    grave.position.z = Math.sin(angle) * (houseObject.wallDepth + 1.5) + (Math.random() - 0.5) * 3

    grave.rotation.x = (Math.random() - 0.5) * 0.4
    grave.rotation.y = (Math.random() - 0.5) * 0.4
    grave.rotation.z = (Math.random() - 0.5) * 0.4

}

// House Controls
houseControls
    .add(houseObject, 'wallWidth')
    .name('Wall Width')
    .min(1.5)
    .max(6)
    .onChange(() => {
        const tempHeight = walls.geometry.parameters.height
        const tempDepth = walls.geometry.parameters.depth
        walls.geometry.dispose()
        walls.geometry = new THREE.BoxGeometry(houseObject.wallWidth, tempHeight, tempDepth, 64, 64, 64)
        roof.scale.x = houseObject.wallWidth / 4
        graves.clear()
        for (let i = 0; i < 30; i++) {
            const angle = Math.random() * Math.PI * 2

            const grave = new THREE.Mesh(graveGeometry, graveMaterial)
            graves.add(grave)

            grave.position.x = Math.cos(angle) * (houseObject.wallWidth + 1.5) + (Math.random() - 0.5) * 3
            grave.position.y = 0.4 - Math.random() * 0.3
            grave.position.z = Math.sin(angle) * (houseObject.wallDepth + 1.5) + (Math.random() - 0.5) * 3

            grave.rotation.x = (Math.random() - 0.5) * 0.4
            grave.rotation.y = (Math.random() - 0.5) * 0.4
            grave.rotation.z = (Math.random() - 0.5) * 0.4

            grave.castShadow = true
            grave.receiveShadow = true

        }
        pole1.position.x = houseObject.wallWidth / 2
        pole2.position.x = -houseObject.wallWidth / 2
        pole3.position.x = houseObject.wallWidth / 2
        pole4.position.x = -houseObject.wallWidth / 2
    })

houseControls
    .add(houseObject, 'wallHeight')
    .name('Wall Height')
    .min(2.3)
    .max(6)
    .onChange(() => {
        const tempWidth = walls.geometry.parameters.width
        const tempDepth = walls.geometry.parameters.depth
        walls.geometry.dispose()
        walls.geometry = new THREE.BoxGeometry(tempWidth, houseObject.wallHeight, tempDepth, 64, 64, 64)
        walls.position.y = houseObject.wallHeight / 2
        roof.position.y = houseObject.wallHeight
        pole1.geometry.dispose()
        pole2.geometry.dispose()
        pole3.geometry.dispose()
        pole4.geometry.dispose()
        pole1.geometry = new THREE.CylinderGeometry(0.05, 0.05, houseObject.wallHeight, 8, 32, true)
        pole2.geometry = new THREE.CylinderGeometry(0.05, 0.05, houseObject.wallHeight, 8, 32, true)
        pole3.geometry = new THREE.CylinderGeometry(0.05, 0.05, houseObject.wallHeight, 8, 32, true)
        pole4.geometry = new THREE.CylinderGeometry(0.05, 0.05, houseObject.wallHeight, 8, 32, true)
        pole1.position.y = houseObject.wallHeight / 2
        pole2.position.y = houseObject.wallHeight / 2
        pole3.position.y = houseObject.wallHeight / 2
        pole4.position.y = houseObject.wallHeight / 2
    })

houseControls
    .add(houseObject, 'wallDepth')
    .name('Wall Depth')
    .min(1)
    .max(6)
    .onChange(() => {
        const tempWidth = walls.geometry.parameters.width
        const tempHeight = walls.geometry.parameters.height
        const tempDepth = walls.geometry.parameters.depth
        walls.geometry.dispose()
        walls.geometry = new THREE.BoxGeometry(tempWidth, tempHeight, houseObject.wallDepth, 64, 64, 64)
        roof.scale.z = houseObject.wallDepth / 4
        door.position.z = houseObject.wallDepth / 2 + 0.01
        bush1.position.z = houseObject.wallDepth / 2 + 0.2
        bush2.position.z = houseObject.wallDepth / 2 + 0.1
        bush3.position.z = houseObject.wallDepth / 2 + 0.2
        bush4.position.z = houseObject.wallDepth / 2 + 0.6
        graves.clear()
        for (let i = 0; i < 30; i++) {
            const angle = Math.random() * Math.PI * 2

            const grave = new THREE.Mesh(graveGeometry, graveMaterial)
            graves.add(grave)

            grave.position.x = Math.cos(angle) * (houseObject.wallWidth + 1.5) + (Math.random() - 0.5) * 3
            grave.position.y = 0.4 - Math.random() * 0.3
            grave.position.z = Math.sin(angle) * (houseObject.wallDepth + 1.5) + (Math.random() - 0.5) * 3

            grave.rotation.x = (Math.random() - 0.5) * 0.4
            grave.rotation.y = (Math.random() - 0.5) * 0.4
            grave.rotation.z = (Math.random() - 0.5) * 0.4

            grave.castShadow = true
            grave.receiveShadow = true

        }
        pole1.position.z = houseObject.wallDepth / 2
        pole2.position.z = houseObject.wallDepth / 2
        pole3.position.z = -houseObject.wallDepth / 2
        pole4.position.z = -houseObject.wallDepth / 2
        doorLight.position.z = houseObject.wallDepth / 2 + 0.05
    })

houseControls
    .add(houseObject, 'roofHeight')
    .name('Roof Height')
    .min(1)
    .max(3)
    .onChange(() => {
        roof.scale.y = houseObject.roofHeight / 1.5
    })

/* houseControls
    .add(houseObject, 'doorWidth')
    .name('Door Width')
    .min(1)
    .max(2.5)
    .onChange(() => {
        door.geometry.dispose()
        door.geometry = new THREE.PlaneGeometry(houseObject.doorWidth, houseObject.doorWidth)
        door.position.y = houseObject.doorWidth / 2 - 0.1
    }) */

houseControls
    .add(houseObject, 'bushSize')
    .name('Bush Size')
    .min(0.5)
    .max(1)
    .onChange(() => {
        bush1.scale.setScalar(0.5 * houseObject.bushSize)
        bush2.scale.setScalar(0.25 * houseObject.bushSize)
        bush3.scale.setScalar(0.4 * houseObject.bushSize)
        bush4.scale.setScalar(0.15 * houseObject.bushSize)
    })

/**
 * Ghosts
 */
const ghost1 = new THREE.PointLight('#8800ff', 6)
ghost1.position.set(-5, 0, 5)
const ghost2 = new THREE.PointLight('#ff0088', 6)
const ghost3 = new THREE.PointLight('#ff0000', 6)
scene.add(ghost1, ghost2, ghost3)

ghost1.shadow.mapSize.x = 256
ghost1.shadow.mapSize.y = 256
ghost1.shadow.camera.far = 10

ghost2.shadow.mapSize.x = 256
ghost2.shadow.mapSize.y = 256
ghost2.shadow.camera.far = 10

ghost3.shadow.mapSize.x = 256
ghost3.shadow.mapSize.y = 256
ghost3.shadow.camera.far = 10

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#86cdff', 0.275)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight('#86cdff', 1)
directionalLight.position.set(3, 2, -8)
scene.add(directionalLight)

directionalLight.shadow.camera.left = -9
directionalLight.shadow.camera.right = 9
directionalLight.shadow.camera.near = 1
directionalLight.shadow.camera.far = 25
directionalLight.shadow.mapSize.x = 256
directionalLight.shadow.mapSize.y = 256
// const directionalLightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
// scene.add(directionalLightCameraHelper)

// Door Light
const doorLight = new THREE.PointLight('#ff7d46', 5)
doorLight.position.y = houseObject.doorWidth - 0.05
doorLight.position.z = houseObject.wallDepth / 2 + 0.05
houseGroup.add(doorLight)

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
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.minDistance = 4
controls.maxDistance = 15
controls.maxPolarAngle = Math.PI * 0.49
//controls.enablePan = false
// var minPan = new THREE.Vector3(-20, 0, -20);
// var maxPan = new THREE.Vector3(20, 5, 20);
// var _v = new THREE.Vector3();

// controls.addEventListener("change", function() {
//     _v.copy(controls.target);
//     controls.target.clamp(minPan, maxPan);
//     _v.sub(controls.target);
//     camera.position.sub(_v);
// })

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Shadows
 */
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

// Cast and receive shadows
directionalLight.castShadow = true
ghost1.castShadow = true
ghost2.castShadow = true
ghost3.castShadow = true

walls.castShadow = true
walls.receiveShadow = true
pole1.castShadow = true
pole1.receiveShadow = true
pole2.castShadow = true
pole2.receiveShadow = true
pole3.castShadow = true
pole3.receiveShadow = true
pole4.castShadow = true
pole4.receiveShadow = true
roof.castShadow = true
floor.receiveShadow = true

for (const grave of graves.children) {
    grave.castShadow = true
    grave.receiveShadow = true
}

/**
 * Sky
 */
const sky = new Sky()
sky.scale.set(100, 100, 100)
scene.add(sky)

sky.material.uniforms['turbidity'].value = 10
sky.material.uniforms['rayleigh'].value = 3
sky.material.uniforms['mieCoefficient'].value = 0.1
sky.material.uniforms['mieDirectionalG'].value = 0.95
sky.material.uniforms['sunPosition'].value.set(0.3, -0.038, -0.95)

skyControls
    .add(sky.material.uniforms['turbidity'], 'value')
    .min(5)
    .max(20)
    .name('Turbidity')

skyControls
    .add(sky.material.uniforms['rayleigh'], 'value')
    .min(1)
    .max(10)
    .name('Rayleigh')

skyControls
    .add(sky.material.uniforms['mieCoefficient'], 'value')
    .min(0)
    .max(1)
    .name('Mie Coefficient')

skyControls
    .add(sky.material.uniforms['mieDirectionalG'], 'value')
    .min(0.5)
    .max(1.5)
    .name('Mie Directional G')

skyControls
    .add(sky.material.uniforms['sunPosition'].value, 'x')
    .min(-1)
    .max(1)
    .name('Position X')

skyControls
    .add(sky.material.uniforms['sunPosition'].value, 'y')
    .min(-1)
    .max(1)
    .name('Position Y')

skyControls
    .add(sky.material.uniforms['sunPosition'].value, 'z')
    .min(-1)
    .max(1)
    .name('Position Z')

/**
 * Fog
 */
// scene.fog = new THREE.Fog('#11343f',10,13)
scene.fog = new THREE.FogExp2('#11343f', 0.15)

/**
 * Animate
 */
const timer = new Timer()

const tick = () => {
    // Timer
    timer.update()
    const elapsedTime = timer.getElapsed()

    ghost1.position.x = Math.sin(elapsedTime * 0.5) * 4
    ghost1.position.y = Math.sin(elapsedTime * 0.5) * Math.sin(elapsedTime * 0.5 * 2.34) * Math.sin(elapsedTime * 0.5 * 3.45)
    ghost1.position.z = Math.cos(elapsedTime * 0.5) * 4

    ghost2.position.x = Math.sin(-elapsedTime * 0.4) * 5
    ghost2.position.y = Math.sin(elapsedTime * 0.5) * Math.sin(elapsedTime * 0.5 * 3.34) * Math.sin(elapsedTime * 0.5 * 3.45)
    ghost2.position.z = Math.cos(-elapsedTime * 0.4) * 5

    ghost3.position.x = Math.sin(-elapsedTime) * 6
    ghost3.position.y = Math.sin(elapsedTime * 0.5) * Math.sin(elapsedTime * 0.5 * 4.34) * Math.sin(elapsedTime * 0.5 * 3.45)
    ghost3.position.z = Math.cos(-elapsedTime) * 6

    doorLight.intensity = Math.random() > 0.95 ? 5 : Math.max(0, Math.sin(elapsedTime * 5))

    // Update controls
    //console.log(camera.position.distanceTo(new THREE.Vector3(0,0,0)))
    controls.update()


    // Render
    renderer.render(scene, camera)

    //console.log(controls.getDistance())

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()