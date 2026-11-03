import Experience from '../Experience.js'
import Environment from './Environment.js'
import Fireflies from './Fireflies/Fireflies.js'
import Portal from './Portal/Portal.js'

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.resources = this.experience.resources
    }

    init()
    {
        // this.environment = new Environment()
        this.portal = new Portal()
        this.fireflies = new Fireflies()
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
        if (this.fireflies)
        {
            this.fireflies.update()
        }
    }
}