export default {
    camera: {
        enablePan: false,
        enableZoom: false,
        enableRotate: false,
        enableDamping: false,
    },

    renderer: {
        clearColor: '#000000',
    },

    water: {
        bigWavesElevation: 0.2,
        bigWavesFrequency: { x: 4, y: 1.5 },
        bigWavesSpeed: 0.75,

        smallWavesElevation: 0.15,
        smallWavesFrequency: 3,
        smallWavesSpeed: 0.2,
        smallIterations: 4,

        neighbourShift: 0.04,

        depthColor: '#ff4000',
        surfaceColor: '#151c37',
        colorOffset: 0.94,
        colorMultiplier: 1,

        axesHelperVisibility: false,
    },

    buoy: {
        lightColor: 1,
        sticksColor: { r: 1, g: 0.5, b:0 },
        bottomColor: { r: 1, g: 1, b: 1 },
        position: { x: 0, y: 0, z: 0 },
        normal: { x: 0, y: 0, z: 0 },
        neighbourShift: 0.04,
        easeFactor: 0.07,
        elevationOffset: 0.04,
    },
}