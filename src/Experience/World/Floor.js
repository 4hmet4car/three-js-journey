import {
  blendBurn,
  blendColor,
  blendDodge,
  grayscale,
  hue,
  materialColor,
  mix,
  oscSine,
  rotateUV,
  saturation,
  texture,
  time,
  uv,
  vec2,
  vec4,
  vibrance,
} from 'three/tsl';
import {
  Mesh,
  MeshStandardNodeMaterial,
  MirroredRepeatWrapping,
  PlaneGeometry,
  SRGBColorSpace,
} from 'three/webgpu';
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
    colorMap.wrapS = MirroredRepeatWrapping;
    colorMap.wrapT = MirroredRepeatWrapping;

    this.material = new MeshStandardNodeMaterial({
      color: floorParameters.material.color,
      transparent: true,
    });

    // this.material.colorNode = texture(colorMap, rotateUV(uv().mul(3), -1, vec2(0)));

    const oscillation = oscSine(time.mul(0.2));

    // this.material.colorNode = mix(texture(colorMap).rgb, materialColor, oscillation);

    // this.material.colorNode = blendDodge(texture(colorMap).rgb, materialColor);

    // this.material.colorNode = blendBurn(texture(colorMap).rgb, materialColor);

    // this.material.colorNode = blendColor(
    //   vec4(texture(colorMap).rgb, 0.7),
    //   vec4(materialColor, 0.5),
    // );

    // this.material.colorNode = saturation(texture(colorMap).rgb, oscillation.mul(2));

    // this.material.colorNode = grayscale(texture(colorMap).rgb);

    // this.material.colorNode = vibrance(texture(colorMap).rgb, oscillation);

    this.material.colorNode = hue(texture(colorMap).rgb, time);

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
