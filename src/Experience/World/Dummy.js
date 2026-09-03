import * as THREE from 'three/webgpu'
import Experience from "../Experience.js"

export default class Dummy
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene

        this.setDummy()
    }

    setDummy()
    {
        this.geometry = new THREE.TorusKnotGeometry(0.5, 0.24, 128, 32)
        this.material = new THREE.MeshStandardMaterial()
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.castShadow = true
        this.mesh.receiveShadow = true
        this.mesh.position.y = 1
        this.scene.add(this.mesh)
    }
}