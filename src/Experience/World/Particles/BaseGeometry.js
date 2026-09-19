import * as THREE from 'three'

export default class BaseGeometry
{
    constructor()
    {
        this.setIntance()
        this.getVertexCount()
        this.getPositionsArray()
    }

    setIntance()
    {
        this.instance = new THREE.SphereGeometry(3)
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