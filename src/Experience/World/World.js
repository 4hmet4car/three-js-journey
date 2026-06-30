import Experience from "../Experience.js"
// import Water from "./Water.js"
// import Buoy from "./Buoy.js"

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
            // this.water = new Water()
            // this.buoy = new Buoy()
        })

        this.resources.startLoading()
    }

    update()
    {
        // if (this.water && this.buoy)
        // {
        //     this.water.update()
        //     this.buoy.update()
        // }
    }
}