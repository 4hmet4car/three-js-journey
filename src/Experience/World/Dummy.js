import * as THREE from 'three/webgpu'
import Experience from "../Experience.js"

import { checker, uv, float, vec3 } from 'three/tsl'


export default class Dummy
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene

        this.setMaterial()
        this.setGeometry()
        this.setMesh()
    }

    setGeometry()
    {
        this.geometry = new THREE.TorusKnotGeometry(0.5, 0.24, 128, 32)
    }

    setMaterial()
    {
        this.material = new THREE.MeshStandardNodeMaterial({
            color: 'red',
            metalness: 0.5,
            roughness: 0.25,
        })

        this.material.colorNode = vec3(1, 0.4, 0.1)
        this.material.roughnessNode = float(0)
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