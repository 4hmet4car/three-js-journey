import Experience from "../Experience.js"
import Environment from "./Environment.js"
import Planet from "./Planet/Planet.js"
import Ring from "./Planet/Ring/Ring.js"
import RingParticles from "./Planet/RingParticles/RingParticles.js"

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
            this.ringParticles = new RingParticles()
            this.environment = new Environment()
        })

        // this.galaxy = new Galaxy()

    }

    update()
    {
        if (this.ring && this.planet && this.ringParticles)
        {
            this.ring.update()
            this.ringParticles.update()
            this.planet.update()
        }
    }

    rotate(){
        if (this.ring && this.planet)
        {
            this.ring.rotate()
            this.ringParticles.rotate()
            this.planet.rotate()
        }
    }
}