import * as THREE from 'three'
import Experience from "../../Experience.js"

export default class Terrain
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene

        this.setGeometry()
        this.setMaterial()
        this.setMesh()
    }

    setGeometry()
    {

    }

    setMaterial()
    {

    }

    setMesh()
    {
        this.placeholder = new THREE.Mesh(
            new THREE.IcosahedronGeometry(2, 5),
            new THREE.MeshPhysicalMaterial()
        )
        this.scene.add(this.placeholder)
    }

}