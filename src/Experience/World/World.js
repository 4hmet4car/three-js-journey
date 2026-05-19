import Experience from '../Experience.js'
import Environment from './Environment.js'
import Water from './Water/Water.js'
import Buoy from './Buoy.js'
import Seagull from './Seagull.js'

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
            this.buoy = new Buoy()
            this.seagull = new Seagull()
            this.environment = new Environment()
        })
    }

    update()
    {
        if (this.buoy && this.water && this.seagull)
        {
            this.water.update()
            this.buoy.update()
            this.seagull.update()
        }
    }
}