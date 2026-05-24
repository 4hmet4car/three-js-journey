import * as THREE from 'three'
import Experience from "../../Experience.js"
import parameters from '../../parameters.js'
import { PLANET } from '../../constants.js'

export default class Planet
{
    constructor()
    {
        this.experience = new Experience()
        this.resources = this.experience.resources
        this.scene = this.experience.scene
        this.debug = this.experience.debug

        this.setGeometry()
        this.setMaterial()
        this.setMesh()
        this.setDebug()
    }

    setGeometry()
    {
        this.geometry = new THREE.SphereGeometry(PLANET.RADIUS, 64, 64)
    }

    setMaterial()
    {
        this.planetTexture = this.resources.items.planetTexture
        this.planetTexture.colorSpace = THREE.SRGBColorSpace
        this.planetTexture.minFilter = THREE.LinearFilter
        this.planetTexture.magFilter = THREE.LinearFilter
        this.material = new THREE.MeshStandardMaterial({
            map: this.planetTexture,
        })
    }

    setMesh()
    {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.rotation.x = parameters.planet.rotationX
        this.mesh.rotation.y = parameters.planet.rotationY
        this.mesh.rotation.z = parameters.planet.rotationZ
        this.scene.add(this.mesh)
    }

    setDebug()
    {
        if (this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('Planet')

            this.debugFolder
                .add(this.mesh.rotation, 'x')
                .name('rotationX')
                .min(-4)
                .max(4)
                .step(0.001)

            this.debugFolder
                .add(this.mesh.rotation, 'y')
                .name('rotationY')
                .min(-4)
                .max(4)
                .step(0.001)

            this.debugFolder
                .add(this.mesh.rotation, 'z')
                .name('rotationZ')
                .min(-4)
                .max(4)
                .step(0.001)
        }
    }

}