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

export const WATER = {
    GEOMETRY: {
        WIDTH: 10,
        HEIGHT: 10,
        WIDTH_SEGMENTS: 1,
        HEIGHT_SEGMENTS: 1,
    },
    MATERIAL: {
        TRANSMISSION: 1,
        ROUGHNESS: 0.2,
    },
    MESH: {
        ROTATION_X: -Math.PI * 0.5,
        POSITION_Y: -0.1,
    },
}

export const TERRAIN = {
    GEOMETRY: {
        WIDTH: 10,
        HEIGHT: 10,
        WIDTH_SEGMENTS: 500,
        HEIGHT_SEGMENTS: 500,
        ROTATION_X: -Math.PI * 0.5,
    },
    MATERIAL: {
        CUSTOM_SHADER_MATERIAL: {},
        BASE_MATERIAL: {
            METALNESS: 0,
            ROUGHNESS: 0.5,
            COLOR: '#85d534',
        },
    },
    ANIMATION: {
        ROTATION_Y: 0.1
    },
    MESH: {
        CAST_SHADOW: true,
        RECEIVE_SHADOW: true,
    },
}

export const BOARD = {
    BOARD_FILL: {
        WIDTH: 11,
        HEIGHT: 2,
        DEPTH: 11,
    },
    BOARD_HOLE: {
        WIDTH: 10,
        HEIGHT: 2.1,
        DEPTH: 10,
    },
    MATERIAL: {
        COLOR: '#ffffff',
        METALNESS: 0,
        ROUGHNESS: 0.3
    },
    MESH: {
        CAST_SHADOW: true,
        RECEIVE_SHADOW: true,
    },
}