import * as THREE from 'three'

export default class Cursor
{
    constructor(sizes)
    {
        this.sizes = sizes

        // Setup
        // If you use vector2 you do not need to update it in another class
        // since it is referenced
        this.position = new THREE.Vector2()
        this.speed = new THREE.Vector2()
        this.lastMoveTime = 0

        // Cursor move event
        window.addEventListener('pointermove', this.pointerMove)
    }

    pointerMove = (_event) =>
    {
        // each event in a callback of a listener has a timestamp value
        // that starts counting from the  initiation of the listener
        // it is natural to use this timestam for event related time
        // calculations
        const now = _event.timeStamp

        const previousX = this.position.x
        const previousY = this.position.y

        this.position.x = (_event.clientX / this.sizes.width) * 2 - 1
        this.position.y = -((_event.clientY / this.sizes.height) * 2 - 1)

        const delta = Math.max(now - this.lastMoveTime, 0.001)

        this.lastMoveTime = now

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