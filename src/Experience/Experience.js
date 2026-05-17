import * as THREE from 'three'

import Debug from './Utils/Debug.js'
import Sizes from "./Utils/Sizes.js"
import Time from "./Utils/Time.js"
import Camera from './Camera.js'
import Renderer from './Renderer.js'
import World from './World/World.js'

let instance = null //Singleton

export default class Experience
{
    constructor(canvas)
    {
        //------Singleton start------
        if (instance)
        {
            return instance
        }

        instance = this
        //------Singleton end------

        //Global access
        window.experience = this

        //Options
        this.canvas = canvas

        //Setup
        this.debug = new Debug()
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.camera = new Camera()
        this.renderer = new Renderer()

        this.world = new World()

        // Sizes resize event
        this.sizes.on('resize', () =>
        {
            this.resize() //It is important to use fat arrows to not to loose the context
        })

        // Time tick event
        this.time.on('tick', () =>
        {
            this.update()
        })
    }

    resize()
    {
        this.camera.resize()
        this.renderer.resize()
    }

    update()
    {
        this.camera.update()
        this.world.update()
        this.renderer.update()
    }

    destroy()
    {
        //Destroy event emitters
        this.sizes.off('resize')
        this.time.off('tick')
        
        //Destroy event listeners
        window.removeEventListener('resize',this.sizes.resize)

        //Traverse the whole scene
        this.scene.traverse((child) =>
        {
            //Test if it'a mesh
            if (child instanceof THREE.Mesh)
            {
                child.geometry.dispose()

                //Loop through the material properties
                for (const key in child.material)
                {
                    const value = child.material[key]

                    //Test if there is a dispose funtion
                    if (value && typeof value.dispose === 'function')
                    {
                        value.dispose()
                    }
                }
            }

            this.camera.controls.dispose()
            this.renderer.instance.dispose()

            if (this.debug.active)
            {
                this.debug.ui.destroy()
            }
        })
    }
}
