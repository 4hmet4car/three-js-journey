import * as THREE from 'three'
import GUI from 'lil-gui'
import gsap from 'gsap'

/**
 * Textures
 */
// Loading Manager
const loadingManager = new THREE.LoadingManager();
loadingManager.onStart = function ( url, itemsLoaded, itemsTotal ) {
    console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
};

loadingManager.onLoad = function ( ) {
    console.log( 'Loading complete!');
};

loadingManager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
    console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
};

loadingManager.onError = function ( url ) {
    console.log( 'There was an error loading ' + url );
};


const textureLoader = new THREE.TextureLoader(loadingManager)

const gradientTextures = {}
gradientTextures[0] = textureLoader.load('./textures/gradients/' + 3 + '.jpg' )
gradientTextures[1] = textureLoader.load('./textures/gradients/' + 5 + '.jpg' )

for (let texture in gradientTextures) {
  gradientTextures[texture].generateMipmaps = false
  gradientTextures[texture].minFilter = THREE.NearestFilter
  gradientTextures[texture].magFilter = THREE.NearestFilter
}

const particleTextures = {}
for(let i = 1; i < 14; i++)
{
    particleTextures[i-1] = textureLoader.load('./textures/particles/' + i + '.png' )
}

/**
 * Debug
 */
const gui = new GUI()
gui.close()

const parameters = {
    materialColor: '#ffeded',
    lightColor: '#ffffff',
    lightIntensity: 3,
    gradient: gradientTextures[0],
    speed: 0.1,
    particleCount: 200,
    particleSize: 0.2,
    texture: null,
}

gui
    .addColor(parameters, 'materialColor')
    .onChange(()=>
    {
        toonMaterial.color.set(parameters.materialColor)
        particleMaterial.color.set(parameters.materialColor)
    })

gui
    .addColor(parameters, 'lightColor')
    .onChange(()=>
    {
        directionalLight.color.set(parameters.lightColor)
    })

gui
    .add(parameters, 'lightIntensity')
    .min(1)
    .max(5)
    .step(1)
    .onChange(()=>
    {
        directionalLight.intensity = parameters.lightIntensity
    })

gui
    .add(parameters,'gradient',
    {
        1: gradientTextures[0],
        2: gradientTextures[1]
    })
    .onChange(()=>
    {
        toonMaterial.gradientMap.dispose()
        toonMaterial.gradientMap = parameters.gradient
    })

gui
    .add(parameters, 'speed')
    .min(0.1)
    .max(1)
    .step(0.000001)

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */

// Materials
const toonMaterial = new THREE.MeshToonMaterial({
    color: parameters.materialColor,
    gradientMap: parameters.gradient,
})

// Meshes
const objectDistance = 9.453

const geometries = {}
geometries[0] = new THREE.TorusGeometry(1,0.4,16,60)
geometries[1] = new THREE.ConeGeometry(1, 2, 32)
geometries[2] = new THREE.TorusKnotGeometry(0.8,0.35,100,16)

// // Randomly selects the geometries
// // This is an unneccessarily comlicated way of doing it
// // Not optimal really

// const selectedGeometries = []
// let candidateInt = 0

// const geometrySelector = () =>
// {
//     candidateInt = Math.floor(Math.random() * 3)
//     if(selectedGeometries.indexOf(candidateInt) === -1)
//     {
//         selectedGeometries.push(candidateInt)
//         return candidateInt
//     }
//     else
//     {
//         geometrySelector()
//     }
// }

// geometrySelector()
// geometrySelector()
// geometrySelector()


// Randomly selects the geometries
const selectedGeometries = []
let candidateInt = 0

const geometrySelector = () =>
{
    while(selectedGeometries.length < 3)
    {
        candidateInt = Math.floor(Math.random() * 3)
        if(selectedGeometries.indexOf(candidateInt) === -1)
        {
            selectedGeometries.push(candidateInt)
        }
    }
    return selectedGeometries
}

geometrySelector()

const mesh1 = new THREE.Mesh(
    geometries[selectedGeometries[0]],
    toonMaterial
)

const mesh2 = new THREE.Mesh(
    geometries[selectedGeometries[1]],
    toonMaterial
)

const mesh3 = new THREE.Mesh(
    geometries[selectedGeometries[2]],
    toonMaterial
)

mesh1.position.y = - objectDistance * 0
mesh2.position.y = - objectDistance * 1
mesh3.position.y = - objectDistance * 2

mesh1.position.x = 2
mesh2.position.x = - 2
mesh3.position.x = 2

scene.add(mesh1, mesh2, mesh3)

const sectionMeshes = [mesh1,mesh2,mesh3]

/**
 * Particles
 */
let particleGeometry = null
let particleMaterial = null
let particles = null

