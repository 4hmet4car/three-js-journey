export default {
    camera: {
        enablePan: true,
        enableZoom: true,
        enableRotate: true,
        enableDamping: true,
    },

    renderer: {
        clearColor: '#000000',
    },

    water: {
        depthColor: '#ff4000',
        surfaceColor: '#151c37',
        bigWavesElevation: 0.2,
        bigWavesFrequency: { x: 4, y: 1.5 },
        bigWavesSpeed: 0.75,
        smallWavesElevation: 0.15,
        smallWavesFrequency: 3,
        smallWavesSpeed: 0.2,
        smallIterations: 4,
        colorOffset: 0.925,
        colorMultiplier: 1,
    },
}