import Experience from "../Experience.js"
import Dummy from "./Dummy.js"
import Environment from "./Environment.js"

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
            this.dummy = new Dummy()
            this.environment = new Environment()
        })

        this.resources.startLoading()
    }

    resize()
    {
        // if (this.environment)
        // {
        //     this.environment.resize()
        // }
    }

    update()
    {
        // if (this.environment)
        // {
        //     this.environment.update()
        // }
    }
}