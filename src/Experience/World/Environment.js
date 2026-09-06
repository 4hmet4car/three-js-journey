import { mx_noise_vec3, uv, vertexStage } from 'three/tsl'
import * as THREE from 'three/webgpu'
import Experience from "../Experience.js"

export default class Environment
{
    constructor()
    {
        this.experience = new Experience()
        this.resources = this.experience.resources
        this.scene = this.experience.scene

        this.setFloorGeometry()
        this.setFloorMaterial()
        this.setFloor()
        this.setLights()
    }

    setFloorGeometry()
    {
        this.floorGeometry = new THREE.PlaneGeometry(10, 10, 10, 10)
    }

    setFloorMaterial()
    {
        this.floorTexture = this.resources.items.floorTexture
        this.floorTexture.colorSpace = THREE.SRGBColorSpace
        this.floorMaterial = new THREE.MeshStandardNodeMaterial({
            map: this.floorTexture,
            transparent: true
        })


        const fade = uv().sub(0.5).length().smoothstep(0.5, 0.2)
        this.floorMaterial.opacityNode = fade

        const noise = vertexStage(mx_noise_vec3(uv().mul(4)))
        this.floorMaterial.colorNode = noise
    }

    setFloor()
    {
        this.floor = new THREE.Mesh(this.floorGeometry, this.floorMaterial)
        this.floor.rotation.x = - Math.PI * 0.5
        this.floor.receiveShadow = true
        this.scene.add(this.floor)
    }

    setLights()
    {
        this.directionalLight = new THREE.DirectionalLight(0xffffff, 4.5)
        this.directionalLight.castShadow = true
        this.directionalLight.position.set(2, 0.75, -1).normalize().multiplyScalar(10)
        this.directionalLight.shadow.camera.top = 10
        this.directionalLight.shadow.camera.right = 10
        this.directionalLight.shadow.camera.bottom = -10
        this.directionalLight.shadow.camera.left = -10
        this.directionalLight.shadow.camera.near = 0.01
        this.directionalLight.shadow.camera.far = 20
        this.directionalLight.shadow.radius = 3
        this.directionalLight.shadow.normalBias = 0.1
        this.scene.add(this.directionalLight)

        this.ambientLight = new THREE.AmbientLight(0x859dff, 1)
        this.scene.add(this.ambientLight)
    }
}