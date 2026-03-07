import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

/**
 * Base
 */

// Canvas
const canvas = document.querySelector('canvas.webgl')

/**
 * Loading Manager
 */
const loadingManager = new THREE.LoadingManager()
loadingManager.onStart = function ( url, itemsLoaded, itemsTotal ) {
    console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' )
}

loadingManager.onLoad = function ( ) {
    console.log( 'Loading complete!')
}

loadingManager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
    console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' )
} 

loadingManager.onError = function ( url ) {
    console.log( 'There was an error loading ' + url )
}

// Scene
const scene = new THREE.Scene()

// // Axes Helper
// const axesHelper = new THREE.AxesHelper()
// scene.add(axesHelper)

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader(loadingManager)

function loadTexture( path ) {
    const texture = textureLoader.load( path )
    texture.colorSpace = THREE.SRGBColorSpace
    texture.generateMipmaps=false
    texture.minFilter=THREE.NearestFilter
    texture.magFilter=THREE.NearestFilter
    return texture
}

/**
 * Object
 */
const self = new THREE.Group()

const headGeometry = new THREE.BoxGeometry(0.8, 0.8, 0.8)

const materials = [
  new THREE.MeshBasicMaterial({map: loadTexture('/textures/face/side1.png')}),
  new THREE.MeshBasicMaterial({map: loadTexture('/textures/face/side1.png')}),
  new THREE.MeshBasicMaterial({map: loadTexture('/textures/face/top1.png')}),
  new THREE.MeshBasicMaterial({color: '#ff0256'}),
  new THREE.MeshBasicMaterial({map: loadTexture('/textures/face/front1.png')}),
  new THREE.MeshBasicMaterial({map: loadTexture('/textures/face/back1.png')}),
]

materials[0].map.wrapS = THREE.RepeatWrapping
materials[0].map.repeat.x = -1

const head = new THREE.Mesh(
    headGeometry,
    materials
)
head.position.y = 2.8

const bodyBuilder = (count=3,x=1,y=1,z=1,color='#ff0256')=>{
    const bodyPositionsArray = new Float32Array(count * 3 * 3)
    const bodyPositionsAttribute = new THREE.BufferAttribute(bodyPositionsArray,3)
    const bodyGeometry = new THREE.BufferGeometry()
    for(var i=0;i<count*3*3;i=i+3){
        bodyPositionsArray[i]=(Math.random()-0.5)*x
        bodyPositionsArray[i+1]=(Math.random()-0.5)*y
        bodyPositionsArray[i+2]=(Math.random()-0.5)*z
    }
    bodyGeometry.setAttribute('position',bodyPositionsAttribute)
    const bodyMaterial = new THREE.MeshBasicMaterial({color: color ,wireframe:true})
    return {mesh:new THREE.Mesh(bodyGeometry, bodyMaterial),x:x,y:y,z:z}
}

const scribble = (bodyPart)=>{
    let bodyPositionsAttribute = bodyPart.mesh.geometry.getAttribute('position')
    for(var i=0;i<bodyPositionsAttribute.count*3;i=i+3){
        bodyPositionsAttribute.array[i]=(Math.random()-0.5)*bodyPart.x
        bodyPositionsAttribute.array[i+1]=(Math.random()-0.5)*bodyPart.y
        bodyPositionsAttribute.array[i+2]=(Math.random()-0.5)*bodyPart.z
    }
    bodyPart.mesh.geometry.setAttribute('position',bodyPositionsAttribute)
    bodyPart.mesh.geometry.dispose()
}

const body = bodyBuilder(333,0.8,1.2,0.4)
body.mesh.position.y = 1.8

// scribble(body)

const leg1 = bodyBuilder(166,0.4, 1, 0.4,'black')
leg1.mesh.position.x = -0.2
leg1.mesh.position.y = 0.7

// scribble(leg1)

const leg2 = bodyBuilder(166,0.4, 1, 0.4,'black')
leg2.mesh.position.x = 0.2
leg2.mesh.position.y = 0.7

const foot1 = bodyBuilder(66,0.4, 0.2, 0.6,'#000000')
foot1.mesh.position.x = -0.2
foot1.mesh.position.y = 0.1
foot1.mesh.position.z = 0.1

const foot2 = bodyBuilder(66,0.4, 0.2, 0.6,'#000000')
foot2.mesh.position.x = 0.2
foot2.mesh.position.y = 0.1
foot2.mesh.position.z = 0.1

const arm1 = bodyBuilder(166,0.4, 1, 0.4)
arm1.mesh.position.x = -0.6
arm1.mesh.position.y = 1.9

const arm2 = bodyBuilder(166,0.4, 1, 0.4)
arm2.mesh.position.x = 0.6
arm2.mesh.position.y = 1.9

const hand1 = bodyBuilder(48,0.4, 0.2, 0.4,'#f2c3a4')
hand1.mesh.position.x = -0.6
hand1.mesh.position.y = 1.3

const hand2 = bodyBuilder(48,0.4, 0.2, 0.4,'#f2c3a4')
hand2.mesh.position.x = 0.6
hand2.mesh.position.y = 1.3

self.add(head,body.mesh,leg1.mesh,leg2.mesh,foot1.mesh,foot2.mesh,arm1.mesh,arm2.mesh,hand1.mesh,hand2.mesh)
self.position.y = -1.6

scene.add(self)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const zoom = 3

let aspect = (sizes.width / sizes.height) * zoom

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    aspect = (sizes.width / sizes.height) * zoom

    // Update camera
    // camera.aspect = sizes.width / sizes.height
    camera.left = -aspect
    camera.right = aspect
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.OrthographicCamera( -aspect, aspect, zoom, -zoom, 0.1, 100)
const clipMultiplier = 2 // In order to avoid near clipping
camera.position.x = 0.25*clipMultiplier
camera.position.y = 0.25*clipMultiplier
camera.position.z = 1*clipMultiplier
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
renderer.setClearColor('purple')

/**
 * Animate
 */
const clock = new THREE.Clock()

let counter = 0

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    if(!(counter%6)){
        scribble(body)
        scribble(leg1)
        scribble(leg2)
        scribble(arm1)
        scribble(arm2)
        scribble(hand1)
        scribble(hand2)
        scribble(foot1)
        scribble(foot2)
    }

    // scribble(leg1)

    counter += 1

    // // Add text
    // if(texts.length && addedTexts){
    //     scene.add(texts[0])
    //     addedTexts-=1
    // }

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()