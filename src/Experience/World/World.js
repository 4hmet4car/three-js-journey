import Experience from '../Experience.js'
import Test from './Test.js'

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        // Wait for resources
        this.resources.on('ready', () =>
        {
            // Setup
            this.test = new Test()
        })
    }

    update()
    {
        
    }
}