import Experience from "../Experience.js"
import LightMaterial from "./materials/LightMaterial.js"
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
            this.lightMaterial = new LightMaterial()
            this.suzanne = new Suzanne(this.lightMaterial.instance)
            this.sphere = new Sphere(this.lightMaterial.instance)
            this.torusKnot = new TorusKnot(this.lightMaterial.instance)
        })

        this.resources.startLoading()
    }

    update()
    {
        if (this.suzanne && this.sphere && this.torusKnot && this.lightMaterial)
        {
            this.lightMaterial.update()
            this.suzanne.update()
            this.sphere.update()
            this.torusKnot.update()
        }
    }
}