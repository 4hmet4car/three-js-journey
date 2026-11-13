import { Scene } from 'three/webgpu';
import Camera from './Camera.js';
import Renderer from './Renderer.js';
import Resources from './Utils/Resources.js';
import Sizes from './Utils/Sizes.js';
import Time from './Utils/Time.js';
import World from './World/World.js';

import sources from './sources.js';

// Singleton
let instance = null;

export default class Experience {
  constructor(canvas) {
    // Return singleton
    if (instance) {
      return instance;
    }

    // Initial singleton assignment
    instance = this;

    // Global access
    window.experience = this;

    // Utilities
    this.sizes = new Sizes();
    this.time = new Time();
    this.resources = new Resources(sources);

    // three.js canvas
    this.canvas = canvas;

    // three.js scene
    this.scene = new Scene();

    // World
    this.resources.addEventListener('allItemsLoaded', () => {
      this.world = new World();
    });

    // Camera
    this.camera = new Camera();

    // Renderer
    this.renderer = new Renderer();

    // Resize event listener
    this.sizes.addEventListener('resize', () => {
      this.resize();
    });
  }

  // Resize prorogates the size change to the affected classes
  resize() {
    this.renderer.resize();
  }

  // Update is the animation loop called by the renderer
  update() {
    this.time.update();
    this.camera.update();
    this.renderer.update();
  }
}
