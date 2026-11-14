import { AmbientLight, DirectionalLight } from 'three/webgpu';
import Experience from '../Experience.js';
import { ENVIRONMENT } from '../constants.js';

export default class Environment {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;

    this.setDirectionalLight();
    this.setAmbientLight();
  }

  setDirectionalLight() {
    const directionalLight = new DirectionalLight(
      ENVIRONMENT.DIRECTIONAL_LIGHT.COLOR,
      ENVIRONMENT.DIRECTIONAL_LIGHT.INTENSITY,
    );
    directionalLight.position
      .set(
        ENVIRONMENT.DIRECTIONAL_LIGHT.POSITION_X,
        ENVIRONMENT.DIRECTIONAL_LIGHT.POSITION_Y,
        ENVIRONMENT.DIRECTIONAL_LIGHT.POSITION_Z,
      )
      .normalize()
      .multiplyScalar(ENVIRONMENT.DIRECTIONAL_LIGHT.INTENSITY);
    directionalLight.castShadow = ENVIRONMENT.DIRECTIONAL_LIGHT.CAST_SHADOW;
    directionalLight.shadow.camera.top = ENVIRONMENT.DIRECTIONAL_LIGHT.SHADOW_CAMERA_TOP;
    directionalLight.shadow.camera.right = ENVIRONMENT.DIRECTIONAL_LIGHT.SHADOW_CAMERA_RIGHT;
    directionalLight.shadow.camera.bottom = ENVIRONMENT.DIRECTIONAL_LIGHT.SHADOW_CAMERA_BOTTOM;
    directionalLight.shadow.camera.left = ENVIRONMENT.DIRECTIONAL_LIGHT.SHADOW_CAMERA_LEFT;
    directionalLight.shadow.camera.near = ENVIRONMENT.DIRECTIONAL_LIGHT.SHADOW_CAMERA_NEAR;
    directionalLight.shadow.camera.far = ENVIRONMENT.DIRECTIONAL_LIGHT.SHADOW_CAMERA_FAR;
    directionalLight.shadow.radius = ENVIRONMENT.DIRECTIONAL_LIGHT.SHADOW_RADIUS;
    directionalLight.shadow.normalBias = ENVIRONMENT.DIRECTIONAL_LIGHT.SHADOW_NORMAL_BIAS;
    this.scene.add(directionalLight);
  }

  setAmbientLight() {
    const ambientLight = new AmbientLight(
      ENVIRONMENT.AMBIENT_LIGHT.COLOR,
      ENVIRONMENT.AMBIENT_LIGHT.INTENSITY,
    );
    this.scene.add(ambientLight);
  }
}
