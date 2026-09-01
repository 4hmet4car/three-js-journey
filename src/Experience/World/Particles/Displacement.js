import * as THREE from 'three'
import Experience from "../../Experience.js"
import { DISPLACEMENT } from "../../constants.js"

export default class Displacement
{
    constructor()
    {
        this.experience = new Experience()
        this.resources = this.experience.resources
        this.cursor = this.experience.cursor
        this.rayCursor = this.experience.rayCursor
        this.scene = this.experience.scene

        //Setup
        this.setCanvas()
        this.setContext()
        this.setRayReceiver()
        this.setCanvasCursor()
        this.setDisplacementTexture()
    }

    setCanvas()
    {
        // Initialize canvas
        this.canvas = document.createElement('canvas')
        this.canvas.width = DISPLACEMENT.CANVAS.WIDTH
        this.canvas.height = DISPLACEMENT.CANVAS.HEIGHT

        // // Set style
        // this.canvas.style.position = DISPLACEMENT.CANVAS.STYLE.POSITION
        // this.canvas.style.width = DISPLACEMENT.CANVAS.STYLE.WIDTH
        // this.canvas.style.height = DISPLACEMENT.CANVAS.STYLE.HEIGHT
        // this.canvas.style.top = DISPLACEMENT.CANVAS.STYLE.TOP
        // this.canvas.style.left = DISPLACEMENT.CANVAS.STYLE.LEFT
        // this.canvas.style.zIndex = DISPLACEMENT.CANVAS.STYLE.Z_INDEX

        // // Add canvas to the document
        // document.body.append(this.canvas)
    }

    setContext()
    {
        // Get the 2d context of the canvas to draw a 2d image
        this.context = this.canvas.getContext('2d')

        // Draw a rectangle that fills the canvas(it is going to be the background)
        this.context.fillRect(
            DISPLACEMENT.CANVAS.STYLE.TOP,  // Top-left corner position
            DISPLACEMENT.CANVAS.STYLE.LEFT, // Top-left corner position
            DISPLACEMENT.CANVAS.WIDTH,      // Fill width
            DISPLACEMENT.CANVAS.HEIGHT,     // Fill height
        )
    }

    setRayReceiver()
    {
        this.rayReceiver = new THREE.Mesh(
            new THREE.PlaneGeometry(
                DISPLACEMENT.RAY_RECEIVER.GEOMETRY.WIDTH,
                DISPLACEMENT.RAY_RECEIVER.GEOMETRY.HEIGHT,
            ),
            new THREE.MeshBasicMaterial({ color: 'red', side: THREE.DoubleSide })
        )
        this.rayReceiver.visible = false
        this.scene.add(this.rayReceiver)

        this.rayCursor.objectToIntersect = this.rayReceiver
    }

    setCanvasCursor()
    {
        this.canvasCursor = new THREE.Vector2(9999, 9999)

        this.rayCursor.on('intersect', () =>
        {
            const uv = this.rayCursor.intersect[0].uv

            this.canvasCursor.x = uv.x * this.canvas.width
            this.canvasCursor.y = (1 - uv.y) * this.canvas.height
        })

        this.canvasCursorSize = this.canvas.width * DISPLACEMENT.CANVAS_CURSOR.CANVAS_SIZE_MULTIPLIER
    }

    drawCanvasCursor()
    {
        // Draw a rectangle on the bottom to it refreshes the canvas
        // this is like processing, the thing you write before
        // effects the thing right after
        this.context.globalCompositeOperation = 'source-over'
        this.context.globalAlpha = 0.02
        this.context.fillRect(
            DISPLACEMENT.CANVAS.STYLE.TOP,  // Top-left corner position
            DISPLACEMENT.CANVAS.STYLE.LEFT, // Top-left corner position
            DISPLACEMENT.CANVAS.WIDTH,      // Fill width
            DISPLACEMENT.CANVAS.HEIGHT,     // Fill height
        )
        // Blend the glow image
        this.context.globalCompositeOperation = 'lighten'
        this.context.globalAlpha = Math.min(this.cursor.speed * 10, 1)
        this.context.drawImage(
            this.resources.items.glowImage,                    //image to draw
            this.canvasCursor.x - this.canvasCursorSize / 2,   //position x
            this.canvasCursor.y - this.canvasCursorSize / 2,   //position y
            this.canvasCursorSize,                             //size x
            this.canvasCursorSize                              //size y
        )
    }

    setDisplacementTexture()
    {
        this.texture = new THREE.CanvasTexture(this.canvas)
    }

    update()
    {
        this.drawCanvasCursor()
        this.texture.needsUpdate = true
    }
}