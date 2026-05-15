import * as THREE from 'three'

import Experience from "../../Experience.js";

import testVertexShader from './shaders/vertex.glsl'
import testFragmentShader from './shaders/fragment.glsl'

export default class Test
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
            vertexShader: testVertexShader,
            fragmentShader: testFragmentShader,
            side: THREE.DoubleSide
        })
    }
    setMesh()
    {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.scene.add(this.mesh)
    }
}