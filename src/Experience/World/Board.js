import { Mesh, MeshBasicNodeMaterial, PlaneGeometry } from 'three/webgpu';
import Experience from '../Experience.js';
import { BOARD } from '../constants.js';

export default class Board {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;

    this.setGeometry();
    this.setMaterial();
    this.setMesh();
  }

  setGeometry() {
    this.geometry = new PlaneGeometry(
      BOARD.GEOMETRY.WIDTH,
      BOARD.GEOMETRY.HEIGHT,
      BOARD.GEOMETRY.WIDTH_SEGMENTS,
      BOARD.GEOMETRY.HEIGHT_SEGMENTS,
    );
  }

  setMaterial() {
    this.material = new MeshBasicNodeMaterial();
  }

  setMesh() {
    this.mesh = new Mesh(this.geometry, this.material);
    this.mesh.castShadow = BOARD.MESH.CAST_SHADOW;
    this.mesh.receiveShadow = BOARD.MESH.RECEIVE_SHADOW;
    this.mesh.position.y = BOARD.MESH.POSITION_Y;
    this.scene.add(this.mesh);
  }

  async setTransformControls() {
    const camera = this.experience.camera;
    const canvas = this.experience.canvas;

    const { TransformControls } = await import('three/examples/jsm/controls/TransformControls.js');

    this.transformControls = new TransformControls(camera.instance, canvas);
    this.transformControls.attach(this.mesh);

    const helper = this.transformControls.getHelper();
    this.scene.add(helper);

    const disableOrbitControls = (event) => {
      camera.controls.enabled = !event.value;
    };
    this.transformControls.addEventListener('dragging-changed', disableOrbitControls);

    const switchTransformMode = (event) => {
      if (event.key === 'g') this.transformControls.setMode('translate');
      else if (event.key === 'r') this.transformControls.setMode('rotate');
      else if (event.key === 's') this.transformControls.setMode('scale');
    };
    window.addEventListener('keydown', switchTransformMode);

    this.destroyTransformControls = () => {
      this.transformControls.removeEventListener('dragging-changed', disableOrbitControls);
      window.removeEventListener('keydown', switchTransformMode);
      this.transformControls.detach();
      this.scene.remove(helper);
      helper.dispose();
      this.transformControls.dispose();
    };
  }

  async debug(inspector) {
    await this.setTransformControls();

    this.gui = inspector.createParameters('Board');

    this.gui
      .add(this.transformControls, 'enabled')
      .name('transformControls')
      .onChange((event) => {
        this.transformControls.getHelper().visible = event;
      });
  }

  destroy() {
    this.destroyTransformControls?.();
    this.scene.remove(this.mesh);
    this.geometry.dispose();
    this.material.dispose();
  }
}
