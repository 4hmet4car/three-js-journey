import * as THREE from 'three'
import Experience from "./Experience.js"

export default class Cursor
{
    constructor()
    {
        this.experience = new Experience()
        this.sizes = this.experience.sizes

        // Setup
        // this.position = new THREE.Vector2()
        this.position = 0
        this.speed = 0

        // Cursor move event
        window.addEventListener('pointermove', this.pointerMove)
    }

    pointerMove = (_event) =>
    {
        const previousPosition = this.position
        this.position = 1 - Math.pow(((2 * _event.clientX) / this.sizes.width - 1),2)
        this.speed = this.position - previousPosition
    }

    // pointerMove = (_event) =>
    // {
    //     this.position.x = (_event.clientX / this.sizes.width) * 2 - 1
    //     this.position.y = -((_event.clientY / this.sizes.height) * 2 - 1)
    // }
}