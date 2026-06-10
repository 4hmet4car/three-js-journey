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
        this.scene = this.experience.scene
        this.camera = this.experience.camera
        this.cursor = this.experience.cursor
        this.debug = this.experience.debug

        this.setDirectionalLightHelper()
        this.setPointLightHelper()
        this.setCursorLightHelper()
        this.setMaterial()
        this.setDebug()
    }

    setDirectionalLightHelper()
    {
        this.directionalLightHelper = new THREE.Mesh(
            new THREE.PlaneGeometry(),
            new THREE.MeshBasicMaterial()
        )
        this.directionalLightHelper.material.color = new THREE.Color(parameters.lightMaterial.directionalLightColor)
        this.directionalLightHelper.material.side = THREE.DoubleSide
        this.directionalLightHelper.position.copy(parameters.lightMaterial.directionalLightPosition)
        this.scene.add(this.directionalLightHelper)
    }

    setPointLightHelper()
    {
        this.pointLightHelper = new THREE.Mesh(
            new THREE.SphereGeometry(0.1, 16, 16),
            new THREE.MeshBasicMaterial()
        )
        this.pointLightHelper.material.color = new THREE.Color(parameters.lightMaterial.pointLightColor)
        this.pointLightHelper.position.copy(parameters.lightMaterial.pointLightPosition)
        this.scene.add(this.pointLightHelper)
    }

    setCursorLightHelper()
    {
        this.cursorLightPosition = new THREE.Vector3(0, 0, parameters.lightMaterial.cursorLightPositionZ)

        this.cursorLightHelper = new THREE.Mesh(
            new THREE.SphereGeometry(0.1, 16, 16),
            new THREE.MeshBasicMaterial()
        )
        this.cursorLightHelper.material.color = new THREE.Color(parameters.lightMaterial.cursorLightColor)
        this.cursorLightHelper.position.copy(this.cursorLightPosition)
        this.scene.add(this.cursorLightHelper)
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
                uDirectionalLightColor: new THREE.Uniform(new THREE.Color(parameters.lightMaterial.directionalLightColor)),
                uDirectionalLightIntensity: new THREE.Uniform(parameters.lightMaterial.directionalLightIntensity),
                uDirectionalLightPosition: new THREE.Uniform(parameters.lightMaterial.directionalLightPosition),
                uDirectionalLightTarget: new THREE.Uniform(parameters.lightMaterial.directionalLightTarget),
                uDirectionalLightSpecularPower: new THREE.Uniform(parameters.lightMaterial.directionalLightSpecularPower),
                uPointLightColor: new THREE.Uniform(new THREE.Color(parameters.lightMaterial.pointLightColor)),
                uPointLightIntensity: new THREE.Uniform(parameters.lightMaterial.pointLightIntensity),
                uPointLightPosition: new THREE.Uniform(parameters.lightMaterial.pointLightPosition),
                uPointLightSpecularPower: new THREE.Uniform(parameters.lightMaterial.pointLightSpecularPower),
                uPointLightDecay: new THREE.Uniform(parameters.lightMaterial.pointLightDecay),
                uCursorLightColor: new THREE.Uniform(new THREE.Color(parameters.lightMaterial.cursorLightColor)),
                uCursorLightPosition: new THREE.Uniform(this.cursorLightPosition),
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
                .max(0.05)
                .step(0.001)
                .onChange(() =>
                {
                    this.instance.uniforms.uAmbientLightIntensity.value = parameters.lightMaterial.ambientLightIntensity
                })

            this.directionalLightFolder = this.debugFolder.addFolder("Directional Light")

            this.directionalLightFolder
                .addColor(parameters.lightMaterial, 'directionalLightColor')
                .onChange(() =>
                {
                    this.instance.uniforms.uDirectionalLightColor.value.set(new THREE.Color(parameters.lightMaterial.directionalLightColor))
                    this.directionalLightHelper.material.color.set(new THREE.Color(parameters.lightMaterial.directionalLightColor))
                })

            this.directionalLightFolder
                .add(parameters.lightMaterial, 'directionalLightIntensity')
                .min(0)
                .max(50)
                .step(0.001)
                .onChange(() =>
                {
                    this.instance.uniforms.uDirectionalLightIntensity.value = parameters.lightMaterial.directionalLightIntensity
                })

            this.directionalLightFolder
                .add(parameters.lightMaterial, 'directionalLightSpecularPower')
                .min(0)
                .max(50)
                .step(0.001)
                .onChange(() =>
                {
                    this.instance.uniforms.uDirectionalLightSpecularPower.value = parameters.lightMaterial.directionalLightSpecularPower
                })

            this.pointLightFolder = this.debugFolder.addFolder("Point Light")

            this.pointLightFolder
                .addColor(parameters.lightMaterial, 'pointLightColor')
                .onChange(() =>
                {
                    this.instance.uniforms.uPointLightColor.value.set(new THREE.Color(parameters.lightMaterial.pointLightColor))
                    this.pointLightHelper.material.color.set(new THREE.Color(parameters.lightMaterial.pointLightColor))
                })

            this.pointLightFolder
                .add(parameters.lightMaterial, 'pointLightIntensity')
                .min(0)
                .max(50)
                .step(0.001)
                .onChange(() =>
                {
                    this.instance.uniforms.uPointLightIntensity.value = parameters.lightMaterial.pointLightIntensity
                })

            this.pointLightFolder
                .add(parameters.lightMaterial, 'pointLightSpecularPower')
                .min(0)
                .max(50)
                .step(0.001)
                .onChange(() =>
                {
                    this.instance.uniforms.uPointLightSpecularPower.value = parameters.lightMaterial.pointLightSpecularPower
                })

            this.pointLightFolder
                .add(parameters.lightMaterial, 'pointLightDecay')
                .min(0)
                .max(1)
                .step(0.001)
                .onChange(() =>
                {
                    this.instance.uniforms.uPointLightDecay.value = parameters.lightMaterial.pointLightDecay
                })

            
            this.cursorLightFolder = this.debugFolder.addFolder("Cursor Light")

            this.cursorLightFolder
                .addColor(parameters.lightMaterial, 'cursorLightColor')
                .onChange(() =>
                {
                    this.instance.uniforms.uCursorLightColor.value.set(new THREE.Color(parameters.lightMaterial.cursorLightColor))
                    this.cursorLightHelper.material.color.set(new THREE.Color(parameters.lightMaterial.cursorLightColor))
                })
        }
    }

    update()
    {
        this.cursorLightPosition.set(this.cursor.position.x, this.cursor.position.y, parameters.lightMaterial.cursorLightPositionZ)
        this.cursorLightPosition.unproject(this.camera.instance)
        this.cursorLightHelper.position.copy(this.cursorLightPosition)
    }
}