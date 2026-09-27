import Experience from "../Experience.js"
import Environment from "./Environment.js"
import Terrain from "./Terrain/Terrain.js"

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
            this.terrain = new Terrain()
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
        // if (this.gears)
        // {
        //     this.gears.update()
        // }
    }
}