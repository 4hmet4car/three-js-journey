import Experience from "../Experience.js"
import Water from "./Water/Water.js"

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
        })

        this.resources.startLoading()
    }

    update()
    {
        if (this.water)
        {
            this.water.update()
        }
    }
}