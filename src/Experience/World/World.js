import Experience from "../Experience.js"
import Coffee from "./Coffee.js"
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
            this.coffee = new Coffee()
        })

    }

    update()
    {
        if (this.coffee && this.smoke)
        {
            this.smoke.update()
            this.coffee.update()
        }
    }
}