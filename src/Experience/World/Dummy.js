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
}
