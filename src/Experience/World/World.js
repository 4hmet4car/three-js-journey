import Experience from '../Experience.js'
import Environment from './Environment.js'
import Dummy from './Dummy.js'
import Floor from './Floor.js'

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.resources = this.experience.resources
    }

    init()
    {
        this.environment = new Environment()
        this.dummy = new Dummy()
        this.floor = new Floor()
    }

    resize()
    {
        // if (this.particles)
        // {
        //     this.particles.resize()
        // }
    }

    update()
    {
        // if (this.portal && this.fireflies)
        // {
        //     this.portal.update()
        //     this.fireflies.update()
        // }
    }
}