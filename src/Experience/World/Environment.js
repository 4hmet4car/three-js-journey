import * as THREE from 'three'

import { Sky } from "three/examples/jsm/objects/Sky.js"
import Experience from "../Experience.js"
import parameters from '../parameters.js'

export default class Environment
{
    constructor()
    {
        this.experience = new Experience()
        this.renderer = this.experience.renderer
        this.scene = this.experience.scene
        this.debug = this.experience.debug

        this.setSky()
        this.guiChanged()
        this.setDebug()
    }

    setSky()
    {
        this.sky = new Sky()

        this.sky.scale.setScalar(450000)
        this.scene.add(this.sky)

        this.sun = new THREE.Vector3()
    }

    setDebug()
    {
        if (this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder("Sky")

            this.debugFolder.add(parameters.sky, 'turbidity', 0.0, 20.0, 0.1).onChange(() => { this.guiChanged() })
            this.debugFolder.add(parameters.sky, 'rayleigh', 0.0, 4, 0.001).onChange(() => { this.guiChanged() })
            this.debugFolder.add(parameters.sky, 'mieCoefficient', 0.0, 0.1, 0.001).onChange(() => { this.guiChanged() })
            this.debugFolder.add(parameters.sky, 'mieDirectionalG', 0.0, 1, 0.001).onChange(() => { this.guiChanged() })
            this.debugFolder.add(parameters.sky, 'elevation', -3, 90, 0.1).onChange(() => { this.guiChanged() })
            this.debugFolder.add(parameters.sky, 'azimuth', - 180, 180, 0.1).onChange(() => { this.guiChanged() })
        }
    }

    guiChanged()
    {
        this.uniforms = this.sky.material.uniforms;
        this.uniforms['turbidity'].value = parameters.sky.turbidity
        this.uniforms['rayleigh'].value = parameters.sky.rayleigh
        this.uniforms['mieCoefficient'].value = parameters.sky.mieCoefficient
        this.uniforms['mieDirectionalG'].value = parameters.sky.mieDirectionalG

        const phi = THREE.MathUtils.degToRad(90 - parameters.sky.elevation)
        const theta = THREE.MathUtils.degToRad(parameters.sky.azimuth)

        this.sun.setFromSphericalCoords(1, phi, theta);

        this.uniforms['sunPosition'].value.copy(this.sun);

        this.renderer.toneMappingExposure = parameters.sky.exposure
    }
}