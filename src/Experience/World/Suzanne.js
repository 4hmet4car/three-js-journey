import * as THREE from 'three'
import Experience from '../Experience'
import Holographic from './materials/Holographic.js'
import { SUZANNE } from '../constants.js'

export default class Suzanne
{
    constructor()
    {
        this.experience = new Experience()
        this.resources = this.experience.resources
        this.scene = this.experience.scene
        this.time = this.experience.time

        // Setup
        this.resource = this.resources.items.suzanne

        this.setMaterial()
        this.setModel()
    }

    setMaterial()
    {
        this.material = new Holographic().material
    }

    setModel()
    {
        this.model = this.resource.scene
        this.scene.add(this.model)

        this.model.traverse((child) =>
        {
            if (child instanceof THREE.Mesh)
            {
                child.material = this.material
            }
        })
    }

    update()
    {
        this.model.rotation.x = this.time.secondsElapsed * SUZANNE.ANIMATION.ROTATION_SPEED_X
        this.model.rotation.y = this.time.secondsElapsed * SUZANNE.ANIMATION.ROTATION_SPEED_Y
    }
}