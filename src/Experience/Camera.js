import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { PerspectiveCamera } from 'three/webgpu';
import Experience from './Experience.js';
import { CAMERA, ORBIT_CONTROLS } from './constants.js';
import { cameraParameters } from './parameters.js';

export default class Camera {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;

    this.setPerspectiveCameraInstance();
    this.setOrbitControls();
  }

  setPerspectiveCameraInstance() {
    this.instance = new PerspectiveCamera(
      CAMERA.FOV,
      this.sizes.aspectRatio,
      CAMERA.NEAR,
      CAMERA.FAR,
    );

    this.instance.position.set(
      CAMERA.POSITION_X / CAMERA.ZOOM,
      CAMERA.POSITION_Y / CAMERA.ZOOM,
      CAMERA.POSITION_Z / CAMERA.ZOOM,
    );

    this.scene.add(this.instance);
  }

  setOrbitControls() {
    this.controls = new OrbitControls(this.instance, this.canvas);
    this.controls.target.x = ORBIT_CONTROLS.TARGET_X;
    this.controls.target.y = ORBIT_CONTROLS.TARGET_Y;
    this.controls.target.z = ORBIT_CONTROLS.TARGET_Z;
    this.controls.enablePan = cameraParameters.enablePan;
    this.controls.enableZoom = cameraParameters.enableZoom;
    this.controls.enableRotate = cameraParameters.enableRotate;
    this.controls.enableDamping = cameraParameters.enableDamping;
  }

  resize() {
    this.instance.aspectRatio = this.sizes.aspectRatio;
    this.instance.updateProjectionMatrix();
  }

  update() {
    this.controls.update();
  }
}
