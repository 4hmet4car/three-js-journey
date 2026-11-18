import { AmbientLight, DirectionalLight } from 'three/webgpu';
import Experience from '../Experience.js';
import { ENVIRONMENT } from '../constants.js';

export default class Environment {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;

    this.setAmbientLight();
    this.setDirectionalLight();
  }

  setAmbientLight() {
    this.ambientLight = new AmbientLight(
      ENVIRONMENT.AMBIENT_LIGHT.COLOR,
      ENVIRONMENT.AMBIENT_LIGHT.INTENSITY,
    );
    this.scene.add(this.ambientLight);
  }

  setDirectionalLight() {
    this.directionalLight = new DirectionalLight(
      ENVIRONMENT.DIRECTIONAL_LIGHT.COLOR,
      ENVIRONMENT.DIRECTIONAL_LIGHT.INTENSITY,
    );
    this.directionalLight.position
      .set(
        ENVIRONMENT.DIRECTIONAL_LIGHT.POSITION_X,
        ENVIRONMENT.DIRECTIONAL_LIGHT.POSITION_Y,
        ENVIRONMENT.DIRECTIONAL_LIGHT.POSITION_Z,
      )
      .normalize()
      .multiplyScalar(ENVIRONMENT.DIRECTIONAL_LIGHT.POSITION_MULTIPLIER);
    this.directionalLight.castShadow = ENVIRONMENT.DIRECTIONAL_LIGHT.CAST_SHADOW;
    this.directionalLight.shadow.camera.top = ENVIRONMENT.DIRECTIONAL_LIGHT.SHADOW_CAMERA_TOP;
    this.directionalLight.shadow.camera.right = ENVIRONMENT.DIRECTIONAL_LIGHT.SHADOW_CAMERA_RIGHT;
    this.directionalLight.shadow.camera.bottom = ENVIRONMENT.DIRECTIONAL_LIGHT.SHADOW_CAMERA_BOTTOM;
    this.directionalLight.shadow.camera.left = ENVIRONMENT.DIRECTIONAL_LIGHT.SHADOW_CAMERA_LEFT;
    this.directionalLight.shadow.camera.near = ENVIRONMENT.DIRECTIONAL_LIGHT.SHADOW_CAMERA_NEAR;
    this.directionalLight.shadow.camera.far = ENVIRONMENT.DIRECTIONAL_LIGHT.SHADOW_CAMERA_FAR;
    this.directionalLight.shadow.radius = ENVIRONMENT.DIRECTIONAL_LIGHT.SHADOW_RADIUS;
    this.directionalLight.shadow.normalBias = ENVIRONMENT.DIRECTIONAL_LIGHT.SHADOW_NORMAL_BIAS;
    this.scene.add(this.directionalLight);
  }

  async debug() {}

  destroy() {
    this.scene.remove(this.ambientLight);
    this.ambientLight.dispose();

    this.scene.remove(this.directionalLight);
    this.scene.remove(this.directionalLight.target); // Potential light target
    this.directionalLight.shadow.dispose();
    this.directionalLight.dispose();
  }
}
