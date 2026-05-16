import * as THREE from 'three'

import Experience from "../../Experience.js";

import pattern25VertexShader from './shaders/vertex.glsl'
import pattern25FragmentShader from './shaders/fragment.glsl'

export default class Pattern25
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
        this.geometry = new THREE.PlaneGeometry(1, 1, 32, 32)
    }
    setTextures()
    {

    }
    setMaterial()
    {
        this.material = new THREE.RawShaderMaterial({
            vertexShader: pattern25VertexShader,
            fragmentShader: pattern25FragmentShader,
            side: THREE.DoubleSide
        })
    }
    setMesh()
    {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.scene.add(this.mesh)
    }
}