export const CAMERA = {
    FOV: 35,
    POSITION_X: 0,
    POSITION_Y: 0,
    POSITION_Z: 18,
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

// export const PI = 3.1415926535897932384626433832795

export const PARTICLES = {
    GEOMETRY: {
        WIDTH: 10,
        HEIGHT: 10,
        WIDTH_SEGMENTS: 128,
        HEIGHT_SEGMENTS: 128,
    },
}

export const DISPLACEMENT = {
    CANVAS: {
        WIDTH: 128,
        HEIGHT: 128,

        STYLE: {
            POSITION: 'fixed',
            WIDTH: '512px',
            HEIGHT: '512px',
            TOP: 0,
            LEFT: 0,
            Z_INDEX: 10,
        }
    },

    RAY_RECEIVER: {
        GEOMETRY: {
            WIDTH: PARTICLES.GEOMETRY.WIDTH,
            HEIGHT: PARTICLES.GEOMETRY.HEIGHT,  
        },
    },

    CANVAS_CURSOR: {
        CANVAS_SIZE_MULTIPLIER: 0.25
    }
}