import * as THREE from 'three'
import Experience from '../../Experience.js'
import commonmaterialVertexShader from '../shaders/commonMaterial/vertex.glsl'
import commonmaterialFragmentShader from '../shaders/commonMaterial/fragment.glsl'
import parameters from '../../parameters.js'

let material = null

export default class CommonMaterial
{
    constructor()
    {
        if (material)
        {
            return material
        }

        material = this

        this.experience = new Experience()
        this.time = this.experience.time
        this.debug = this.experience.debug

        this.setMaterial()
        this.setDebug()
    }

    setMaterial()
    {
        this.instance = new THREE.ShaderMaterial({
            vertexShader: commonmaterialVertexShader,
            fragmentShader: commonmaterialFragmentShader,
            uniforms: {
                uColor: new THREE.Uniform(new THREE.Color(parameters.commonMaterial.color))
            }
        })
    }

    setDebug()
    {
        //Debug
        if (this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder("CommonMaterial")

            this.debugFolder
                .addColor(parameters.commonMaterial, 'color')
                .onChange(() =>
                {
                    this.instance.uniforms.uColor.value.set(new THREE.Color(parameters.commonMaterial.color))
                })
        }
    }

    update()
    {
        // this.instance.uniforms.uTime.value = this.time.secondsElapsed
    }
}