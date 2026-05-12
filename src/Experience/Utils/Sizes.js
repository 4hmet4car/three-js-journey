/**
 * This class stores the width, height and pixel ratio of the experience.
 * 
 * This class is found in /src/Experience/Utils
 * 
 * In this class; width,height and pixel ratio values are updated
 * when a resize occurs.
 * 
 * This class, extending "EventEmitter.js", triggers events when a resize occurs.
 * Other classes listen to this event for their benefit e.g. updating
 * the camera or updating the renderer.
 * 
 * Event emitter code is written by Bruno Simon.
 * https://gist.github.com/brunosimon/120acda915e6629e3a4d497935b16bdf
 * 
 * "on(...)" method of "EventEmitter.js" listens to event from outside the class.
 * "trigger(...)" method of "EventEmitter.js" triggers those event from inside the class.
 * 
 */

import EventEmitter from "./EventEmitter.js"

export default class Sizes extends EventEmitter
{
    constructor()
    {
        super()

        //Setup
        //This is a full-viewport experience with single canvas
        //If you want to create experiences that are not utilizing the whole
        //viewport, you can either pass the canvas as parameter to the constructor, you can
        //use experience.canvas or use singleton experience class.
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.pixelRatio = Math.min(window.devicePixelRatio, 2)

        //Resize event
        window.addEventListener('resize', this.resize)

    }

    //Resize method
    resize = () =>
    {
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.pixelRatio = Math.min(window.devicePixelRatio, 2)

        // trigger(...) emits whatever you provide as a parameter.
        // Here it emits 'resize' string
        this.trigger('resize')
    }
}