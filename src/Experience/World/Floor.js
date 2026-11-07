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
    }

    setMesh()
    {
        this.mesh = new THREE.Mesh(
            new THREE.PlaneGeometry(10, 10, 10, 10),
            new THREE.MeshStandardMaterial({ map: this.floorTexture })
        )
        this.mesh.rotation.x = - Math.PI * 0.5
        this.mesh.receiveShadow = true
        this.scene.add(this.mesh)
    }
}