import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

/**
 * Base
 */
// Debug
// const gui = new GUI()

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
const matcapTexture = textureLoader.load('/textures/matcaps/7.png')
matcapTexture.colorSpace = THREE.SRGBColorSpace

/**
 * Text Objects
 */
// Font Loader
const fontLoader = new FontLoader(loadingManager)

// const textGeometries = {}
// const textMeshes = {}

// const textMaterial = new THREE.MeshMatcapMaterial()
// textMaterial.matcap = matcapTexture

// const textGenerator = (input,x=0,y=0,z=0,rx=-Math.PI*0.5,ry=0,rz=0)=>{
//     fontLoader.load('/fonts/OpenFont_Regular.json', (font)=>{
//     textGeometries.input = new TextGeometry(input,
//             {
//                 font: font,
//                 size: 0.2,
//                 depth: 0.1,
//                 curveSegments: 1,
//                 // bevelEnabled: true,
//                 // bevelThickness: 0.03,
//                 // bevelSize: 0.02,
//                 // bevelOffset: 0,
//                 // bevelSegments: 5
//             }
//         )
//         // textGeometry.computeBoundingBox()
//         // console.log(textGeometry.boundingBox)
//         // textGeometry.translate(
//         //     0,
//         //     -textGeometry.boundingBox.min.y,
//         //     0
//         // )
//         textGeometries.input.center()
        
//         // textMaterial.wireframe=true
//         const text = new THREE.Mesh(textGeometries.input,textMaterial)
//         text.rotation.set(rx,ry,rz)
//         text.position.set(x,y,z)
//         textMeshes.input=text
//         // texts[input]=text
//         scene.add(textMeshes.input)
//         // console.log(texts)
//     })
// }

// textGenerator(`who
// are
// you`)

// textGenerator(`WHO
// ARE
// YOU`)

// for(let i=0;i<5;i++){
//     let x = (Math.random()-0.5)*2
//     let y = (Math.random()-0.5)*2
//     let z = (Math.random()-0.5)*2
//     let rx = 0//Math.PI * 0.5 * i
//     let ry = 0//Math.PI * 0.5 * i
//     let rz = 0//Math.PI * 0.5 * i
//     if(!(-0.55<x && x<0.55) || !(-0.2<y && y<0.2) || !(-0.55<z && z<0.55)){
//         textGenerator('?',x,y,z,rx,ry,rz)
//     }
// }

fontLoader.load('/fonts/OpenFont_Regular.json', (font)=>{
    const textGeometry = new TextGeometry(
        `who
are
you?`,
        {
            font: font,
            size: 0.2,
            depth: 0.1,
            curveSegments: 1,
            // bevelEnabled: true,
            // bevelThickness: 0.03,
            // bevelSize: 0.02,
            // bevelOffset: 0,
            // bevelSegments: 5
        }
    )
    textGeometry.computeBoundingBox()
    console.log(textGeometry.boundingBox)
    // textGeometry.translate(
    //     0,
    //     -textGeometry.boundingBox.min.y,
    //     0
    // )
    textGeometry.center()
    
    const textMaterial = new THREE.MeshMatcapMaterial()
    textMaterial.matcap = matcapTexture
    // textMaterial.wireframe=true
    const text = new THREE.Mesh(textGeometry,textMaterial)
    text.rotation.x = -Math.PI * 0.5
    scene.add(text)
})

/**
 * Object
 */
// const cube = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial()
// )

// scene.add(cube)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const zoom = 2

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
camera.position.x = 1
camera.position.y = 2
camera.position.z = 1
camera.zoom = 1
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
renderer.setClearColor('BLACK')

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

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