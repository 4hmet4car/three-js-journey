import * as THREE from 'three'
import Experience from "../Experience.js"
import constants from '../constants.js'
import parameters from '../parameters.js';

export default class Buoy
{
    constructor()
    {
        this.experience = new Experience()
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.scene = this.experience.scene
        this.debug = this.experience.debug

        //Debug
        if (this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder("Buoy")
        }

        this.resource = this.resources.items.buoyModel

        this.setModel()
    }

    setModel()
    {
        this.model = this.resource.scene
        this.model.scale.set(0.002, 0.002, 0.002)
        this.scene.add(this.model)

        this.model.traverse((child) =>
        {
            if (child instanceof THREE.Mesh)
            {
                const oldMaterial = child.material
                child.material = new THREE.MeshBasicMaterial({
                    color: oldMaterial.color
                })
                oldMaterial.dispose()
            }
        })
    }

    update()
    {
        this.bigWavesFrequencyX = Math.sin(this.model.position.x * constants.PI * parameters.bigWavesFrequencyX + this.time.secondsElapsed * parameters.bigWavesSpeed)
        this.bigWavesFrequencyZ = Math.sin(this.model.position.z * constants.PI * parameters.bigWavesFrequencyZ + this.time.secondsElapsed * parameters.bigWavesSpeed)
        this.bigWavesElevation = this.bigWavesFrequencyX * this.bigWavesFrequencyZ * parameters.bigWavesElevation
        this.model.position.y = this.bigWavesElevation

        // The rotation value is the derivative of the time dependent y function
        // The derivative of "c*sin(a+dx)*sin(b+dx)" is "c*d*sin(a+b+2dx)"
        this.bigWavesElevationDerivative = parameters.bigWavesElevation * parameters.bigWavesSpeed * Math.sin(this.model.position.x * constants.PI * parameters.bigWavesFrequencyX + this.model.position.z * constants.PI * parameters.bigWavesFrequencyZ + 2 * this.time.secondsElapsed * parameters.bigWavesSpeed)
        this.model.rotation.z = this.bigWavesElevationDerivative
        this.model.rotation.x = -this.bigWavesElevationDerivative
    }

}