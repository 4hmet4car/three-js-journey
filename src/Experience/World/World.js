import Experience from "../Experience.js"
import Environment from "./Environment.js"
import Helmet from "./Helmet.js"

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
    }

    init()
    {
        this.environment = new Environment()
        this.helmet = new Helmet()
    }

    resize()
    {
        // if (this.particles)
        // {
        //     this.particles.resize()
        // }
    }

    update()
    {
        // if (this.helmet)
        // {
        //     this.helmet.update()
        // }
    }
}