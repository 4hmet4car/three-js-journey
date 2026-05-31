import Experience from "../Experience.js"
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
            this.suzanne = new Suzanne()
            this.sphere = new Sphere()
            this.torusKnot = new TorusKnot()
        })

    }

    update()
    {
        if (this.suzanne && this.sphere && this.torusKnot)
        {
            this.suzanne.update()
            this.sphere.update()
            this.torusKnot.update()
        }
    }
}