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
    particleSize: 0.05,
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
const objectDistance = 4

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

// Source - https://stackoverflow.com/a/64836824
// Posted by macie.k, modified by community. See post 'Timeline' for change history
// Retrieved 2026-04-26, License - CC BY-SA 4.0

const visibleHeight = window.innerHeight;
const fullHeight = document.querySelector('#control-height').clientHeight;

const barHeight = fullHeight - visibleHeight;

// document.getElementById("bar").innerHTML = barHeight

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight + barHeight
}

const defaultFOV = 35

const resizer = () =>
{
    // console.log('resize')
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
}

// Source - https://stackoverflow.com/a/11381730
// Posted by Michael Zaporozhets, modified by community. See post 'Timeline' for change history
// Retrieved 2026-04-26, License - CC BY-SA 4.0

window.mobileCheck = function() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

if (!window.mobileCheck) {
    window.addEventListener('resize', resizer)
}

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
            textIndex[currentSection-1] = Math.floor((scrollY / (sizes.height-barHeight) - 0.5) / (section1Step / 2))
            document.getElementById(currentSection).innerHTML = section1.slice(0,textIndex[currentSection-1])
        }
        if(currentSection == 2)
        {
            textIndex[currentSection-1] = Math.floor((scrollY / (sizes.height-barHeight) - 1.5) / (section2Step / 2))
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