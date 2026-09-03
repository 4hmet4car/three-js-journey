import * as THREE from 'three/webgpu'

export const cameraParameters = {
    enablePan: true,
    enableZoom: true,
    enableRotate: true,
    enableDamping: true,
}

export const rendererParameters = {
    clearColor: '#111111',
}

export const particlesParameters = {
    pictureTexture: 1,
}

// export const sunParameters = {
//     phi: 1.43,
//     theta: -2.8,
// }

// export const earthParameters = {
//     minutesPerDay: 24 * 60,
// }

// export const atmosphereParameters = {
//     atmosphereDayColor: '#00aaff',
//     atmosphereTwilightColor: '#ff6600',
// }