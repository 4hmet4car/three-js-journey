export const cameraParameters = {
    enablePan: true,
    enableZoom: true,
    enableRotate: true,
    enableDamping: true,
}

export const rendererParameters = {
    clearColor: '#29191f',
}

export const helmetParameters = {
    shadowPlane: false,
}

export const postProcessingParameters = {
    dotScreenPass: {
        enabled: false,
    },
    glitchPass: {
        enabled: false,
        goWild: false,
    },
    rgbShiftPass: {
        enabled: false,
    },
    unrealBloomPass: {
        enabled: false,
        strength: 0.3,
        radius: 1,
        threshold: 0.6,
    },
    tintPass: {
        enabled: false,
        r: 1,
        g: 0,
        b: 0,
    },
    displacementPass: {
        enabled: true,
        r: 0,
        g: 1,
        b: 0,
    },
}