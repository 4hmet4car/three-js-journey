import { mx_noise_vec3, uv, vec2 } from 'three/tsl'
import * as THREE from 'three/webgpu'
import Experience from "../Experience.js"

export default class Floor
{
    constructor()
    {
        this.experience = new Experience()
        this.resources = this.experience.resources
        this.scene = this.experience.scene

        this.setMaterial()
        this.setMesh()
    }

    setMaterial()
    {
        this.floorTexture = this.resources.items.floorTexture
        this.floorTexture.colorSpace = THREE.SRGBColorSpace

        this.material = new THREE.MeshStandardNodeMaterial({
            map: this.floorTexture,
            transparent: true,
        })

        const fade = uv().distance(vec2(0.5)).smoothstep(0.5, 0.2)
        this.material.opacityNode = fade

        const noise = mx_noise_vec3(uv().mul(4)).toVertexStage()
        this.material.colorNode = noise
    }

    setMesh()
    {
        this.mesh = new THREE.Mesh(
            new THREE.PlaneGeometry(10, 10, 10, 10),
            this.material
        )
        this.mesh.rotation.x = - Math.PI * 0.5
        this.mesh.receiveShadow = true
        this.scene.add(this.mesh)
    }
}