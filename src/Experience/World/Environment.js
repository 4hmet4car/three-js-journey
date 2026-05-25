import * as THREE from 'three'

import Experience from "../Experience.js"
import parameters from '../parameters.js'
import { DIRECTIONAL_LIGHT } from '../constants.js'

export default class Environment
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.debug = this.experience.debug

        this.setEnvironmentMap()
        this.setDirectionalLight()
        this.setDebug()
    }

    setDirectionalLight()
    {
        if (this.directionalLight) {
            this.scene.remove(this.directionalLight)
        }

        this.directionalLight = new THREE.DirectionalLight('#ffffff', parameters.environment.directionalLight.intensity)
        this.directionalLight.castShadow = true
        this.directionalLight.shadow.mapSize.set(DIRECTIONAL_LIGHT.SHADOW_MAP_SIZE, DIRECTIONAL_LIGHT.SHADOW_MAP_SIZE)
        this.directionalLight.shadow.camera.far = DIRECTIONAL_LIGHT.SHADOW_FAR
        this.directionalLight.shadow.normalBias = DIRECTIONAL_LIGHT.SHADOW_NORMAL_BIAS
        this.directionalLight.position.set(DIRECTIONAL_LIGHT.POSITION_X, DIRECTIONAL_LIGHT.POSITION_Y, DIRECTIONAL_LIGHT.POSITION_Z)
        this.scene.add(this.directionalLight)

    }

    setEnvironmentMap()
    {
        this.environmentMap = {}
        this.environmentMap.texture = this.resources.items.environmentMapTexture
        
        this.scene.background = this.environmentMap.texture
        this.scene.backgroundIntensity = parameters.environment.environmentMap.backgroundTextureIntensity
        
        this.scene.environment = this.environmentMap.texture
        this.environmentMap.intensity = parameters.environment.environmentMap.intensity


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
                .add(parameters.environment.environmentMap, 'intensity')
                .name('envMapIntensity')
                .min(0)
                .max(4)
                .step(0.001)
                .onFinishChange(()=>{
                    this.setEnvironmentMap()
                })

            this.debugFolder
                .add(parameters.environment.environmentMap, 'backgroundTextureIntensity')
                .name('backgroundIntensity')
                .min(0)
                .max(4)
                .step(0.001)
                .onFinishChange(()=>{
                    this.setEnvironmentMap()
                })

            this.debugFolder
                .add(parameters.environment.directionalLight, 'intensity')
                .name('DirectionalLightIntesity')
                .min(0)
                .max(500)
                .step(0.001)
                .onChange(()=>{
                    this.setDirectionalLight()
                })

            this.debugFolder
                .add(parameters.environment.directionalLight, 'positionX')
                .name('DirectionalLightX')
                .min(-20)
                .max(20)
                .step(0.001)
                .onChange(()=>{
                    this.setDirectionalLight()
                })

            this.debugFolder
                .add(parameters.environment.directionalLight, 'positionY')
                .name('DirectionalLightY')
                .min(-20)
                .max(20)
                .step(0.001)
                .onChange(()=>{
                    this.setDirectionalLight()
                })

            this.debugFolder
                .add(parameters.environment.directionalLight, 'positionZ')
                .name('DirectionalLightZ')
                .min(-20)
                .max(20)
                .step(0.001)
                .onChange(()=>{
                    this.setDirectionalLight()
                })
        }
    }
}