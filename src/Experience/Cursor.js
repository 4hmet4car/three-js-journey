import * as THREE from 'three'
import Experience from "./Experience.js"

export default class Cursor
{
    constructor()
    {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.time = this.experience.time

        // Setup
        // If you use vector2 you do not need to update it in another class
        // since it is referenced
        this.position = new THREE.Vector2()
        this.speed = new THREE.Vector2()

        // Cursor move event
        window.addEventListener('pointermove', this.pointerMove)
    }

    // pointerMove = (_event) =>
    // {
    //     const previousPosition = this.position
    //     this.position = 1 - Math.pow(((2 * _event.clientX) / this.sizes.width - 1) * 20, 2)
    //     // console.log(this.position)
    //     this.speed = Math.abs(this.position - previousPosition)
    //     console.log(this.speed)
    // }

    pointerMove = (_event) =>
    {
        this.lastMoveTime = this.time.elapsed

        const previousX = this.position.x
        const previousY = this.position.y

        this.position.x = (_event.clientX / this.sizes.width) * 2 - 1
        this.position.y = -((_event.clientY / this.sizes.height) * 2 - 1)

        const delta = Math.max(this.time.delta, 0.001)

        this.speed.x = (this.position.x - previousX) / delta
        this.speed.y = (this.position.y - previousY) / delta
    }

    update()
    {
        // Converge the cursor speed to 0, if not the last speed will stay as the
        // current speed indefinetely
        this.speed.x += (0 - this.speed.x) * 0.1
        this.speed.y += (0 - this.speed.y) * 0.1
    }
}