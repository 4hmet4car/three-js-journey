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
        this.setShadowReceiver()
        this.setDirectionalLight()
    }

    setEnvironmentMap()
    {
        this.environmentMap = this.resources.items.urbanAlley
        this.environmentMap.mapping = THREE.EquirectangularReflectionMapping
        this.scene.background = this.environmentMap
        this.scene.environment = this.environmentMap
    }

    setShadowReceiver()
    {
        this.shadowReceiver = new THREE.Mesh(
            new THREE.PlaneGeometry(15, 15, 15),
            new THREE.MeshStandardMaterial()
        )
        this.shadowReceiver.receiveShadow = true
        this.shadowReceiver.rotation.y = Math.PI
        this.shadowReceiver.position.y = - 5
        this.shadowReceiver.position.z = 5
        this.scene.add(this.shadowReceiver)
    }

    setDirectionalLight()
    {
        this.directionalLight = new THREE.DirectionalLight('#ffffff', 3)
        this.directionalLight.castShadow = true
        this.directionalLight.shadow.mapSize.set(1024, 1024)
        this.directionalLight.shadow.camera.far = 15
        this.directionalLight.shadow.normalBias = 0.05
        this.directionalLight.position.set(0.25, 2, - 2.25)
        this.scene.add(this.directionalLight)
    }
}