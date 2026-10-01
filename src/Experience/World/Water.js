import * as THREE from 'three'
import Experience from "../Experience.js"
import { WATER } from '../constants.js'

export default class Water
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
        this.geometry = new THREE.PlaneGeometry(
            WATER.GEOMETRY.WIDTH,
            WATER.GEOMETRY.HEIGHT,
            WATER.GEOMETRY.WIDTH_SEGMENTS,
            WATER.GEOMETRY.HEIGHT_SEGMENTS,
        )
    }

    setMaterial()
    {
        this.material = new THREE.MeshPhysicalMaterial({
            transmission: WATER.MATERIAL.TRANSMISSION,
            roughness: WATER.MATERIAL.ROUGHNESS,
        })
    }

    setMesh()
    {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.rotation.x = WATER.MESH.ROTATION_X
        this.mesh.position.y = WATER.MESH.POSITION_Y
        this.scene.add(this.mesh)
    }
}