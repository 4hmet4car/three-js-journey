import { Inspector } from 'three/examples/jsm/inspector/Inspector.js';
import TSLGraphEditor from 'three/examples/jsm/inspector/extensions/tsl-graph/TSLGraphEditor.js';
import Experience from '../Experience.js';

export default class Debug {
  constructor() {
    this.experience = new Experience();
    this.renderer = this.experience.renderer;

    this.active = window.location.hash === '#debug';

    if (this.active) {
      this.renderer.instance.inspector = new Inspector();
      this.renderer.instance.inspector.addTab(new TSLGraphEditor());
    }
  }

  init() {
    if (!this.active) return;
    this.experience.world.debug(this.renderer.instance.inspector);
    this.experience.camera.debug(this.renderer.instance.inspector);
    this.experience.renderer.debug(this.renderer.instance.inspector);
  }

  destroy() {
    if (!this.active) return;
    this.inspector.dispose();
  }
}
