import { EventDispatcher, Vector2 } from 'three/webgpu';

export default class Sizes extends EventDispatcher {
  constructor() {
    // Event dispatcher
    super();

    // Setup
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);
    this.resolution = new Vector2(this.width, this.height).multiplyScalar(this.pixelRatio);
    this.aspectRatio = this.width / this.height;

    // Handle resize
    window.addEventListener('resize', () => {
      this.resize();
    });
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);
    this.resolution = new Vector2(this.width, this.height).multiplyScalar(this.pixelRatio);
    this.aspectRatio = this.width / this.height;

    this.dispatchEvent({ type: 'resize' });
  }
}
