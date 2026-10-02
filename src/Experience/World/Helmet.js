import * as THREE from 'three'
import Experience from "../Experience.js"
import { HELMET } from '../constants.js'
import { helmetParameters } from '../parameters.js'

export default class Helmet
{
    constructor()
    {
        this.experience = new Experience()
        this.resources = this.experience.resources
        this.scene = this.experience.scene
        this.debug = this.experience.debug

        this.getModel()
        this.updateMaterial()
        this.setModel()
        this.setDebug()
    }

    getModel()
    {
        this.model = this.resources.items.damagedHelmet.scene
    }

    updateMaterial()
    {
        this.model.traverse((child) =>
        {
            if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
            {
                child.material.side = HELMET.MATERIAL.SIDE
                child.material.envMapIntensity = HELMET.MATERIAL.ENV_MAP_INTENSITY
                child.castShadow = HELMET.MATERIAL.CAST_SHADOW
                child.receiveShadow = HELMET.MATERIAL.RECEIVE_SHADOW
                child.material.needsUpdate = true
            }
        })
    }

    setModel()
    {
        this.model.scale.set(
            HELMET.MODEL.SCALE_X,
            HELMET.MODEL.SCALE_Y,
            HELMET.MODEL.SCALE_Z
        )
        this.model.rotation.y = HELMET.MODEL.ROTATION_Y
        this.scene.add(this.model)
    }

    setDebug()
    {
        if (this.debug.active)
        {
            this.debugPlane = new THREE.Mesh(
                new THREE.PlaneGeometry(10, 10),
                new THREE.MeshStandardMaterial()
            )
            this.debugPlane.receiveShadow = true
            this.debugPlane.rotation.x = -Math.PI * 0.5
            this.debugPlane.position.y = -2
            this.debugPlane.visible = helmetParameters.shadowPlane
            this.scene.add(this.debugPlane)

            this.debugFolder = this.debug.ui.addFolder("Helmet")

            this.debugFolder
                .add(helmetParameters, 'shadowPlane')
                .onChange(() =>
                {
                    this.debugPlane.visible = helmetParameters.shadowPlane
                })
        }
    }
}