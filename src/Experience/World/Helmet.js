import * as THREE from 'three'
import Experience from "../Experience.js"

export default class Helmet
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.setHelmet()
        this.setMaterials()
    }

    setHelmet()
    {
        this.helmet = this.resources.items.flightHelmet.scene
        this.helmet.scale.set(10, 10, 10)
        this.helmet.position.set(0, - 4, 0)
        this.helmet.rotation.y = Math.PI * 0.5
        this.scene.add(this.helmet)
    }

    setMaterials()
    {
        this.helmet.traverse((child) =>
        {
            if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
            {
                // child.material.envMap = environmentMap
                child.material.envMapIntensity = 2.5
                child.material.needsUpdate = true
                child.castShadow = true
                child.receiveShadow = true
            }
        })
    }

    update()
    {

    }

}