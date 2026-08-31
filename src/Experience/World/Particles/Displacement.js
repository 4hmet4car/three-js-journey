import * as THREE from 'three'
import Experience from "../../Experience.js"
import { DISPLACEMENT } from "../../constants.js"

export default class Displacement
{
    constructor()
    {
        this.experience = new Experience()
        this.resources = this.experience.resources
        this.rayCursor = this.experience.rayCursor
        this.scene = this.experience.scene

        //Setup
        this.setCanvas()
        this.setContext()
        this.setRayReceiver()
    }

    setCanvas()
    {
        // Initialize canvas
        this.canvas = document.createElement('canvas')
        this.canvas.width = DISPLACEMENT.CANVAS.WIDTH
        this.canvas.height = DISPLACEMENT.CANVAS.HEIGHT

        // Set style
        this.canvas.style.position = DISPLACEMENT.CANVAS.STYLE.POSITION
        this.canvas.style.width = DISPLACEMENT.CANVAS.STYLE.WIDTH
        this.canvas.style.height = DISPLACEMENT.CANVAS.STYLE.HEIGHT
        this.canvas.style.top = DISPLACEMENT.CANVAS.STYLE.TOP
        this.canvas.style.left = DISPLACEMENT.CANVAS.STYLE.LEFT
        this.canvas.style.zIndex = DISPLACEMENT.CANVAS.STYLE.Z_INDEX

        // Add canvas to the document
        document.body.append(this.canvas)
    }

    setContext()
    {
        // Get the 2d context of the canvas to draw a 2d image
        this.context = this.canvas.getContext('2d')

        // Draw a rectangle that fills the canvas
        this.context.fillRect(
            DISPLACEMENT.CANVAS.STYLE.TOP,  // Top-left corner position
            DISPLACEMENT.CANVAS.STYLE.LEFT, // Top-left corner position
            DISPLACEMENT.CANVAS.WIDTH,      // Fill width
            DISPLACEMENT.CANVAS.HEIGHT,     // Fill height
        )

        // Put image in the canvas
        this.context.drawImage(this.resources.items.glowImage, 20, 20, 32, 32)
    }

    setRayReceiver()
    {
        this.rayReceiver = new THREE.Mesh(
            new THREE.PlaneGeometry(
                DISPLACEMENT.RAY_RECEIVER.GEOMETRY.WIDTH,
                DISPLACEMENT.RAY_RECEIVER.GEOMETRY.HEIGHT,
            ),
            new THREE.MeshBasicMaterial({color: 'red'})
        )

        this.scene.add(this.rayReceiver)
    }
}