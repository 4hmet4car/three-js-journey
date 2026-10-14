import * as THREE from 'three'
import Experience from "../Experience.js"
import Overlay from './Overlay.js'

export default class Splash
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time

        this.setOverlay()
    }

    setOverlay()
    {
        this.overlay = new Overlay()
    }

    update()
    {
        if (this.overlay)
        {
            this.overlay.update()
        }
    }

    destroy()
    {

    }
}