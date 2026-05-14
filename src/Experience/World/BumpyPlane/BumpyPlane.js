import * as THREE from 'three'

import Experience from "../../Experience.js";

import bumpyVertexShader from './shaders/vertex.glsl'
import bumpyFragmentShader from './shaders/fragment.glsl'

export default class BumpyPlane
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.setGeometry()
        this.setTextures()
        this.setMaterial()
        this.setMesh()
    }
    setGeometry()
    {
        this.geometry = new THREE.PlaneGeometry(6, 6, 128, 128)

        const count = this.geometry.attributes.position.count //Returns the vertext count
        const randoms = new Float32Array(count)

        for (let i = 0; i < count; i++)
        {
            randoms[i] = Math.random()

        }

        this.geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1))
    }
    setTextures()
    {

    }
    setMaterial()
    {
        this.material = new THREE.RawShaderMaterial({
            vertexShader: bumpyVertexShader,
            fragmentShader: bumpyFragmentShader,
            side: THREE.DoubleSide
        })
    }
    setMesh()
    {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.scene.add(this.mesh)
    }
}