import * as THREE from 'three'
import Experience from "../../Experience.js"
import { GEARS } from '../../constants.js'
import { gearsParameters } from '../../parameters.js'

export default class Gears
{
    constructor()
    {
        this.experience = new Experience()

        this.scene = this.experience.scene
        this.debug = this.experience.debug
        this.time = this.experience.time

        this.setGeometry()
        this.setMaterial()
        this.setMesh()
        this.setDebug()
    }

    setGeometry()
    {
        this.geometry = new THREE.IcosahedronGeometry(
            GEARS.GEOMETRY.RADIUS,
            GEARS.GEOMETRY.DETAIL_NUMBER
        )
    }

    setMaterial()
    {
        this.material = new THREE.MeshStandardMaterial({
            metalness: gearsParameters.material.metalness,
            roughness: gearsParameters.material.roughness,
            envMapIntensity: gearsParameters.material.envMapIntensity,
            color: gearsParameters.material.color,
        })
    }

    setMesh()
    {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.scene.add(this.mesh)
    }

    setDebug()
    {

    }
}