import * as THREE from 'three'
import Experience from "../Experience.js"

export default class Portal
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.setModel()
        this.setTextures()
        this.setMaterials()
    }

    setModel()
    {
        this.portal = this.resources.items.portal
        this.scene.add(this.portal.scene)
    }

    setTextures()
    {
        this.bakedTexture = this.resources.items.bakedTexture
        this.bakedTexture.colorSpace = THREE.SRGBColorSpace
        this.bakedTexture.flipY = false
    }

    setMaterials()
    {
        this.portalLightMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide })
        this.poleLightMaterial = new THREE.MeshBasicMaterial({ color: 0xfff9f9 })
        this.bakedMaterial = new THREE.MeshBasicMaterial({ map: this.bakedTexture })

        this.portal.scene.traverse((child) =>
        {
            if (child.isMesh)
            {
                const lightRegex = /[a-z]+Light(\.[0-9]{1,3})?/
                if (lightRegex.test(child.name))
                {
                    const portalRegex = /portal/
                    if (portalRegex.test(child.name))
                    {
                        child.material = this.portalLightMaterial
                    } else
                    {
                        child.material = this.poleLightMaterial
                    }
                } else
                {
                    child.material = this.bakedMaterial
                }
            }
        })
    }

    setInstance()
    {

    }

    update()
    {

    }

}