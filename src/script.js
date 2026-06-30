import Experience from './Experience/Experience.js'

const experience = new Experience(document.querySelector('canvas.webgl'))


// gui
//     .addColor(materialParameters, 'color')
//     .onChange(() =>
//     {
//         material.uniforms.uColor.value.set(materialParameters.color)
//     })

// /**
//  * Objects
//  */
// // Torus knot
// const torusKnot = new THREE.Mesh(
//     new THREE.TorusKnotGeometry(0.6, 0.25, 128, 32),
//     material
// )
// torusKnot.position.x = 3
// scene.add(torusKnot)

// // Sphere
// const sphere = new THREE.Mesh(
//     new THREE.SphereGeometry(),
//     material
// )
// sphere.position.x = - 3
// scene.add(sphere)

// // Suzanne
// let suzanne = null
// gltfLoader.load(
//     './suzanne.glb',
//     (gltf) =>
//     {
//         suzanne = gltf.scene
//         suzanne.traverse((child) =>
//         {
//             if(child.isMesh)
//                 child.material = material
//         })
//         scene.add(suzanne)
//     }
// )



// const tick = () =>
// {


//     // Rotate objects
//     if(suzanne)
//     {
//         suzanne.rotation.x = - elapsedTime * 0.1
//         suzanne.rotation.y = elapsedTime * 0.2
//     }

//     sphere.rotation.x = - elapsedTime * 0.1
//     sphere.rotation.y = elapsedTime * 0.2

//     torusKnot.rotation.x = - elapsedTime * 0.1
//     torusKnot.rotation.y = elapsedTime * 0.2

// }
