export default {
    camera: {
        enablePan: true,
        enableZoom: true,
        enableRotate: true,
    },

    renderer: {
        clearColor: '#000000',
    },

    sky: {
        turbidity: 10,
        rayleigh: 3,
        mieCoefficient: 0.005,
        mieDirectionalG: 0.7,
        elevation: 2,
        azimuth: 180,
        exposure: 1,
        cloudCoverage: 0.4,
        cloudDensity: 0.4,
        cloudElevation: 0.5,
        showSunDisc: true
    },

    fireworks: {
        gravity: 9.81,
    },
}