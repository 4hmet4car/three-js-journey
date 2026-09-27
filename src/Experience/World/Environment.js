import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Environment
{
    constructor()
    {
        this.experience = new Experience()
        this.resources = this.experience.resources
        this.scene = this.experience.scene

        this.setEnvironmentMap()
        this.setDirectionalLight()
    }

    setEnvironmentMap()
    {
        this.environmentMap = this.resources.items.spruitSunrise
        this.environmentMap.mapping = THREE.EquirectangularReflectionMapping
        this.scene.background = this.environmentMap
        this.scene.backgroundBlurriness = 0.5
        this.scene.environment = this.environmentMap
    }

    setDirectionalLight()
    {
        this.directionalLight = new THREE.DirectionalLight('#ffffff', 2)
        this.directionalLight.position.set(6.25, 3, 4)
        this.directionalLight.castShadow = true
        this.directionalLight.shadow.mapSize.set(1024, 1024)
        this.directionalLight.shadow.camera.near = 0.1
        this.directionalLight.shadow.camera.far = 30
        this.directionalLight.shadow.camera.top = 8
        this.directionalLight.shadow.camera.right = 8
        this.directionalLight.shadow.camera.bottom = -8
        this.directionalLight.shadow.camera.left = -8
        this.scene.add(this.directionalLight)
    }
}