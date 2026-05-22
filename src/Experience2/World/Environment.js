import * as THREE from 'three'

import Experience from "../Experience.js"
import parameters from '../parameters.js'

export default class Environment
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.debug = this.experience.debug

        this.setSunLight()
        this.setEnvironmentMap()
        this.setDebug()
    }

    setSunLight()
    {
        if (this.sunLight) {
            this.scene.remove(this.sunLight)
        }

        this.sunLight = new THREE.SpotLight('#ffffff', parameters.environment.sunLightIntensity)
        this.sunLight.angle = Math.PI / 10
        this.sunLight.decay = 3
        this.sunLight.position.set(parameters.environment.sunLightPositionX, parameters.environment.sunLightPositionY, parameters.environment.sunLightPositionZ)
        this.scene.add(this.sunLight)

    }

    setEnvironmentMap()
    {
        this.environmentMap = {}
        this.environmentMap.intensity = parameters.environment.environmentMapIntensity
        this.environmentMap.texture = this.resources.items.milkyWayTexture
        this.environmentMap.texture.mapping = THREE.EquirectangularReflectionMapping
        this.environmentMap.texture.colorSpace = THREE.SRGBColorSpace
        this.environmentMap.texture.minFilter = THREE.NearestFilter
        this.environmentMap.texture.magFilter = THREE.NearestFilter
        
        this.scene.environment = this.environmentMap.texture

        this.scene.background = this.environmentMap.texture
        this.scene.backgroundIntensity = parameters.environment.backgroundTextureIntensity

        this.environmentMap.updateMaterials = () =>
        {
            this.scene.traverse((child) =>
            {
                if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
                {
                    child.material.envMap = this.environmentMap.texture
                    child.material.envMapIntensity = this.environmentMap.intensity
                    child.material.needsUpdate = true
                }
            })
        }

        this.environmentMap.updateMaterials()
    }

    setDebug()
    {
        //Debug
        if (this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('Environment')
            
            this.debugFolder
                .add(parameters.environment, 'environmentMapIntensity')
                .name('envMapIntensity')
                .min(0)
                .max(4)
                .step(0.001)
                .onFinishChange(()=>{
                    this.setEnvironmentMap()
                })

            this.debugFolder
                .add(parameters.environment, 'backgroundTextureIntensity')
                .name('backgroundIntensity')
                .min(0)
                .max(4)
                .step(0.001)
                .onFinishChange(()=>{
                    this.setEnvironmentMap()
                })

            this.debugFolder
                .add(parameters.environment, 'sunLightIntensity')
                .name('SunLightIntesity')
                .min(0)
                .max(500)
                .step(0.001)
                .onChange(()=>{
                    this.setSunLight()
                })

            this.debugFolder
                .add(parameters.environment, 'sunLightPositionX')
                .name('SunLightX')
                .min(-20)
                .max(20)
                .step(0.001)
                .onChange(()=>{
                    this.setSunLight()
                })

            this.debugFolder
                .add(parameters.environment, 'sunLightPositionY')
                .name('SunLightY')
                .min(-20)
                .max(20)
                .step(0.001)
                .onChange(()=>{
                    this.setSunLight()
                })

            this.debugFolder
                .add(parameters.environment, 'sunLightPositionZ')
                .name('SunLightZ')
                .min(-20)
                .max(20)
                .step(0.001)
                .onChange(()=>{
                    this.setSunLight()
                })
        }
    }
}