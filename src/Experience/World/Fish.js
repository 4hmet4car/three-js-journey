import * as THREE from 'three'
import Experience from "../Experience.js"
import { RAY_RECEIVER } from '../constants.js'

export default class Fish
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.rayCursor = this.experience.rayCursor

        this.setFish()
        this.setRayReceiver()
        this.setRayCursor()

        this.rayCursor.on('intersect', () =>
        {
            this.updatePosition()
        })
    }

    setFish()
    {
        this.geometry = new THREE.SphereGeometry(0.1)
        this.material = new THREE.MeshBasicMaterial()
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.scene.add(this.mesh)
    }

    setRayReceiver()
    {
        this.rayReceiverGeometry = new THREE.PlaneGeometry(
            RAY_RECEIVER.GEOMETRY.SCALE_X,
            RAY_RECEIVER.GEOMETRY.SCALE_Z,
        )

        this.rayReceiverMaterial = new THREE.MeshBasicMaterial({
            wireframe: RAY_RECEIVER.MATERIAL.WIREFRAME,
            visible: RAY_RECEIVER.MATERIAL.VISIBLE,
        })

        this.rayReceiver = new THREE.Mesh(
            this.rayReceiverGeometry,
            this.rayReceiverMaterial
        )

        this.rayReceiver.rotation.x = RAY_RECEIVER.MESH.ROTATION_X

        this.scene.add(this.rayReceiver)
    }

    setRayCursor()
    {
        this.rayCursor.objectToIntersect = this.rayReceiver
    }

    update()
    {

    }

    updatePosition()
    {
        this.mesh.position.x =  ((this.rayCursor.intersect[0].uv.x) - 0.5) * RAY_RECEIVER.GEOMETRY.SCALE_X
        this.mesh.position.z = -((this.rayCursor.intersect[0].uv.y) - 0.5) * RAY_RECEIVER.GEOMETRY.SCALE_Z
    }
}