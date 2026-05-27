import Experience from "../Experience";

export default class Coffee
{
    constructor()
    {
        this.experience = new Experience()
        this.resources = this.experience.resources
        this.scene = this.experience.scene

        // Setup
        this.resource = this.resources.items.coffeeModel

        this.setModel()
    }

    setModel()
    {
        this.model = this.resource.scene
        this.model.getObjectByName('baked').material.map.anisotropy = 8
        this.scene.add(this.model)
    }

    update()
    {

    }
}