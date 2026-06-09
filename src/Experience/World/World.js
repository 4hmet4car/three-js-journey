import Experience from "../Experience.js"
import CommonMaterial from "./materials/CommonMaterial.js"
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
            this.commonmaterial = new CommonMaterial()
            this.suzanne = new Suzanne(this.commonmaterial.instance)
            this.sphere = new Sphere(this.commonmaterial.instance)
            this.torusKnot = new TorusKnot(this.commonmaterial.instance)
        })

    }

    update()
    {
        if (this.suzanne && this.sphere && this.torusKnot && this.commonmaterial)
        {
            // this.commonmaterial.update()
            this.suzanne.update()
            this.sphere.update()
            this.torusKnot.update()
        }
    }
}