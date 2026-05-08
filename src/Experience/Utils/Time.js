/**
 * This class holds the current-time, elapsed-time and
 * delta-time values.
 * 
 * This class, extending "EventEmitter.js", triggers an event each frame.
 */

import EventEmitter from "./EventEmitter.js";

export default class Time extends EventEmitter
{
    constructor()
    {
        super()

        // Setup
        this.start = Date.now() //timestamp when the experience starts and throughout the experience stays the same
        this.current = this.start //current timestamp and changes on each frame
        this.elapsed = 0 //how much time was spent since the start of the experience
        this.delta = 16 //how much time was spent since the previous frame, initialized to 16; but updates each frame

        // It is better not to call the "this.tick()" method immediately
        // to not to have "this.delta = 0"
        // This was the program waits one frame before calling the tick method.
        window.requestAnimationFrame(() =>
        {
            this.tick()
        })
    }

    tick()
    {
        const currentTime = Date.now()
        this.delta = currentTime - this.current
        this.current = currentTime
        this.elapsed = this.current - this.start

        this.trigger('tick')

        window.requestAnimationFrame(() =>
        {
            this.tick() //It is important to use fat arrows to not to loose the context
        })
    }
}