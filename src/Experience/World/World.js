import Experience from '../Experience.js'
// import Test from './Test/Test.js'
import BumpyPlane from './BumpyPlane/BumpyPlane.js'
import Flag from './Flag/Flag.js'

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
            // this.test = new Test()
            this.bumpyPlane = new BumpyPlane()
            this.flag = new Flag()
        })
    }

    update()
    {
        if (this.flag) {
            this.flag.update()
        }
    }
}