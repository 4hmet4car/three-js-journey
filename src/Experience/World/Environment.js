import * as THREE from 'three'
import Experience from "../Experience.js"

export default class Environment
{
    constructor()
    {
        this.experience = new Experience()
        this.resources = this.experience.resources
        this.scene = this.experience.scene

        this.setFloor()
        this.setLights()
    }

    setFloor()
    {
        this.floorTexture = this.resources.items.floorTexture
        this.floorTexture.colorSpace = THREE.SRGBColorSpace

        this.floor = new THREE.Mesh(
            new THREE.PlaneGeometry(10, 10),
            new THREE.MeshStandardMaterial({ map: this.floorTexture })
        )
        this.floor.rotation.x = - Math.PI * 0.5
        this.floor.receiveShadow = true
        this.scene.add(this.floor)
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