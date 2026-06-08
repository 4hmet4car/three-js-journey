import * as THREE from 'three'

import { Sky } from "three/examples/jsm/objects/Sky.js"
import Experience from "../Experience.js"
import parameters from '../parameters.js'

export default class Environment
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.debug = this.experience.debug

        this.setSky()
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

            this.debugFolder.add(parameters.sky, 'turbidity', 0.0, 20.0, 0.1).onChange(() => { this.guiChanged })
            this.debugFolder.add(parameters.sky, 'rayleigh', 0.0, 4, 0.001).onChange(() => { this.guiChanged })
            this.debugFolder.add(parameters.sky, 'mieCoefficient', 0.0, 0.1, 0.001).onChange(() => { this.guiChanged })
            this.debugFolder.add(parameters.sky, 'mieDirectionalG', 0.0, 1, 0.001).onChange(() => { this.guiChanged })
            this.debugFolder.add(parameters.sky, 'elevation', 0, 90, 0.1).onChange(() => { this.guiChanged })
            this.debugFolder.add(parameters.sky, 'azimuth', - 180, 180, 0.1).onChange(() => { this.guiChanged })
            this.debugFolder.add(parameters.sky, 'exposure', 0, 1, 0.0001).onChange(() => { this.guiChanged })
            this.debugFolder.add(parameters.sky, 'showSunDisc').onChange(() => { this.guiChanged })


            this.folderClouds = this.debugFolder.addFolder('Clouds');
            this.folderClouds.add(parameters.sky, 'cloudCoverage', 0, 1, 0.01).name('coverage').onChange(() => (this.guiChanged))
            this.folderClouds.add(parameters.sky, 'cloudDensity', 0, 1, 0.01).name('density').onChange(() => (this.guiChanged))
            this.folderClouds.add(parameters.sky, 'cloudElevation', 0, 1, 0.01).name('elevation').onChange(() => (this.guiChanged))
        }
    }

    guiChanged()
    {

    }
}