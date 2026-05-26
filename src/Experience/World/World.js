import Experience from "../Experience.js"
import Coffee from "./Coffee/Coffee.js"

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
            this.coffee = new Coffee()
        })

    }

    update()
    {
        if (this.coffee)
        {
            this.coffee.update()
        }
    }
}