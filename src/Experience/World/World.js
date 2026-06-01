import Experience from "../Experience.js"
import Holographic from "./materials/Holographic.js"
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
            this.holographic = new Holographic()
            this.suzanne = new Suzanne(this.holographic.material)
            this.sphere = new Sphere(this.holographic.material)
            this.torusKnot = new TorusKnot(this.holographic.material)
        })

    }

    update()
    {
        if (this.suzanne && this.sphere && this.torusKnot && this.holographic)
        {
            this.holographic.update()
            this.suzanne.update()
            this.sphere.update()
            this.torusKnot.update()
        }
    }
}