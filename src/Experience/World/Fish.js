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
            this.updateTarget()
        })
    }

    setFish()
    {
        this.geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1)
        this.material = new THREE.MeshBasicMaterial()
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.scene.add(this.mesh)

        // Initialize target positions
        this.targetX = 0
        this.targetZ = 0

        // Initialize values for neighbour calculations
        this.meshPosition = new THREE.Vector3()
        this.pointAPosition = new THREE.Vector3()
        this.pointBPosition = new THREE.Vector3()
        this.toA = new THREE.Vector3()
        this.toB = new THREE.Vector3()
        this.normal = new THREE.Vector3()
        this.quaternion = new THREE.Quaternion()
        this.up = new THREE.Vector3(0, 1, 0)
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
        this.updatePositionXZ()
        this.mesh.position.y = this.calculatePositionY(this.mesh.position.x, this.mesh.position.z)
        parameters.fish.position = this.mesh.position
        this.updateRotation()
    }

    updateTarget()
    {
        // Update x and z position using the raycaster
        this.targetX = ((this.rayCursor.intersect[0].uv.x) - 0.5) * RAY_RECEIVER.GEOMETRY.SCALE_X
        this.targetZ = -((this.rayCursor.intersect[0].uv.y) - 0.5) * RAY_RECEIVER.GEOMETRY.SCALE_Z
    }

    updatePositionXZ()
    {
        this.mesh.position.x += (this.targetX - this.mesh.position.x) * parameters.fish.easeFactor
        this.mesh.position.z += (this.targetZ - this.mesh.position.z) * parameters.fish.easeFactor
    }

    calculatePositionY(x, z)
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
        return bigWavesElevation
    }

    updateRotation()
    {
        // Neighbours technique
        const meshPosition = this.mesh.position
        this.pointAPosition.x = meshPosition.x + parameters.fish.neighbourShift
        this.pointAPosition.z = meshPosition.z
        this.pointAPosition.y = this.calculatePositionY(this.pointAPosition.x, this.pointAPosition.z)
        this.pointBPosition.x = meshPosition.x
        this.pointBPosition.z = meshPosition.z - parameters.fish.neighbourShift
        this.pointBPosition.y = this.calculatePositionY(this.pointBPosition.x, this.pointBPosition.z)
        this.toA.subVectors(this.pointAPosition, meshPosition)
        this.toB.subVectors(this.pointBPosition, meshPosition)
        this.normal.crossVectors(this.toA, this.toB)
        this.quaternion.setFromUnitVectors(
            this.up,
            this.normal.normalize()
        )
        this.mesh.quaternion.copy(this.quaternion)
    }
}