/**
 * This class is the main class that creates everything else.
 * This class is found in it's specific folder /src/Experience
 * 
 * 'window.experience' lets you access the experience from the console.
 * 
 * "on(...)" method of "Sizes.js" that extends from "EventEmitter.js"
 * listens to events emitted from the sizes class.
 * 
 * This class is a singleton; that is, it can be instanciated only once
 * and it will return the first instance from that point on. This choice is
 * only helpful for single canvas experiences and should not be utilized 
 * for the experiences with multiple canvases.
 * 
 * For a setup with multiple canvases using the same experiemce file
 * either use the global 'window.experience' in e.g. "Camera.js"
 * or better yet, feed the parameter as such: new Camera(this)
 * You can also create a duplicate of the experience folder e.g. 
 * /src/Experience2 and use a sigleton as a seperate experience for a
 * seperate canvas.
 */

import * as THREE from 'three'

import Sizes from "./Utils/Sizes.js"
import Time from "./Utils/Time.js"
import Camera from './Camera.js'
import Renderer from './Renderer.js'
import World from './World/World.js'
import Resources from './Utils/Resources.js'
import Debug from './Utils/Debug.js'
import sources from './sources.js'

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
        //BE CAREFULL
        //If you have multiple experiences on the same page,
        //the last 'window.experience' overwrites the previous one.
        window.experience = this

        //Options
        this.canvas = canvas

        //Setup
        this.debug = new Debug()
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.resources = new Resources(sources)
        this.camera = new Camera()
        // this.camera = new Camera(this) // Multiple canvases solution
        this.renderer = new Renderer()

        this.world = new World()

        // Sizes resize event
        // on(...) listens to whatever you provide as a parameter and initiates a callback function.
        // Here it listens to 'resize' string
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

            // if (this.debug.active)
            // {
            //     this.debug.ui.destroy()
            // }
        })
    }
}