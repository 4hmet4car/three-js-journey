import * as THREE from 'three'

export const CAMERA = {
    FOV: 35,
    POSITION_X: -10,
    POSITION_Y: 6,
    POSITION_Z: -2,
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
        EXPOSURE: 1,
        TYPE: THREE.ACESFilmicToneMapping,
    }
}

export const GEARS = {
    MATERIAL: {
        TRANSPARENT: true,
    },
    ANIMATION: {
        ROTATION_Y: 0.1
    },
    MESH: {
        CAST_SHADOW: true,
        RECEIVE_SHADOW: true,
    },
}