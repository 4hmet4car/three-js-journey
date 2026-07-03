import Experience from "../Experience.js"
import Halftone from "./Materials/Halftone.js"
import Sphere from "./Sphere.js"
import Suzanne from "./Suzanne.js"
import TorusKnot from "./TorusKnot.js"


export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.resources.on('ready', () =>
        {
            // Setup
            this.halftone = new Halftone()
            this.suzanne = new Suzanne(this.halftone.material)
            this.sphere = new Sphere(this.halftone.material)
            this.torusKnot = new TorusKnot(this.halftone.material)
        })

        this.resources.startLoading()
    }

    resize()
    {
        if (this.suzanne && this.sphere && this.torusKnot && this.halftone)
        {
            this.halftone.resize()
        }
    }

    update()
    {
        if (this.suzanne && this.sphere && this.torusKnot && this.halftone)
        {
            this.halftone.update()
            this.suzanne.update()
            this.sphere.update()
            this.torusKnot.update()
        }
    }
}