import { WebGPURenderer } from 'three/webgpu';
import Experience from './Experience.js';
import { RENDERER } from './constants.js';
import { rendererParameters } from './parameters.js';

export default class Renderer {
  constructor() {
    this.experience = new Experience();
    this.canvas = this.experience.canvas;
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.camera = this.experience.camera;

    this.setInstance();
  }

  setInstance() {
    this.instance = new WebGPURenderer({
      canvas: this.canvas,
      antialias: RENDERER.ANTIALIAS,
      forceWebGL: RENDERER.FORCE_WEBGL,
      powerPreference: RENDERER.POWER_PREFERENCE,
    });
    this.instance.setClearColor(rendererParameters.clearColor);
    this.instance.shadowMap.enabled = RENDERER.SHADOWMAP.ENABLED;
    this.instance.shadowMap.type = RENDERER.SHADOWMAP.TYPE;
    this.instance.shadowMap.autoUpdate = RENDERER.SHADOWMAP.AUTO_UPDATE;
    this.instance.shadowMap.needsUpdate = RENDERER.SHADOWMAP.NEEDS_UPDATE;
    this.instance.toneMapping = RENDERER.TONEMAPPING.TYPE;
    this.instance.toneMappingExposure = RENDERER.TONEMAPPING.EXPOSURE;
    this.instance.outputColorSpace = RENDERER.OUTPUT_COLOR_SPACE;
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(this.sizes.pixelRatio);
  }

  resize() {
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(this.sizes.pixelRatio);
  }

  update() {
    this.instance.render(this.scene, this.camera);
  }
}
