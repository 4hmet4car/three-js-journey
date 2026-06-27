import * as THREE from 'three'
import Experience from "../Experience.js"
import { RAY_RECEIVER } from '../constants.js'
import parameters from '../parameters.js'

import lightVertexShader from './shaders/buoy/light/vertex.glsl'
import lightFragmentShader from './shaders/buoy/light/fragment.glsl'

import sticksVertexShader from './shaders/buoy/sticks/vertex.glsl'
import sticksFragmentShader from './shaders/buoy/sticks/fragment.glsl'

import bottomVertexShader from './shaders/buoy/bottom/vertex.glsl'
import bottomFragmentShader from './shaders/buoy/bottom/fragment.glsl'

export default class Buoy
{
    constructor()
    {
        this.experience = new Experience()
        this.resource = this.experience.resources.items.buoyModel
        this.scene = this.experience.scene
        this.rayCursor = this.experience.rayCursor
        this.time = this.experience.time

        this.setMaterials()
        this.setBuoy()
        this.setRayReceiver()
        this.setRayCursor()

        this.rayCursor.on('intersect', () =>
        {
            this.updateTarget()
        })
    }

    setMaterials()
    {
        this.buoyLightMaterial = new THREE.ShaderMaterial({
            vertexShader: lightVertexShader,
            fragmentShader: lightFragmentShader,
            uniforms:
            {
                uBuoyLightColor: new THREE.Uniform(parameters.buoy.lightColor)
            }
        })
        this.buoySticksMaterial = new THREE.ShaderMaterial({
            vertexShader: sticksVertexShader,
            fragmentShader: sticksFragmentShader,
            uniforms:
            {
                uBuoySticksColor: new THREE.Uniform(parameters.buoy.sticksColor),
                uBuoyLightColor: new THREE.Uniform(parameters.buoy.lightColor),
                uBuoyLightPosition: new THREE.Uniform(parameters.buoy.position),
            }
        })
        this.buoyBottomMaterial = new THREE.ShaderMaterial({
            vertexShader: bottomVertexShader,
            fragmentShader: bottomFragmentShader,
            uniforms:
            {
                uBuoyBottomColor: new THREE.Uniform(parameters.buoy.bottomColor)
            }
        })
    }

    setBuoy()
    {
        this.model = this.resource.scene.children[0].children[0].children[0]
        this.model.scale.set(0.002, 0.002, 0.002)
        this.scene.add(this.model)

        this.model.traverse((child) =>
        {
            if (child instanceof THREE.Mesh)
            {
                child.material.dispose()
                if (child.name === 'Sphere001_Material_#25_0')
                {
                    child.material = this.buoyLightMaterial
                } else if (child.name === 'Color_A_Material_#25_0')
                {
                    child.material = this.buoyBottomMaterial
                } else
                {
                    child.material = this.buoySticksMaterial
                }
            }
        })

        // Initialize target positions
        this.targetX = 0
        this.targetZ = 0

        // Initialize values for neighbour calculations
        this.modelPosition = new THREE.Vector3()
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
        this.rayReceiverGeometry = new THREE.CircleGeometry(
            RAY_RECEIVER.GEOMETRY.RADIUS,
            RAY_RECEIVER.GEOMETRY.SEGMENTS,
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
        this.model.position.y = this.calculatePositionY(this.model.position.x, this.model.position.z)
        parameters.buoy.position = this.model.position
        this.updateRotation()
    }

    updateTarget()
    {
        // Update x and z position using the raycaster
        this.targetX = this.rayCursor.intersect[0].point.x
        this.targetZ = this.rayCursor.intersect[0].point.z
    }

    updatePositionXZ()
    {
        this.model.position.x += (this.targetX - this.model.position.x) * parameters.buoy.easeFactor
        this.model.position.z += (this.targetZ - this.model.position.z) * parameters.buoy.easeFactor
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
        // console.log(bigWavesElevation)
        return bigWavesElevation - parameters.buoy.elevationOffset
    }

    updateRotation()
    {
        // Neighbours technique
        const meshPosition = this.model.position
        this.pointAPosition.x = meshPosition.x + parameters.buoy.neighbourShift
        this.pointAPosition.z = meshPosition.z
        this.pointAPosition.y = this.calculatePositionY(this.pointAPosition.x, this.pointAPosition.z)
        this.pointBPosition.x = meshPosition.x
        this.pointBPosition.z = meshPosition.z - parameters.buoy.neighbourShift
        this.pointBPosition.y = this.calculatePositionY(this.pointBPosition.x, this.pointBPosition.z)
        this.toA.subVectors(this.pointAPosition, meshPosition)
        this.toB.subVectors(this.pointBPosition, meshPosition)
        this.normal.crossVectors(this.toA, this.toB)
        this.quaternion.setFromUnitVectors(
            this.up,
            this.normal.normalize()
        )
        this.model.quaternion.copy(this.quaternion)
    }
}