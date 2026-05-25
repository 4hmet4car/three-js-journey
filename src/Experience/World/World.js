import Experience from "../Experience.js"
import Environment from "./Environment.js"
import LeePerrySmith from "./LeePerrySmith/LeePerrySmith.js"

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
            this.leePerrySmith = new LeePerrySmith()
        })

    }

    update()
    {
        // if (this.ring && this.planet && this.ringParticles)
        // {
        //     this.ring.update()
        //     this.ringParticles.update()
        //     this.planet.update()
        // }
    }
}