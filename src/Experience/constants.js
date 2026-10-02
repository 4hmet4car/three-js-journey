import * as THREE from 'three'

export const CAMERA = {
    FOV: 75,
    POSITION_X: 4,
    POSITION_Y: 1,
    POSITION_Z: -4,
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
    ANTIALIAS: true,
    OUTPUT_COLOR_SPACE: THREE.LinearSRGBColorSpace,
    SHADOWMAP: {
        ENABLED: true,
        TYPE: THREE.PCFShadowMap,
    },
    TONEMAPPING: {
        EXPOSURE: 1.5,
        TYPE: THREE.ReinhardToneMapping,
    }
}

export const HELMET = {
    MATERIAL: {
        SIDE: THREE.DoubleSide,
        ENV_MAP_INTENSITY: 2.5,
        CAST_SHADOW: true,
        RECEIVE_SHADOW: true,
    },
    MODEL: {
        SCALE_X: 2,
        SCALE_Y: 2,
        SCALE_Z: 2,
        ROTATION_Y: Math.PI * 0.5,
    },
}