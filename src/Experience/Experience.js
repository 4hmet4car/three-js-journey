import { Scene } from 'three/webgpu';
import Sizes from './Utils/Sizes.js';

// Singleton
let instance = null;

export default class Experience {
  constructor(canvas) {
    // Return singleton
    if (instance) {
      return instance;
    }

    // Initial assignment
    instance = this;

    // Global access
    window.experience = this;

    // three.js canvas
    this.canvas = canvas;

    // three.js scene
    this.scene = new Scene();

    // Utilities
    this.sizes = new Sizes();

    // Resize event listener
    this.sizes.addEventListener('resize', () => {
      console.log('resized');
    });
  }
}
