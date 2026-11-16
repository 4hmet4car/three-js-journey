import Experience from '../Experience.js';

export default class Debug {
  constructor() {
    this.experience = new Experience();
    this.renderer = this.experience.renderer;

    this.active = window.location.hash === '#debug';
  }

  async init() {
    if (this.active) {
      const [{ Inspector }, { default: TSLGraphEditor }] = await Promise.all([
        import('three/examples/jsm/inspector/Inspector.js'),
        import('three/examples/jsm/inspector/extensions/tsl-graph/TSLGraphEditor.js'),
      ]);
      this.inspector = new Inspector();
      this.inspector.addTab(new TSLGraphEditor());
      this.renderer.instance.inspector = this.inspector;
      this.experience.world.debug(this.inspector);
      this.experience.camera.debug(this.inspector);
      this.experience.renderer.debug(this.inspector);
    }
  }

  destroy() {
    if (this.active) {
      this.inspector.dispose();
    }
  }
}
