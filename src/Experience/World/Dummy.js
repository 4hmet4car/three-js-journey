import * as THREE from 'three/webgpu'
import Experience from "../Experience.js"

export default class Floor
{
    constructor()
    {
        this.experience = new Experience()
        this.resources = this.experience.resources
        this.scene = this.experience.scene

        this.setGeometry()
        this.setMaterial()
        this.setMesh()
    }

    setGeometry()
    {
        this.geometry = new THREE.TorusKnotGeometry(0.5, 0.24, 128, 32)
    }

    setMaterial()
    {
        this.material = new THREE.MeshStandardMaterial()
    }

    setMesh()
    {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.castShadow = true
        this.mesh.receiveShadow = true
        this.mesh.position.y = 1
        this.scene.add(this.mesh)
    }
}