const generateParticles = ()=>
{
    if(particleGeometry){
        particleGeometry.dispose()
        particleMaterial.dispose()
        scene.remove(particles)
    }
    
    particleGeometry = new THREE.BufferGeometry()
    const particlePositions = new Float32Array(parameters.particleCount*3) 
    for(let i=0; i<parameters.particleCount; i++)
    {
        particlePositions[i * 3 + 0] = (Math.random() - 0.5) * 10
        particlePositions[i * 3 + 1] = objectDistance * 0.5 - Math.random() * sectionMeshes.length * objectDistance
        particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions,3))
    particleMaterial = new THREE.PointsMaterial({
        size: parameters.particleSize,
        sizeAttenuation: true,
        color: parameters.materialColor,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        alphaMap: parameters.texture,
    })
    particles = new THREE.Points(particleGeometry, particleMaterial)
    scene.add(particles)
}

generateParticles()

gui
    .add(parameters,'particleCount')
    .min(100)
    .max(1000)
    .step(1)
    .onChange(generateParticles)

gui
    .add(parameters,'particleSize')
    .min(0.05)
    .max(0.5)
    .step(0.05)
    .onChange(generateParticles)

gui
    .add(parameters,'texture',
        {
            1: particleTextures[0],
            2: particleTextures[1],
            3: particleTextures[2],
            4: particleTextures[3],
            5: particleTextures[4],
            6: particleTextures[5],
            7: particleTextures[6],
            8: particleTextures[7],
            9: particleTextures[8],
            10: particleTextures[9],
            11: particleTextures[10],
            12: particleTextures[11],
            13: particleTextures[12],
            14: null
        })
    .name('Particle Texture')
    .onChange(generateParticles)

// Light
const directionalLight = new THREE.DirectionalLight(parameters.lightColor,parameters.lightIntensity)
directionalLight.position.set(1,1,0)
scene.add(directionalLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const defaultFOV = 35

window.addEventListener('resize', () =>
{
    
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    
    if (camera.aspect < 1) {
        camera.fov = defaultFOV / camera.aspect 
    } else {
        camera.fov = defaultFOV
    }

    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
const cameraGroup = new THREE.Group()
scene.add(cameraGroup)

// Base camera
const initialAspect = sizes.width / sizes.height
const initialFOV = initialAspect < 1 ? defaultFOV/initialAspect : defaultFOV
const camera = new THREE.PerspectiveCamera(initialFOV, initialAspect, 0.1, 100)
camera.position.z = 6
cameraGroup.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
let scrollY = window.scrollY
let currentSection = 0
const section1 = 'my projects'
const section2 = 'contact me'
const section1Step = 1/section1.length
const section2Step = 1/section2.length
let textIndex = [0,0]

window.addEventListener('scroll', ()=>
{
    scrollY = window.scrollY
    const newSection = Math.round(scrollY / sizes.height)
    
    if(newSection != currentSection)
    {
        currentSection = newSection

        if(currentSection)
        {
            textIndex[currentSection-1] = 0
        }

        gsap.to(
            sectionMeshes[newSection].rotation,
            {
                duration: 1,
                ease: 'power2.inOut',
                x: '+=6',
                y: '+=3',
                y: '+=1.5',
            }
        )
        // console.log(toonMaterial.color)

        gsap.to(
            [toonMaterial.color,particleMaterial.color],
            {
                duration: 1,
                r: Math.random(),
                g: Math.random(),
                b: Math.random(),
            }
        )
    }

    if(currentSection)
    {
        if(currentSection == 1)
        {
            textIndex[currentSection-1] = Math.floor((scrollY / sizes.height - 0.5) / (section1Step / 2))
            document.getElementById(currentSection).innerHTML = section1.slice(0,textIndex[currentSection-1])
        }
        if(currentSection == 2)
        {
            textIndex[currentSection-1] = Math.floor((scrollY / sizes.height - 1.5) / (section2Step / 2))
            document.getElementById(currentSection).innerHTML = section2.slice(0,textIndex[currentSection-1])
        }
    }
})

let cursorPosition = {}
cursorPosition.x = 0
cursorPosition.y = 0

window.addEventListener('mousemove', (event)=>
{
    cursorPosition.x = event.clientX / sizes.width - 0.5
    cursorPosition.y = event.clientY / sizes.height - 0.5
})

/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    // Animate camera
    camera.position.y = - scrollY / sizes.height * objectDistance

    const parallaxX = cursorPosition.x * 0.5
    const parallaxY = - cursorPosition.y * 0.5
    cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * 5 * deltaTime
    cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * 5 * deltaTime
    
    // Animate meshes
    for(let mesh of sectionMeshes)
    {
        mesh.rotation.x += deltaTime * parameters.speed
        mesh.rotation.y += deltaTime * parameters.speed * 1.2
    }

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()