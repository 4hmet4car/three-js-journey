import * as THREE from 'three'

import Experience from '../../Experience.js'

import halftoneVertexShader from './shaders/halftone/vertex.glsl'
import halftoneFragmentShader from './shaders/halftone/fragment.glsl'

import { materialParameters } from '../../parameters'

export default class Halftone
{
    constructor()
    {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.debug = this.experience.debug

        this.setMaterial()
        this.setDebug()
    }

    setMaterial()
    {
        this.material = new THREE.ShaderMaterial({
            transparent: true,
            vertexShader: halftoneVertexShader,
            fragmentShader: halftoneFragmentShader,
            uniforms:
            {
                uColor: new THREE.Uniform(new THREE.Color(materialParameters.color)),
                uShadeColor: new THREE.Uniform(new THREE.Color(materialParameters.shadeColor)),
                uResolution: new THREE.Uniform(this.sizes.resolution),
                uShadowRepetitions: new THREE.Uniform(materialParameters.shadowRepetitions),
                uShadowColor: new THREE.Uniform(new THREE.Color(materialParameters.shadowColor)),
                uLightRepetitions: new THREE.Uniform(materialParameters.lightRepetitions),
                uLightColor: new THREE.Uniform(new THREE.Color(materialParameters.lightColor)),
            }
        })
    }

    setDebug()
    {
        if (this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder("Halftone")

            this.debugFolder
                .addColor(materialParameters, 'color')
                .onChange(() =>
                {
                    this.material.uniforms.uColor.value.set(new THREE.Color(materialParameters.color))
                })

            this.debugFolder
                .add(materialParameters, 'shadowRepetitions')
                .min(1)
                .max(300)
                .step(1)
                .onChange(() =>
                {
                    this.material.uniforms.uShadowRepetitions.value = materialParameters.shadowRepetitions
                })

            
            this.debugFolder
                .addColor(materialParameters, 'shadowColor')
                .onChange(() =>
                {
                    this.material.uniforms.uShadowColor.value.set(new THREE.Color(materialParameters.shadowColor))
                })

            this.debugFolder
                .add(materialParameters, 'lightRepetitions')
                .min(1)
                .max(300)
                .step(1)
                .onChange(() =>
                {
                    this.material.uniforms.uLightRepetitions.value = materialParameters.lightRepetitions
                })

            
            this.debugFolder
                .addColor(materialParameters, 'lightColor')
                .onChange(() =>
                {
                    this.material.uniforms.uLightColor.value.set(new THREE.Color(materialParameters.lightColor))
                })
        }
    }

    resize()
    {
        this.material.uniforms.uResolution.value.copy(this.sizes.resolution)
    }

    update()
    {

    }
}