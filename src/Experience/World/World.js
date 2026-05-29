import Experience from "../Experience.js"
import LeePerrySmoke from "./LeePerrySmoke.js"
import Smoke from "./Smoke.js"

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
            this.smoke = new Smoke()
            this.leePerrySmoke = new LeePerrySmoke()
        })

    }

    update()
    {
        if (this.leePerrySmoke && this.smoke)
        {
            this.smoke.update()
            this.leePerrySmoke.update()
        }
    }
}