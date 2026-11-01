import * as THREE from 'three'
import Experience from "../Experience.js"

export default class Heritage
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.setFoo()
        // this.setMaterials()
    }

    setFoo()
    {
        this.foo = new THREE.Mesh(
            new THREE.BoxGeometry(1,1,1),
            new THREE.MeshBasicMaterial()
        )

        this.scene.add(this.foo)
    }

    setMaterials()
    {
        
    }

    update()
    {
        
    }

}