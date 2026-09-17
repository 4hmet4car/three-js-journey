import * as THREE from 'three'
import Experience from "../../Experience.js"

export default class BaseGeometry
{
    constructor()
    {
        this.experience = new Experience()

        this.setIntance()
        this.getVertexCount()
    }

    setIntance()
    {
        this.instance = new THREE.SphereGeometry(3)
    }

    getVertexCount()
    {
        this.vertexCount = this.instance.attributes.position.count
    }
}