export const cameraParameters = {
  enablePan: true,
  enableZoom: true,
  enableRotate: true,
  enableDamping: true,
};

export const rendererParameters = {
  clearColor: 0x111111,
};

export const torusParameters = {
  material: {
    roughness: 1,
    color: 0xffffff,
    wireframe: false,
    uFrequencies: {
      repetitions: 2,
      speed: 0.25,
    },
    uColor1: 0x0b5d79,
    uColor2: 0x5ed6c2,
    uColor3: 0xfeedaa,
    uColor4: 0xfc8f74,
    uColor5: 0xcf2c65,
  },
};

export const floorParameters = {
  material: {
    color: 0xffffff,
  },
};
