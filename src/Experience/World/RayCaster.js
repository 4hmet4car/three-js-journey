import * as THREE from 'three'
import EventEmitter from '../Utils/EventEmitter.js'
import Experience from '../Experience.js'

import parameters from '../parameters.js'
import constants from '../constants.js'

export default class RayCaster extends EventEmitter
{
    constructor()
    {
        super()

        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.camera = this.experience.camera

        this.setRayCaster()
    }

    setRayCaster()
    {
        this.instance = new THREE.Raycaster()

        // console.log(this.objectsToIntersect)
    }

    setIntersect(objectToIntersect)
    {
        this.objectToIntersect = objectToIntersect

        this.mouse = new THREE.Vector2()

        window.addEventListener('pointermove', (event) =>
        {
            this.mouse.x = (event.clientX / this.sizes.width) * 2 - 1
            this.mouse.y = -((event.clientY / this.sizes.height) * 2 - 1)
            this.instance.setFromCamera(this.mouse, this.camera.instance)
            this.intersect = this.instance.intersectObject(this.objectToIntersect)

            if (this.intersect) {
                this.trigger('raycast')
            }
        })
    }

    update()
    {

    }
}