import Experience from "../Experience.js"
import Environment from "./Environment.js"
import Planet from "./Planet/Planet.js"
import Ring from "./Planet/Ring/Ring.js"

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
            this.planet = new Planet()
            this.ring = new Ring()
            this.environment = new Environment()
        })

        // this.galaxy = new Galaxy()

    }

    update()
    {
        if (this.ring && this.planet)
        {
            this.ring.update()
            this.planet.update()
        }
    }
}