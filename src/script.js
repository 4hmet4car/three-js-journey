import Experience from './Experience/Experience.js'

const experience = new Experience(document.querySelector('canvas.webgl'))

// let geometry = null
// let material = null
// let points = null

// const generateGalaxy = () =>
// {
//     if(points !== null)
//     {
//         geometry.dispose()
//         material.dispose()
//         scene.remove(points)
//     }

//     /**
//      * Geometry
//      */
//     geometry = new THREE.BufferGeometry()

//     const positions = new Float32Array(parameters.count * 3)
//     const colors = new Float32Array(parameters.count * 3)

//     const insideColor = new THREE.Color(parameters.insideColor)
//     const outsideColor = new THREE.Color(parameters.outsideColor)

//     for(let i = 0; i < parameters.count; i++)
//     {
//         const i3 = i * 3

//         // Position
//         const radius = Math.random() * parameters.radius

//         const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2

//         const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * parameters.randomness * radius
//         const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * parameters.randomness * radius
//         const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * parameters.randomness * radius

//         positions[i3    ] = Math.cos(branchAngle) * radius + randomX
//         positions[i3 + 1] = randomY
//         positions[i3 + 2] = Math.sin(branchAngle) * radius + randomZ

//         // Color
//         const mixedColor = insideColor.clone()
//         mixedColor.lerp(outsideColor, radius / parameters.radius)

//         colors[i3    ] = mixedColor.r
//         colors[i3 + 1] = mixedColor.g
//         colors[i3 + 2] = mixedColor.b
//     }

//     geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
//     geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

//     /**
//      * Material
//      */
//     material = new THREE.PointsMaterial({
//         size: parameters.size,
//         sizeAttenuation: true,
//         depthWrite: false,
//         blending: THREE.AdditiveBlending,
//         vertexColors: true
//     })

//     /**
//      * Points
//      */
//     points = new THREE.Points(geometry, material)
//     scene.add(points)
// }

// generateGalaxy()

// gui.add(parameters, 'count').min(100).max(1000000).step(100).onFinishChange(generateGalaxy)
// gui.add(parameters, 'radius').min(0.01).max(20).step(0.01).onFinishChange(generateGalaxy)
// gui.add(parameters, 'branches').min(2).max(20).step(1).onFinishChange(generateGalaxy)
// gui.add(parameters, 'randomness').min(0).max(2).step(0.001).onFinishChange(generateGalaxy)
// gui.add(parameters, 'randomnessPower').min(1).max(10).step(0.001).onFinishChange(generateGalaxy)
// gui.addColor(parameters, 'insideColor').onFinishChange(generateGalaxy)
// gui.addColor(parameters, 'outsideColor').onFinishChange(generateGalaxy)
