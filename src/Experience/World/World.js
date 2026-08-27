import Experience from "../Experience.js"
import Sun from "./Sun.js"
import Earth from "./Earth/Earth.js"
import Atmosphere from "./Atmosphere/Atmosphere.js"

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
            this.sun = new Sun()
            this.earth = new Earth()
            this.atmosphere = new Atmosphere()
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