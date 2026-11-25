import { Mesh, MeshStandardNodeMaterial, TorusKnotGeometry } from 'three/webgpu';
import Experience from '../Experience.js';
import { TORUS_KNOT } from '../constants.js';

export default class Dummy {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;

    this.setGeometry();
    this.setMaterial();
    this.setMesh();
  }

  setGeometry() {
    this.geometry = new TorusKnotGeometry(
      TORUS_KNOT.GEOMETRY.RADIUS,
      TORUS_KNOT.GEOMETRY.TUBE_RADIUS,
      TORUS_KNOT.GEOMETRY.TUBULAR_SEGMENTS,
      TORUS_KNOT.GEOMETRY.RADIAL_SEGMENTS,
    );
  }

  setMaterial() {
    this.material = new MeshStandardNodeMaterial();
  }

  setMesh() {
    this.mesh = new Mesh(this.geometry, this.material);
    this.mesh.castShadow = TORUS_KNOT.MESH.CAST_SHADOW;
    this.mesh.receiveShadow = TORUS_KNOT.MESH.RECEIVE_SHADOW;
    this.mesh.position.y = TORUS_KNOT.MESH.POSITION_Y;
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

    this.gui = inspector.createParameters('Dummy');

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
