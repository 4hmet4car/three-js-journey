import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */

// const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
// const mesh = new THREE.Mesh(geometry, material)
// scene.add(mesh)

// // Position
// mesh.position.x = 0.7
// mesh.position.y = -0.6
// mesh.position.z = 1
// // mesh.position.set(0.7,-0.6,1)

// // Scale
// mesh.scale.x = 2
// mesh.scale.y = 0.5
// mesh.scale.z = 0.5
// // mesh.scale.set(2,0.5,0.5)

// // Rotation
// // mesh.rotation.reorder('YXZ')
// mesh.rotation.x = Math.PI * 0.25
// mesh.rotation.y = Math.PI * 0.25

const car = new THREE.Group()
scene.add(car)

const bodyBottom = new THREE.Mesh(
    new THREE.BoxGeometry(1,0.25,0.5),
    new THREE.MeshBasicMaterial({color:0xff0000})
)

const bodyTop = new THREE.Mesh(
    new THREE.BoxGeometry(0.4,0.25,0.5),
    new THREE.MeshBasicMaterial({color:0x00ff00})
)

bodyBottom.position.y = 0.25/2
bodyTop.position.y = bodyBottom.position.y + 0.25

car.add(bodyBottom,bodyTop)

const wheelGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.1, 8)
const wheelMaterial = new THREE.MeshBasicMaterial({color:0x00ff00})

const wheels= []
var wheel = 0

for(var i=0; i<2; i++){
    for(var j=0; j<2; j++){
        wheels[wheel] = new THREE.Mesh(wheelGeometry,wheelMaterial)
        wheels[wheel].position.z = 0.25 - i%2 * 0.5
        wheels[wheel].position.x = 0.25 - j%2 * 0.5
        wheels[wheel].rotation.x = Math.PI * 0.5
        car.add(wheels[wheel])
        wheel+=1
    }
}

// Axes Helper
const axesHelper = new THREE.AxesHelper(  )
scene.add( axesHelper )

/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.x = 0.5
camera.position.y = 0.5
camera.position.z = 2
scene.add(camera)

camera.lookAt(car.position)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)