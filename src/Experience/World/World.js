import Experience from '../Experience.js'
import Environment from './Environment.js'
import Foo from './Foo.js'

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
        this.foo = new Foo()
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
        // if (this.pointsOfInterest)
        // {
        //     this.pointsOfInterest.update()
        // }
    }
}