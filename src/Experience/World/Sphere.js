import * as THREE from 'three'
import Experience from '../Experience.js'
import { SPHERE } from '../constants.js'

export default class Sphere
{
    constructor(material)
    {
        this.experience = new Experience()
        this.material = material
        this.scene = this.experience.scene
        this.time = this.experience.time

        this.setGeometry()
        this.setMesh()
    }

    setGeometry()
    {
        this.geometry = new THREE.SphereGeometry()
    }

    setMesh()
    {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.position.x = SPHERE.MESH.POSITION_X
        this.scene.add(this.mesh)
    }

    update()
    {
        this.mesh.rotation.x = this.time.secondsElapsed * SPHERE.ANIMATION.ROTATION_SPEED_X
        this.mesh.rotation.y = this.time.secondsElapsed * SPHERE.ANIMATION.ROTATION_SPEED_Y
    }
}