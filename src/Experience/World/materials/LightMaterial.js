import * as THREE from 'three'
import Experience from '../../Experience.js'
import lightMaterialVertexShader from '../shaders/lightMaterial/vertex.glsl'
import lightMaterialFragmentShader from '../shaders/lightMaterial/fragment.glsl'
import parameters from '../../parameters.js'

let material = null

export default class LightMaterial
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
            vertexShader: lightMaterialVertexShader,
            fragmentShader: lightMaterialFragmentShader,
            uniforms: {
                uColor: new THREE.Uniform(new THREE.Color(parameters.lightMaterial.color)),
                uAmbientLightColor: new THREE.Uniform(new THREE.Color(parameters.lightMaterial.ambientLightColor)),
                uAmbientLightIntensity: new THREE.Uniform(parameters.lightMaterial.ambientLightIntensity),
            }
        })
    }

    setDebug()
    {
        //Debug
        if (this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder("LightMaterial")

            this.debugFolder
                .addColor(parameters.lightMaterial, 'color')
                .onChange(() =>
                {
                    this.instance.uniforms.uColor.value.set(new THREE.Color(parameters.lightMaterial.color))
                })

            this.ambientLightFolder = this.debugFolder.addFolder("Ambient Light")

            this.ambientLightFolder
                .addColor(parameters.lightMaterial, 'ambientLightColor')
                .onChange(() =>
                {
                    this.instance.uniforms.uAmbientLightColor.value.set(new THREE.Color(parameters.lightMaterial.ambientLightColor))
                })

            this.ambientLightFolder
                .add(parameters.lightMaterial, 'ambientLightIntensity')
                .min(0)
                .max(1)
                .step(0.001)
                .onChange(() =>
                {
                    this.instance.uniforms.uAmbientLightIntensity.value = parameters.lightMaterial.ambientLightIntensity
                })
        }
    }

    update()
    {
        // this.instance.uniforms.uTime.value = this.time.secondsElapsed
    }
}