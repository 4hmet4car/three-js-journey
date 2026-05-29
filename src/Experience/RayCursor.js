import * as THREE from 'three'
import Experience from "./Experience.js"
import EventEmitter from './Utils/EventEmitter.js'

export default class RayCursor extends EventEmitter
{
    constructor()
    {
        super()

        this.experience = new Experience()
        this.cursor = this.experience.cursor
        this.camera = this.experience.camera

        this.intersectObject = null
        this.witnessVariable = null

        this.raycaster = new THREE.Raycaster()
    }

    update()
    {
        this.raycaster.setFromCamera(this.cursor.position, this.camera.instance)
        if (this.intersectObject)
        {
            this.intersect = this.raycaster.intersectObject(this.intersectObject)
            if (this.intersect.length)
            {
                if (!this.witnessVariable)
                {
                    this.trigger('cursorenter')
                }
                this.witnessVariable = this.intersect
            } else
            {
                if (this.witnessVariable)
                {
                    this.trigger('cursorexit')
                }
                this.witnessVariable = null
            }
        }
        // console.log(this.intersect)
    }
}