import { Scene } from 'three/webgpu';
import Camera from './Camera.js';
import Renderer from './Renderer.js';
import Debug from './Utils/Debug.js';
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

    // Debug
    this.debug = new Debug();

    // Resources event listener
    this.resources.addEventListener('allItemsLoaded', this.onAllItemsLoaded);

    // Resize event listener
    this.sizes.addEventListener('resize', this.onResize);

    // Register animation loop
    this.renderer.register();

    // Load items
    this.resources.load();
  }

  // This event listener is used only once so it is removed
  // after the first call
  // defined with fat arrows so it retains the context
  onAllItemsLoaded = () => {
    this.resources.removeEventListener('allItemsLoaded', this.onAllItemsLoaded);
    this.world.init();
    this.debug.init();
  };

  // Resize prorogates the size change to the desired classes
  // defined with fat arrows so it retains the context
  onResize = () => {
    this.world.resize();
    this.camera.resize();
    this.renderer.resize();
  };

  // Update is the animation loop registered by the renderer
  // defined with fat arrows so it retains the context
  update = () => {
    this.time.update();
    this.world.update();
    this.camera.update();
    this.renderer.update();
  };

  // Async recommended for WebGPU renderer disposal
  async destroy() {
    // Stop renderer
    this.renderer.stop();

    // Remove event listeners
    this.sizes.removeEventListener('resize', this.onResize);
    this.sizes.removeEventListener('allItemsLoaded', this.onAllItemsLoaded);

    // Destroy world, camera, and utilities
    this.debug.destroy();
    this.debug = null;
    this.world.destroy();
    this.world = null;
    this.camera.destroy();
    this.camera = null;
    this.resources.destroy();
    this.resources = null;
    this.sizes.destroy();
    this.sizes = null;
    this.time = null;

    await this.renderer.destroy();
    this.renderer = null;

    delete window.experience;
    instance = null;
  }
}
