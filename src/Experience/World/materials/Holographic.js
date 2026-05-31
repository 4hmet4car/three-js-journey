import * as THREE from 'three'
import Experience from '../../Experience.js'
import holographicVertexShader from '../shaders/holographic/vertex.glsl'
import holographicFragmentShader from '../shaders/holographic/fragment.glsl'

let instance = null

export default class Holographic
{
    constructor()
    {
        if (instance)
        {
            return instance
        }

        instance = this

        this.experience = new Experience()
        this.time = this.experience.time

        this.setMaterial()
    }

    setMaterial()
    {
        this.material = new THREE.ShaderMaterial({
            transparent: true,
            vertexShader: holographicVertexShader,
            fragmentShader: holographicFragmentShader,
            uniforms: {
                uTime: new THREE.Uniform(0),
            }
        })
    }

    update()
    {
        this.material.uniforms.uTime.value = this.time.secondsElapsed
    }
}