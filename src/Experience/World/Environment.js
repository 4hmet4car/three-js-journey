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
        this.environmentMap = this.resources.items.aerodynamicsWorkshop
        this.environmentMap.mapping = THREE.EquirectangularReflectionMapping
        this.scene.background = this.environmentMap
        this.scene.backgroundBlurriness = 0.5
        this.scene.environment = this.environmentMap
    }

    setShadowReceiver()
    {
        this.shadowReceiver = new THREE.Mesh(
            new THREE.PlaneGeometry(10, 10, 10),
            new THREE.MeshStandardMaterial({ color: '#aaaaaa' })
        )
        this.shadowReceiver.receiveShadow = true
        this.shadowReceiver.position.x = - 4
        this.shadowReceiver.position.y = - 3
        this.shadowReceiver.position.z = - 4
        this.shadowReceiver.lookAt(new THREE.Vector3(0, 0, 0))
        this.scene.add(this.shadowReceiver)
    }

    setDirectionalLight()
    {
        this.directionalLight = new THREE.DirectionalLight('#ffffff', 4)
        this.directionalLight.position.set(6.25, 3, 4)
        this.directionalLight.castShadow = true
        this.directionalLight.shadow.mapSize.set(1024, 1024)
        this.directionalLight.shadow.camera.near = 0.1
        this.directionalLight.shadow.camera.far = 30
        this.directionalLight.shadow.normalBias = 0.05
        this.directionalLight.shadow.camera.top = 8
        this.directionalLight.shadow.camera.right = 8
        this.directionalLight.shadow.camera.bottom = -8
        this.directionalLight.shadow.camera.left = -8
        this.scene.add(this.directionalLight)
    }
}