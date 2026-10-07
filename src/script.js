import Experience from './Experience/Experience.js'

const experience = new Experience(document.querySelector('canvas.webgl'))

// /**
//  * Test meshes
//  */








// const tick = () =>
// {

//     // Update test mesh
//     torusKnot.rotation.y = elapsedTime * 0.1

// }


// /**
//  * Tips
//  */

// // // Tip 4
// // console.log(renderer.info)

// // // Tip 6
// // scene.remove(cube)
// // cube.geometry.dispose()
// // cube.material.dispose()

// // // Tip 10
// // directionalLight.shadow.camera.top = 3
// // directionalLight.shadow.camera.right = 6
// // directionalLight.shadow.camera.left = - 6
// // directionalLight.shadow.camera.bottom = - 3
// // directionalLight.shadow.camera.far = 10
// // directionalLight.shadow.mapSize.set(1024, 1024)

// // const cameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
// // scene.add(cameraHelper)

// // // Tip 11
// // cube.castShadow = true
// // cube.receiveShadow = false

// // torusKnot.castShadow = true
// // torusKnot.receiveShadow = false

// // sphere.castShadow = true
// // sphere.receiveShadow = false

// // floor.castShadow = false
// // floor.receiveShadow = true

// // // Tip 12
// // renderer.shadowMap.autoUpdate = false
// // renderer.shadowMap.needsUpdate = true

// // // Tip 18
// // for(let i = 0; i < 50; i++)
// // {
// //     const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)

// //     const material = new THREE.MeshNormalMaterial()
    
// //     const mesh = new THREE.Mesh(geometry, material)
// //     mesh.position.x = (Math.random() - 0.5) * 10
// //     mesh.position.y = (Math.random() - 0.5) * 10
// //     mesh.position.z = (Math.random() - 0.5) * 10
// //     mesh.rotation.x = (Math.random() - 0.5) * Math.PI * 2
// //     mesh.rotation.y = (Math.random() - 0.5) * Math.PI * 2

// //     scene.add(mesh)
// // }

// // // Tip 19
// // for(let i = 0; i < 50; i++)
// // {
// //     const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)

// //     const material = new THREE.MeshNormalMaterial()
    
// //     const mesh = new THREE.Mesh(geometry, material)
// //     mesh.position.x = (Math.random() - 0.5) * 10
// //     mesh.position.y = (Math.random() - 0.5) * 10
// //     mesh.position.z = (Math.random() - 0.5) * 10
// //     mesh.rotation.x = (Math.random() - 0.5) * Math.PI * 2
// //     mesh.rotation.y = (Math.random() - 0.5) * Math.PI * 2

// //     scene.add(mesh)
// // }

// // // Tip 20
// // const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
    
// // for(let i = 0; i < 50; i++)
// // {
// //     const material = new THREE.MeshNormalMaterial()

// //     const mesh = new THREE.Mesh(geometry, material)
// //     mesh.position.x = (Math.random() - 0.5) * 10
// //     mesh.position.y = (Math.random() - 0.5) * 10
// //     mesh.position.z = (Math.random() - 0.5) * 10
// //     mesh.rotation.x = (Math.random() - 0.5) * Math.PI * 2
// //     mesh.rotation.y = (Math.random() - 0.5) * Math.PI * 2

// //     scene.add(mesh)
// // }

// // // Tip 22
// // const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)

// // const material = new THREE.MeshNormalMaterial()
    
// // for(let i = 0; i < 50; i++)
// // {
// //     const mesh = new THREE.Mesh(geometry, material)
// //     mesh.position.x = (Math.random() - 0.5) * 10
// //     mesh.position.y = (Math.random() - 0.5) * 10
// //     mesh.position.z = (Math.random() - 0.5) * 10
// //     mesh.rotation.x = (Math.random() - 0.5) * Math.PI * 2
// //     mesh.rotation.y = (Math.random() - 0.5) * Math.PI * 2

// //     scene.add(mesh)
// // }

// // // Tip 29
// // renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// // // Tip 31, 32, 34 and 35
// // const shaderGeometry = new THREE.PlaneGeometry(10, 10, 256, 256)

// // const shaderMaterial = new THREE.ShaderMaterial({
// //     uniforms:
// //     {
// //         uDisplacementTexture: { value: displacementTexture },
// //         uDisplacementStrength: { value: 1.5 }
// //     },
// //     vertexShader: `
// //         uniform sampler2D uDisplacementTexture;
// //         uniform float uDisplacementStrength;

// //         varying vec2 vUv;

// //         void main()
// //         {
// //             vec4 modelPosition = modelMatrix * vec4(position, 1.0);

// //             float elevation = texture2D(uDisplacementTexture, uv).r;
// //             if(elevation < 0.5)
// //             {
// //                 elevation = 0.5;
// //             }

// //             modelPosition.y += elevation * uDisplacementStrength;

// //             gl_Position = projectionMatrix * viewMatrix * modelPosition;

// //             vUv = uv;
// //         }
// //     `,
// //     fragmentShader: `
// //         uniform sampler2D uDisplacementTexture;

// //         varying vec2 vUv;

// //         void main()
// //         {
// //             float elevation = texture2D(uDisplacementTexture, vUv).r;
// //             if(elevation < 0.25)
// //             {
// //                 elevation = 0.25;
// //             }

// //             vec3 depthColor = vec3(1.0, 0.1, 0.1);
// //             vec3 surfaceColor = vec3(0.1, 0.0, 0.5);
// //             vec3 finalColor = vec3(0.0);
// //             finalColor.r += depthColor.r + (surfaceColor.r - depthColor.r) * elevation;
// //             finalColor.g += depthColor.g + (surfaceColor.g - depthColor.g) * elevation;
// //             finalColor.b += depthColor.b + (surfaceColor.b - depthColor.b) * elevation;

// //             gl_FragColor = vec4(finalColor, 1.0);
// //         }
// //     `
// // })

// // const shaderMesh = new THREE.Mesh(shaderGeometry, shaderMaterial)
// // shaderMesh.rotation.x = - Math.PI * 0.5
// // scene.add(shaderMesh)