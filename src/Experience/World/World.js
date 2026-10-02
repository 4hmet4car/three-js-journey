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

        this.resources.on('ready', () =>
        {
            // Setup
            this.environment = new Environment()
            this.helmet = new Helmet()
        })

        this.resources.startLoading()
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
        // if (this.terrain)
        // {
        //     this.terrain.update()
        // }
    }
}