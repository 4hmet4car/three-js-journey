import Experience from "../Experience.js"

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
            
        })

    }

    update()
    {
        // if (this.suzanne && this.sphere && this.torusKnot && this.holographic)
        // {
        //     this.holographic.update()
        //     this.suzanne.update()
        //     this.sphere.update()
        //     this.torusKnot.update()
        // }
    }
}