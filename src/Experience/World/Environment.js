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
        this.setLights()
    }

    setEnvironmentMap()
    {
        this.environmentMap = this.resources.items.environmentMapTexture
        this.environmentMap.colorSpace = THREE.SRGBColorSpace
        this.scene.background = this.environmentMap
        this.scene.environment = this.environmentMap
    }

    setLights()
    {
        this.directionalLight = new THREE.DirectionalLight(0xffffff, 4.5)
        this.directionalLight.castShadow = true
        this.directionalLight.position.set(2, 0.75, -1).normalize().multiplyScalar(10)
        this.directionalLight.shadow.camera.top = 10
        this.directionalLight.shadow.camera.right = 10
        this.directionalLight.shadow.camera.bottom = -10
        this.directionalLight.shadow.camera.left = -10
        this.directionalLight.shadow.camera.near = 0.01
        this.directionalLight.shadow.camera.far = 20
        this.directionalLight.shadow.radius = 3
        this.directionalLight.shadow.normalBias = 0.1
        this.scene.add(this.directionalLight)

        this.ambientLight = new THREE.AmbientLight(0x859dff, 1)
        this.scene.add(this.ambientLight)
    }
}