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
 * For a setup with multiple canvases either
 * use the global 'window.experience' in e.g. "Camera.js"
 * or better yet, feed the parameter as such: new Camera(this) 
 */

import * as THREE from 'three'
import Sizes from "./Utils/Sizes.js"
import Time from "./Utils/Time.js"
import Camera from './Camera.js'

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
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.camera = new Camera()
        // this.camera = new Camera(this) // Multiple canvases solution

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
    }

    update()
    {
        this.camera.update()
    }
}