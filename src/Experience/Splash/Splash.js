import * as THREE from 'three'
import Experience from "../Experience.js"
import Overlay from './Overlay.js'
import LoadingBar from './LoadingBar.js'

export default class Splash
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time

        this.setLoadingBar()
        this.setOverlay()
    }

    setLoadingBar()
    {
        this.loadingBar = new LoadingBar()
    }

    setOverlay()
    {
        this.overlay = new Overlay()
    }

    remove()
    {
        this.overlay.finishTime = this.time.secondsElapsed
        this.overlay.canFadeOut = true
        this.loadingBar.collapse()
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