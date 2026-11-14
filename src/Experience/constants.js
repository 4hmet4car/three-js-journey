import { NoToneMapping, PCFShadowMap, SRGBColorSpace } from 'three/webgpu';

export const CAMERA = {
  FOV: 35,
  POSITION_X: 5,
  POSITION_Y: 4.5,
  POSITION_Z: 2.5,
  NEAR: 0.1,
  FAR: 100,
  ZOOM: 1,
};

export const ORBIT_CONTROLS = {
  TARGET_X: 0,
  TARGET_Y: 1,
  TARGET_Z: 0,
};

export const RENDERER = {
  POWER_PREFERENCE: 'high-performance',
  ANTIALIAS: true,
  FORCE_WEBGL: false,
  OUTPUT_COLOR_SPACE: SRGBColorSpace,
  SHADOWMAP: {
    ENABLED: true,
    TYPE: PCFShadowMap,
    AUTO_UPDATE: true,
    NEEDS_UPDATE: true,
  },
  TONEMAPPING: {
    EXPOSURE: 1,
    TYPE: NoToneMapping,
  },
};

export const TORUS_KNOT = {
  GEOMETRY: {
    RADIUS: 0.5,
    TUBE_RADIUS: 0.24,
    TUBULAR_SEGMENTS: 128,
    RADIAL_SEGMENTS: 32,
  },
  MESH: {
    CAST_SHADOW: true,
    RECEIVE_SHADOW: true,
    POSITION_Y: 1,
  },
};

export const FLOOR = {
  GEOMETRY: {
    WIDTH: 10,
    HEIGHT: 10,
    WIDTH_SEGMENTS: 10,
    HEIGHT_SEGMENTS: 10,
  },
  MESH: {
    RECEIVE_SHADOW: true,
    ROTATION_X: -Math.PI * 0.5,
  },
};

export const ENVIRONMENT = {
  DIRECTIONAL_LIGHT: {
    COLOR: 0xffffff,
    INTENSITY: 4.5,

    POSITION_X: 2,
    POSITION_Y: 0.75,
    POSITION_Z: -1,
    POSITION_MULTIPLIER: 10,

    CAST_SHADOW: true,
    SHADOW_CAMERA_TOP: 10,
    SHADOW_CAMERA_RIGHT: 10,
    SHADOW_CAMERA_BOTTOM: -10,
    SHADOW_CAMERA_LEFT: -10,
    SHADOW_CAMERA_NEAR: 0.01,
    SHADOW_CAMERA_FAR: 20,
    SHADOW_RADIUS: 3,
    SHADOW_NORMAL_BIAS: 0.1,
  },
  AMBIENT_LIGHT: {
    COLOR: 0x859dff,
    INTENSITY: 1,
  },
};

export const OVERLAY = {
  GEOMETRY: {
    WIDTH: 2,
    HEIGHT: 2,
    WIDTH_SEGMENTS: 1,
    HEIGHT_SEGMENTS: 1,
  },
  ANIMATION: {
    FADE_OUT_DURATION: 3,
  },
};

export const LOADING_BAR = {
  GEOMETRY: {
    WIDTH: 2,
    HEIGHT: 2,
    WIDTH_SEGMENTS: 1,
    HEIGHT_SEGMENTS: 1,
  },
  ANIMATION: {
    FADE_OUT_DURATION: 2,
  },
};
