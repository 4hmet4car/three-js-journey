import * as THREE from 'three'
import Experience from '../../Experience.js'
import holographicVertexShader from '../shaders/holographic/vertex.glsl'
import holographicFragmentShader from '../shaders/holographic/fragment.glsl'
import parameters from '../../parameters.js'

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
        this.resources = this.experience.resources
        this.debug = this.experience.debug

        this.setMaterial()
        this.setDebug()
    }

    setMaterial()
    {
        this.material = new THREE.ShaderMaterial({
            side: THREE.DoubleSide,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            vertexShader: holographicVertexShader,
            fragmentShader: holographicFragmentShader,
            uniforms: {
                uTime: new THREE.Uniform(0),
                uPerlinTexture: new THREE.Uniform(this.resources.items.perlinTexture),
                uColor: new THREE.Uniform(new THREE.Color(parameters.holographic.color))
            }
        })
    }

    setDebug()
    {
        //Debug
        if (this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder("Holographic")

            this.debugFolder
                .addColor(parameters.holographic, 'color')
                .onChange(() =>
                {
                    this.material.uniforms.uColor.value.set(new THREE.Color(parameters.holographic.color))
                })
        }
    }

    update()
    {
        this.material.uniforms.uTime.value = this.time.secondsElapsed
    }
}