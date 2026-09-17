import * as THREE from 'three'
import Experience from "../../Experience.js"

import { particlesParameters } from '../../parameters.js'
import particlesFragmentShader from './shaders/fragment.glsl'
import particlesVertexShader from './shaders/vertex.glsl'

export default class Particles
{
    constructor()
    {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.debug = this.experience.debug

        this.setGeometry()
        this.setMaterial()
        this.setPoints()
        this.setDebug()
    }

    setGeometry()
    {
        this.geometry = new THREE.SphereGeometry(3)
    }

    setMaterial()
    {
        this.material = new THREE.ShaderMaterial({
            vertexShader: particlesVertexShader,
            fragmentShader: particlesFragmentShader,
            uniforms:
            {
                uSize: new THREE.Uniform(particlesParameters.particleSize),
                uResolution: new THREE.Uniform(this.sizes.resolution)
            }
        })
    }

    setPoints()
    {
        this.points = new THREE.Points(this.geometry, this.material)
        this.scene.add(this.points)
    }

    setDebug()
    {
        if (this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder("Particles")

            this.debugFolder
                .add(particlesParameters, 'particleSize')
                .min(0)
                .max(1)
                .step(0.001)
                .onChange(() =>
                {
                    this.material.uniforms.uSize.value = particlesParameters.particleSize
                })
        }
    }

    resize()
    {

    }

    update()
    {

    }
}