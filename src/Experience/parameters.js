export default {
    camera: {
        enablePan: true,
        enableZoom: false,
        enableRotate: true,
    },

    renderer: {
        clearColor: '#000000',
    },

    lightMaterial: {
        color: '#ffffff',
        ambientLightColor: '#ffffff',
        ambientLightIntensity: 0.03,
        directionalLightColor: '#1a1aff',
        directionalLightIntensity: 1,
        directionalLightPosition: { x: 0, y: 0, z: 3 },
        directionalLightTarget: { x: 0, y: 0, z: 0 },
        directionalLightSpecularPower: 20,
        pointLightColor: '#ff1a1a',
        pointLightIntensity: 1,
        pointLightPosition: { x: 0, y: 2.5, z: 0 },
        pointLightTarget: { x: 0, y: 0, z: 0 },
        pointLightSpecularPower: 20,
        pointLightDecay: 0.25,
        cursorLightColor: '#1aff25',
        cursorLightPositionZ: 0.997,
    }
}