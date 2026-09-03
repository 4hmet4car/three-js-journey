import Experience from './Experience/Experience.js'

const experience = new Experience(document.querySelector('canvas.webgl'))

// /**
//  * Animate
//  */
// const timer = new THREE.Timer()
// timer.connect(document)

// const tick = () =>
// {
//     timer.update()

//     // Render
//     renderer.render(scene, camera)

//     // Call tick again on the next frame
//     window.requestAnimationFrame(tick)
// }

// tick()