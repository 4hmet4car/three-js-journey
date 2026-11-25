import { uv } from 'three/tsl';
import { Mesh, MeshStandardNodeMaterial, PlaneGeometry, SRGBColorSpace } from 'three/webgpu';
import { FLOOR } from '../constants.js';
import Experience from '../Experience.js';
import { floorParameters } from '../parameters.js';

export default class Floor {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.setGeometry();
    this.setMaterial();
    this.setMesh();
  }

  setGeometry() {
    this.geometry = new PlaneGeometry(
      FLOOR.GEOMETRY.WIDTH,
      FLOOR.GEOMETRY.HEIGHT,
      FLOOR.GEOMETRY.WIDTH_SEGMENTS,
      FLOOR.GEOMETRY.HEIGHT_SEGMENTS,
    );
  }

  setMaterial() {
    const colorMap = this.resources.items.uvChecker;
    colorMap.colorSpace = SRGBColorSpace;

    this.material = new MeshStandardNodeMaterial({
      color: floorParameters.material.color,
      map: colorMap,
      transparent: true,
    });

    const fade = uv().sub(0.5).length().smoothstep(0.5, 0.2);
    this.material.opacityNode = fade;
  }

  setMesh() {
    this.mesh = new Mesh(this.geometry, this.material);
    this.mesh.rotation.x = FLOOR.MESH.ROTATION_X;
    this.mesh.receiveShadow = FLOOR.MESH.RECEIVE_SHADOW;
    this.scene.add(this.mesh);
  }

  async debug(inspector) {
    this.gui = inspector.createParameters('Floor');

    this.gui.addColor(floorParameters.material, 'color').onChange((event) => {
      this.material.color.set(event);
    });
  }

  destroy() {
    this.scene.remove(this.mesh);
    this.geometry.dispose();
    this.material.dispose();
  }
}
