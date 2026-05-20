import * as THREE from 'three'
import Experience from "../Experience.js"
import constants from '../constants.js'
import parameters from '../parameters.js'
import RayCaster from './RayCaster.js'

export default class Buoy
{
    constructor()
    {
        this.experience = new Experience()
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.scene = this.experience.scene
        this.rayCaster = this.experience.rayCaster

        this.resource = this.resources.items.buoyModel

        this.setModel()

        // RayCaster raycast event
        this.rayCaster.on('raycast', () =>
        {
            this.updatePosition()
        })
    }

    setModel()
    {
        this.model = this.resource.scene
        this.model.scale.set(0.002, 0.002, 0.002)
        this.model.position.x = parameters.buoyPositionX
        this.model.position.z = parameters.buoyPositionZ
        this.scene.add(this.model)

        this.model.traverse((child) =>
        {
            if (child instanceof THREE.Mesh)
            {
                const oldMaterial = child.material
                child.material = new THREE.MeshToonMaterial({
                    color: oldMaterial.color
                })
                oldMaterial.dispose()
            }
        })
    }

    update()
    {
        this.bigWavesFrequencyX = Math.sin(parameters.buoyPositionX * constants.PI * parameters.bigWavesFrequencyX + this.time.secondsElapsed * parameters.bigWavesSpeed)
        this.bigWavesFrequencyZ = Math.sin(parameters.buoyPositionZ * constants.PI * parameters.bigWavesFrequencyZ + this.time.secondsElapsed * parameters.bigWavesSpeed)
        this.bigWavesElevation = this.bigWavesFrequencyX * this.bigWavesFrequencyZ * parameters.bigWavesElevation
        this.model.position.y = this.bigWavesElevation - 0.01

        // The rotation value is the derivative of the time dependent y function
        // The derivative of "c*sin(a+dx)*sin(b+dx)" is "c*d*sin(a+b+2dx)"
        this.bigWavesElevationDerivative = parameters.bigWavesElevation * parameters.bigWavesSpeed * Math.sin(parameters.buoyPositionX * constants.PI * parameters.bigWavesFrequencyX + parameters.buoyPositionZ * constants.PI * parameters.bigWavesFrequencyZ + 2 * this.time.secondsElapsed * parameters.bigWavesSpeed)
        this.model.rotation.z = this.bigWavesElevationDerivative * parameters.bigWavesFrequencyX
        this.model.rotation.x = -this.bigWavesElevationDerivative * parameters.bigWavesFrequencyZ

        parameters.buoyPositionY = this.model.position.y
    }

    updatePosition()
    {
        parameters.buoyPositionX = ((this.rayCaster.intersect[0].uv.x) - 0.5) * constants.RAYRECEIVER_SCALE_X
        parameters.buoyPositionZ = ((-this.rayCaster.intersect[0].uv.y) + 0.5) * constants.RAYRECEIVER_SCALE_Z
        this.model.position.x = parameters.buoyPositionX
        this.model.position.z = parameters.buoyPositionZ
    }

}