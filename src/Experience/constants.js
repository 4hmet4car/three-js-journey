import * as THREE from 'three'

export const CAMERA = {
    FOV: 75,
    POSITION_X: 2,
    POSITION_Y: 2,
    POSITION_Z: 6,
    NEAR: 0.1,
    FAR: 100,
    ZOOM: 1,
}

export const ORBIT_CONTROLS = {
    TARGET_X: 0,
    TARGET_Y: 0,
    TARGET_Z: 0,
}

export const RENDERER = {
    POWER_PREFERENCE: 'high-performance',
    ANTIALIAS: true,
    OUTPUT_COLOR_SPACE: THREE.SRGBColorSpace,
    SHADOWMAP: {
        ENABLED: true,
        TYPE: THREE.PCFShadowMap,
    },
    TONEMAPPING: {
        EXPOSURE: 1.5,
        TYPE: THREE.ReinhardToneMapping,
    }
}