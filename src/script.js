import Experience from './Experience/Experience.js'

const experience = new Experience(document.querySelector('canvas.webgl'))

// /**
//  * Update all materials
//  */
// const updateAllMaterials = () =>
// {
//     scene.traverse((child) =>
//     {
//         if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
//         {
//             // child.material.envMap = environmentMap
//             child.material.envMapIntensity = 2.5
//             child.material.needsUpdate = true
//             child.castShadow = true
//             child.receiveShadow = true
//         }
//     })
// }

// /**
//  * Models
//  */
// gltfLoader.load(
//     '/models/FlightHelmet/glTF/FlightHelmet.gltf',
//     (gltf) =>
//     {
//         gltf.scene.scale.set(10, 10, 10)
//         gltf.scene.position.set(0, - 4, 0)
//         gltf.scene.rotation.y = Math.PI * 0.5
//         scene.add(gltf.scene)

//         updateAllMaterials()
//     }
// )