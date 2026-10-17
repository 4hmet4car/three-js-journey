import * as THREE from 'three'
import Experience from "../../Experience.js"
import PointOfInterest from './PointOfInterest.js'

export default class Helmet
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.setHelmet()
        this.setMaterials()
        this.setPoints()
    }

    setHelmet()
    {
        this.helmet = this.resources.items.damagedHelmet.scene
        this.helmet.scale.set(2.5, 2.5, 2.5)
        this.helmet.rotation.y = Math.PI * 0.5
        this.scene.add(this.helmet)
    }

    setMaterials()
    {
        this.helmet.traverse((child) =>
        {
            if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
            {
                child.material.envMapIntensity = 2.5
                child.castShadow = true
                child.receiveShadow = true
                child.material.needsUpdate = true
            }
        })
    }

    setPoints()
    {
        this.point1 = new PointOfInterest()
    }

    update()
    {

    }

}