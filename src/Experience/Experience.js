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

    // Singleton assignment
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
    this.world = new World();

    // Camera
    this.camera = new Camera();

    // Renderer
    this.renderer = new Renderer();

    // Resources event listener
    this.resources.addEventListener('allItemsLoaded', () => {
      this.world.init();
    });

    // Resize event listener
    this.sizes.addEventListener('resize', () => {
      this.resize();
    });

    // Register animation loop
    this.renderer.register();

    // Load items
    this.resources.load();
  }

  // Resize prorogates the size change to the desired classes
  resize() {
    this.world.resize();
    this.camera.resize();
    this.renderer.resize();
  }

  // Update is the animation loop registered by the renderer
  update() {
    this.time.update();
    this.world.update();
    this.camera.update();
    this.renderer.update();
  }

  destroy() {}
}
