import { CircleGeometry, Mesh, MeshBasicNodeMaterial } from 'three/webgpu';
import Experience from '../Experience.js';
import { BOARD } from '../constants.js';
import { patterns } from './Patterns.js';

export default class Board {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;

    this.setGeometry();
    this.setMaterial();
    this.setMesh();
  }

  setGeometry() {
    this.geometry = new CircleGeometry(
      BOARD.GEOMETRY.RADIUS,
      BOARD.GEOMETRY.SEGMENTS,
    );
  }

  setMaterial() {
    this.material = new MeshBasicNodeMaterial();

    this.material.colorNode = patterns.stepGradient;
  }

  setMesh() {
    this.mesh = new Mesh(this.geometry, this.material);
    this.mesh.castShadow = BOARD.MESH.CAST_SHADOW;
    this.mesh.receiveShadow = BOARD.MESH.RECEIVE_SHADOW;
    this.mesh.position.y = BOARD.MESH.POSITION_Y;
    this.mesh.rotation.x = BOARD.MESH.ROTATION_X;
    this.scene.add(this.mesh);
  }

  async setTransformControls() {
    const camera = this.experience.camera;
    const canvas = this.experience.canvas;

    const { TransformControls } =
      await import('three/examples/jsm/controls/TransformControls.js');

    this.transformControls = new TransformControls(
      camera.instance,
      canvas,
    );
    this.transformControls.enabled = false;
    this.transformControls.attach(this.mesh);

    const helper = this.transformControls.getHelper();
    helper.visible = false;
    this.scene.add(helper);

    const disableOrbitControls = (event) => {
      camera.controls.enabled = !event.value;
    };
    this.transformControls.addEventListener(
      'dragging-changed',
      disableOrbitControls,
    );

    const switchTransformMode = (event) => {
      if (event.key === 'g') this.transformControls.setMode('translate');
      else if (event.key === 'r') this.transformControls.setMode('rotate');
      else if (event.key === 's') this.transformControls.setMode('scale');
    };
    window.addEventListener('keydown', switchTransformMode);

    this.destroyTransformControls = () => {
      this.transformControls.removeEventListener(
        'dragging-changed',
        disableOrbitControls,
      );
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
      .add(this.material, 'colorNode', patterns)
      .name('Pattern')
      .onChange(() => {
        this.material.needsUpdate = true;
      });

    this.gui
      .add(this.transformControls, 'enabled')
      .name('transformControls')
      .onChange((event) => {
        this.transformControls.getHelper().visible = event;
      });

    const { fragmentShader } =
      await this.experience.renderer.instance.debug.getShaderAsync(
        this.scene,
        this.experience.camera.instance,
        this.mesh,
      );

    console.log(fragmentShader);
  }

  destroy() {
    this.destroyTransformControls?.();
    this.scene.remove(this.mesh);
    this.geometry.dispose();
    this.material.dispose();
  }
}
