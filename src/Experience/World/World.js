import Experience from "../Experience.js"
import Earth from "./Earth/Earth.js"

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
            this.earth = new Earth()
        })

        this.resources.startLoading()
    }

    resize()
    {
        // if (this.earth)
        // {
        //     this.earth.resize()
        // }
    }

    update()
    {
        if (this.earth)
        {
            this.earth.update()
        }
    }
}