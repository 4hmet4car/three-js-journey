import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Environment
{
    constructor()
    {
        this.experience = new Experience()
        this.resources = this.experience.resources
        this.scene = this.experience.scene

        // this.setEnvironmentMap()
        this.setDirectionalLight()
    }

    setEnvironmentMap()
    {
        this.environmentMap = this.resources.items.environmentMapTexture
        this.scene.background = this.environmentMap
        this.scene.environment = this.environmentMap
    }

    setDirectionalLight()
    {
        this.directionalLight = new THREE.DirectionalLight('#ffffff', 3)
        this.directionalLight.castShadow = true
        this.directionalLight.shadow.mapSize.set(1024, 1024)
        this.directionalLight.shadow.camera.far = 15
        this.directionalLight.shadow.normalBias = 0.05
        this.directionalLight.position.set(0.25, 3, 2.25)
        this.scene.add(this.directionalLight)
    }
}