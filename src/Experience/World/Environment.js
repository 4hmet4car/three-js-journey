import * as THREE from 'three'

import Experience from "../Experience.js"

export default class Environment
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.debug = this.experience.debug

        //Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('Environment')
        }

        this.setSunLight()
    }

    setSunLight()
    {
        this.sunLight = new THREE.DirectionalLight('#ffffff', 4)
        // this.sunLight.castShadow = true
        // this.sunLight.shadow.camera.near = 1
        // this.sunLight.shadow.camera.far = 2
        // this.sunLight.shadow.camera.left = -1
        // this.sunLight.shadow.camera.right = 1
        // this.sunLight.shadow.camera.top = 1
        // this.sunLight.shadow.camera.bottom = -1
        // this.sunLight.shadow.mapSize.set(32, 32)
        this.sunLight.position.set(1, 1, -1)
        this.scene.add(this.sunLight)
        
        // this.directionalLightCameraHelper = new THREE.CameraHelper(this.sunLight.shadow.camera)
        // this.scene.add(this.directionalLightCameraHelper)

        //Debug
        if (this.debug.active) {
            this.debugFolder
                .add(this.sunLight,'intensity')
                .name('SunLightIntesity')
                .min(0)
                .max(10)
                .step(0.001)

            this.debugFolder
                .add(this.sunLight.position,'x')
                .name('SunLightX')
                .min(-5)
                .max(5)
                .step(0.001)

            this.debugFolder
                .add(this.sunLight.position,'y')
                .name('SunLightY')
                .min(-5)
                .max(5)
                .step(0.001)

            this.debugFolder
                .add(this.sunLight.position,'z')
                .name('SunLightZ')
                .min(-5)
                .max(5)
                .step(0.001)
        }
    }
}