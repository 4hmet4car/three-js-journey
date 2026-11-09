import { checker, materialColor, uv, vec3 } from 'three/tsl'
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
        })

        const pattern = vec3(checker(uv().mul(4)))
        this.material.colorNode = materialColor.mul(pattern)
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