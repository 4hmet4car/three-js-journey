import * as THREE from 'three'
import Experience from "../Experience.js"
import { RAY_RECEIVER } from '../constants.js'
import parameters from '../parameters.js'

export default class Fish
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.rayCursor = this.experience.rayCursor
        this.time = this.experience.time

        this.setFish()
        this.setRayReceiver()
        this.setRayCursor()

        this.rayCursor.on('intersect', () =>
        {
            this.updatePositionXZ()
            this.updateRotation()
        })
    }

    setFish()
    {
        this.geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1)
        this.material = new THREE.MeshBasicMaterial()
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.scene.add(this.mesh)

        // Initialize values for neighbour calculations
        this.meshPosition = new THREE.Vector3()
        this.toA = new THREE.Vector3()
        this.toB = new THREE.Vector3()
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
        this.updatePositionY(this.mesh.position.x, this.mesh.position.z)
    }

    updatePositionXZ()
    {
        // Update x and z position using the raycaster
        this.mesh.position.x = ((this.rayCursor.intersect[0].uv.x) - 0.5) * RAY_RECEIVER.GEOMETRY.SCALE_X
        this.mesh.position.z = -((this.rayCursor.intersect[0].uv.y) - 0.5) * RAY_RECEIVER.GEOMETRY.SCALE_Z
    }

    updatePositionY(x, z)
    {
        // Update y position by implementing the same wave logic as the shader
        const bigWavesFrequencyX = Math.sin(
            x * parameters.water.bigWavesFrequency.x +
            this.time.secondsElapsed * parameters.water.bigWavesSpeed
        )
        const bigWavesFrequencyZ = Math.sin(
            z * parameters.water.bigWavesFrequency.y +
            this.time.secondsElapsed * parameters.water.bigWavesSpeed
        )
        const bigWavesElevation = bigWavesFrequencyX * bigWavesFrequencyZ * parameters.water.bigWavesElevation
        this.mesh.position.y = bigWavesElevation
    }

    updateRotation(x, y, z)
    {
        // Neighbours technique
        this.meshPosition.set(x, y, z)
    }
}