import * as THREE from 'three'
import Experience from '../Experience.js'
import Holographic from './materials/Holographic.js'
import { TORUS_KNOT } from '../constants.js'

export default class TorusKnot
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time

        this.setGeometry()
        this.setMaterial()
        this.setMesh()
    }

    setGeometry()
    {
        this.geometry = new THREE.TorusKnotGeometry
            (
                TORUS_KNOT.GEOMETRY.RADIUS,
                TORUS_KNOT.GEOMETRY.TUBE_RADIUS,
                TORUS_KNOT.GEOMETRY.TUBULAR_SEGMENTS,
                TORUS_KNOT.GEOMETRY.RADIAL_SEGMENTS
            )
    }

    setMaterial()
    {
        this.material = new Holographic().material
    }

    setMesh()
    {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.position.x = TORUS_KNOT.MESH.POSITION_X
        this.scene.add(this.mesh)
    }

    update()
    {
        this.mesh.rotation.x = this.time.secondsElapsed * TORUS_KNOT.ANIMATION.ROTATION_SPEED_X
        this.mesh.rotation.y = this.time.secondsElapsed * TORUS_KNOT.ANIMATION.ROTATION_SPEED_Y
    }
}