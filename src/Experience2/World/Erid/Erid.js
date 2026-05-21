import * as THREE from 'three'
import Experience from "../../Experience.js"
import parameters from '../../parameters.js'

export default class Erid
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
        this.geometry = new THREE.SphereGeometry(1, 64, 64)
    }

    setMaterial()
    {
        this.eridTexture = this.resources.items.eridTexture
        this.eridTexture.colorSpace = THREE.SRGBColorSpace
        this.eridTexture.minFilter = THREE.LinearFilter
        this.eridTexture.magFilter = THREE.LinearFilter
        this.material = new THREE.MeshStandardMaterial({
            map: this.eridTexture,
        })
    }

    setMesh()
    {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.rotation.x = parameters.erid.rotationX
        this.mesh.rotation.y = parameters.erid.rotationY
        this.mesh.rotation.z = parameters.erid.rotationZ
        this.scene.add(this.mesh)
    }

    setDebug()
    {
        if (this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('erid')

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