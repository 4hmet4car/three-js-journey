import { DISPLACEMENT } from "../../constants.js"
import Experience from "../../Experience.js"

export default class Displacement
{
    constructor()
    {
        this.experience = new Experience()

        //Setup
        this.setCanvas()
        this.setCanvasContext()
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

    setCanvasContext()
    {
        this.context = this.canvas.getContext('2d')
    }
}