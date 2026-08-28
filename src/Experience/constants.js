export const CAMERA = {
    FOV: 25,
    POSITION_X: 12,
    POSITION_Y: 5,
    POSITION_Z: 4,
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
}

export const PI = 3.1415926535897932384626433832795

export const EARTH = {
    GEOMETRY: {
        RADIUS: 2,
        WIDTH_SEGMENTS: 64,
        HEIGHT_SEGMENTS: 64,
    },

    MESH: {
        POSITION_X: 0,
    },

    ANIMATION: {
        ANGULAR_ROTATION_SPEED: 7.292 / 100000 * 24 * 60,
    },
}

export const ATMOSPHERE = {
    GEOMETRY: {
        RADIUS: 2.08,
        WIDTH_SEGMENTS: 64,
        HEIGHT_SEGMENTS: 64,
    },
}

export const SUN = {
    GEOMETRY: {
        RADIUS: 0.1,
        WIDTH_SEGMENTS: 16,
        HEIGHT_SEGMENTS: 16,
    },

    MESH:{
        RADIUS: 4,
    }
}