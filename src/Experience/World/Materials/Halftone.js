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
        this.setMaterial()
    }

    setMaterial()
    {
        this.material = new THREE.ShaderMaterial({
            vertexShader: halftoneVertexShader,
            fragmentShader: halftoneFragmentShader,
            uniforms:
            {
                uColor: new THREE.Uniform(new THREE.Color(materialParameters.color)),
                uShadeColor: new THREE.Uniform(new THREE.Color(materialParameters.shadeColor)),
            }
        })
    }
}