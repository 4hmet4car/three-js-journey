export const cameraParameters = {
    enablePan: true,
    enableZoom: true,
    enableRotate: true,
    enableDamping: true,
}

export const rendererParameters = {
    clearColor: '#29191f',
}

export const terrainParameters = {
    customShaderMaterial: {
        uniforms: {
            uTranslationSpeed: 0.1,
            
            uPositionFrequency: 0.2,
            uDetailAmount: 7,
            uStrength: 1.8,
            uWarpFrequency: 5.0,
            uWarpStrength: 0,

            uColorWaterDeep: '#002b3d',
            uColorWaterSurface: '#66a8ff',
            uColorSand: '#ffe894',
            uColorGrass: '#85d534',
            uColorSnow: '#ffffff',
            uColorRock: '#bfbd8d',
        },
    },
}

// export const particlesParameters = {
//     particleSize: 0.07,
// }

// export const GPGPUParameters = {
//     debugPlane: false,
//     flowFieldInfluence: 0.5,
//     flowFieldStrength: 2,
//     flowFieldFrequency: 0.5,
// }

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