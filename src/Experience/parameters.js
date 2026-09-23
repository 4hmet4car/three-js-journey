export const cameraParameters = {
    enablePan: true,
    enableZoom: true,
    enableRotate: true,
    enableDamping: true,
}

export const rendererParameters = {
    clearColor: '#29191f',
}

export const wobblySphereParameters = {
    material: {
        uniforms: {
            uPositionFrequency: 0.5,
            uTimeFrequency: 0.4,
            uStrength: 0.3,
            
            uWarpPositionFrequency: 0.38,
            uWarpTimeFrequency: 0.12,
            uWarpStrength: 1.7,

            uColorA: '#0000ff',
            uColorB: '#ff0000',
        },

        metalness: 0,
        roughness: 0.5,
        color: '#ffffff',
        transmission: 0,
        ior: 1.5,
        thickness: 1.5,
        transparent: true,
        wireframe: false
    },
}

export const wobblySuzanParameters = {
    material: {
        uniforms: {
            uPositionFrequency: 0.5,
            uTimeFrequency: 0.4,
            uStrength: 0.3,
            
            uWarpPositionFrequency: 0.38,
            uWarpTimeFrequency: 0.12,
            uWarpStrength: 1.7,

            uColorA: '#0000ff',
            uColorB: '#ff0000',
        },

        metalness: 0,
        roughness: 0.5,
        color: '#ffffff',
        transmission: 0,
        ior: 1.5,
        thickness: 1.5,
        transparent: true,
        wireframe: false
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