import * as THREE from 'three'
import Experience from '../../Experience.js'

export default class BaseGeometry
{
    constructor()
    {
        this.experience = new Experience()
        this.resources = this.experience.resources
        
        this.setIntance()
        this.getVertexCount()
        this.getPositionsArray()
    }

    setIntance()
    {
        this.instance = this.resources.items.model.scene.children[0].geometry
    }

    getVertexCount()
    {
        this.vertexCount = this.instance.attributes.position.count
    }

    getPositionsArray()
    {
        this.positionsArray = this.instance.attributes.position.array
    }
}