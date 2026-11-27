import {
  LinearSRGBColorSpace,
  NoToneMapping,
  PCFShadowMap,
} from 'three/webgpu';

export const CAMERA = {
  FOV: 35,
  POSITION_X: 1.25,
  POSITION_Y: 4,
  POSITION_Z: 5,
  NEAR: 0.1,
  FAR: 100,
  ZOOM: 1,
};

export const ORBIT_CONTROLS = {
  TARGET_X: 0,
  TARGET_Y: 0,
  TARGET_Z: 0,
};

export const RENDERER = {
  POWER_PREFERENCE: 'high-performance',
  ANTIALIAS: true,
  FORCE_WEBGL: false,
  OUTPUT_COLOR_SPACE: LinearSRGBColorSpace,
  SHADOWMAP: {
    ENABLED: false,
    TYPE: PCFShadowMap,
    AUTO_UPDATE: true,
    NEEDS_UPDATE: true,
  },
  TONEMAPPING: {
    EXPOSURE: 1,
    TYPE: NoToneMapping,
  },
};

export const BOARD = {
  GEOMETRY: {
    RADIUS: 2,
    SEGMENTS: 32,
  },
  MESH: {
    CAST_SHADOW: false,
    RECEIVE_SHADOW: false,
    POSITION_Y: 0.01,
    ROTATION_X: -Math.PI * 0.5,
  },
};

export const FLOOR = {
  GEOMETRY: {
    WIDTH: 10,
    HEIGHT: 10,
    WIDTH_SEGMENTS: 1,
    HEIGHT_SEGMENTS: 1,
  },
  MESH: {
    RECEIVE_SHADOW: false,
    ROTATION_X: -Math.PI * 0.5,
  },
};
