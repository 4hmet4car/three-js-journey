import * as THREE from 'three'

import Experience from "../../Experience.js";

import waterVertexShader from './shaders/vertex.glsl'
import waterFragmentShader from './shaders/fragment.glsl'

export default class Water
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene

        this.setGeometry()
        this.setTextures()
        this.setMaterial()
        this.setMesh()
    }
    setGeometry()
    {
        this.geometry = new THREE.PlaneGeometry(2, 2, 128, 128)
    }
    setTextures()
    {

    }
    setMaterial()
    {
        this.material = new THREE.MeshBasicMaterial()
    }
    setMesh()
    {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.rotation.x = -Math.PI * 0.5
        this.scene.add(this.mesh)
    }
}
