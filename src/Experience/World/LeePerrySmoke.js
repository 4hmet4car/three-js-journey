import Experience from "../Experience.js"

export default class LeePerrySmoke
{
    constructor()
    {
        this.experience = new Experience()
        this.resources = this.experience.resources
        this.scene = this.experience.scene

        // Setup
        this.resource = this.resources.items.leePerrySmokeModel

        this.setModel()
    }

    setModel()
    {
        this.model = this.resource.scene.children[0]
        this.model.material.map.anisotropy = 8
        this.scene.add(this.model)
    }

    update()
    {

    }
}