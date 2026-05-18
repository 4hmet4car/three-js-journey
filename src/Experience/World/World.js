import Experience from '../Experience.js'
import Water from './Water/Water.js'

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene

        // Setup
        this.water = new Water()
    }

    update()
    {
        this.water.update()
    }
}