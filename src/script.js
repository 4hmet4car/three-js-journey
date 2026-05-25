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
//             child.material.envMapIntensity = 1
//             child.material.needsUpdate = true
//             child.castShadow = true
//             child.receiveShadow = true
//         }
//     })
// }

// /**
//  * Environment map
//  */

// scene.background = environmentMap
// scene.environment = environmentMap

// /**
//  * Material
//  */

// // Textures
// const mapTexture = textureLoader.load('/models/LeePerrySmith/color.jpg')
// mapTexture.colorSpace = THREE.SRGBColorSpace
// const normalTexture = textureLoader.load('/models/LeePerrySmith/normal.jpg')

// // Material
// const material = new THREE.MeshStandardMaterial( {
//     map: mapTexture,
//     normalMap: normalTexture
// })

// /**
//  * Models
//  */
// gltfLoader.load(
//     '/models/LeePerrySmith/LeePerrySmith.glb',
//     (gltf) =>
//     {
//         // Model
//         const mesh = gltf.scene.children[0]
//         mesh.rotation.y = Math.PI * 0.5
//         mesh.material = material
//         scene.add(mesh)

//         // Update materials
//         updateAllMaterials()
//     }
// )

// /**
//  * Lights
//  */
// const directionalLight = new THREE.DirectionalLight('#ffffff', 3)
// directionalLight.castShadow = true
// directionalLight.shadow.mapSize.set(1024, 1024)
// directionalLight.shadow.camera.far = 15
// directionalLight.shadow.normalBias = 0.05
// directionalLight.position.set(0.25, 2, - 2.25)
// scene.add(directionalLight)
