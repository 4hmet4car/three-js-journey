import * as THREE from 'three'
import Experience from '../Experience.js'
import { TORUS_KNOT } from '../constants.js'

export default class TorusKnot
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
        this.geometry = new THREE.TorusKnotGeometry
            (
                TORUS_KNOT.GEOMETRY.RADIUS,
                TORUS_KNOT.GEOMETRY.TUBE_RADIUS,
                TORUS_KNOT.GEOMETRY.TUBULAR_SEGMENTS,
                TORUS_KNOT.GEOMETRY.RADIAL_SEGMENTS
            )
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