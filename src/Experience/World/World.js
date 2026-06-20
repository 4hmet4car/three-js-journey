import Experience from "../Experience.js"
import Water from "./Water/Water.js"
import Fish from "./Fish.js"

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
            this.water = new Water()
            this.fish = new Fish()
        })

        this.resources.startLoading()
    }

    update()
    {
        if (this.water && this.fish)
        {
            this.water.update()
            this.fish.update()
        }
    }
}