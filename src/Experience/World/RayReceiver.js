import * as THREE from 'three'

import Experience from "../Experience.js";
import constants from '../constants.js'
import parameters from '../parameters.js';

export default class RayReceiver
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.rayCaster = this.experience.rayCaster

        this.setGeometry()
        this.setMaterial()
        this.setMesh()
    }
    setGeometry()
    {
        this.geometry = new THREE.PlaneGeometry(constants.RAYRECEIVER_SCALE_X, constants.RAYRECEIVER_SCALE_Z, constants.RAYRECEIVER_SUBDIVISIONS_X, constants.RAYRECEIVER_SUBDIVISIONS_Z)
    }

    setMaterial()
    {
        this.material = new THREE.MeshBasicMaterial({
            color: '#ff0000',
            wireframe: true,
            visible: false,
        })
    }

    setMesh()
    {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.rotation.x = -Math.PI * 0.5
        this.scene.add(this.mesh)

        this.rayCaster.setIntersect(this.mesh)
    }

    update()
    {

    }
}
