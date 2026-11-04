import * as THREE from 'three'
import Experience from "../../Experience.js"

import portalVertexShader from './shaders/vertex.glsl'
import portalFragmentShader from './shaders/fragment.glsl'
import { portalParameters } from '../../parameters.js'

export default class Portal
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.debug = this.experience.debug
        this.time = this.experience.time

        this.setModel()
        this.setTextures()
        this.setMaterials()
        this.setDebug()
    }

    setModel()
    {
        this.portal = this.resources.items.portal
        this.scene.add(this.portal.scene)
    }

    setTextures()
    {
        this.bakedTexture = this.resources.items.bakedTexture
        this.bakedTexture.colorSpace = THREE.SRGBColorSpace
        this.bakedTexture.flipY = false
    }

    setMaterials()
    {
        this.portalLightMaterial = new THREE.ShaderMaterial({
            vertexShader: portalVertexShader,
            fragmentShader: portalFragmentShader,
            uniforms:
            {
                uTime: new THREE.Uniform(0),
                uColorStart: new THREE.Uniform(portalParameters.uColorStart),
                uColorEnd: new THREE.Uniform(portalParameters.uColorEnd),
            }
        })

        this.poleLightMaterial = new THREE.MeshBasicMaterial({ color: 0xfff9f9 })
        this.bakedMaterial = new THREE.MeshBasicMaterial({ map: this.bakedTexture })

        this.portal.scene.traverse((child) =>
        {
            if (child.isMesh)
            {
                const lightRegex = /[a-z]+Light(\.[0-9]{1,3})?/
                if (lightRegex.test(child.name))
                {
                    const portalRegex = /portal/
                    if (portalRegex.test(child.name))
                    {
                        child.material = this.portalLightMaterial
                    } else
                    {
                        child.material = this.poleLightMaterial
                    }
                } else
                {
                    child.material = this.bakedMaterial
                }
            }
        })
    }

    setDebug()
    {
        if (this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('Portal')

            this.debugFolder
                .addColor(portalParameters, 'uColorStart')
                .onChange(() =>
                {
                    this.portalLightMaterial.uniforms.uColorStart.value = portalParameters.uColorStart
                })

            this.debugFolder
                .addColor(portalParameters, 'uColorEnd')
                .onChange(() =>
                {
                    this.portalLightMaterial.uniforms.uColorEnd.value = portalParameters.uColorEnd
                })
        }
    }

    update()
    {
        this.portalLightMaterial.uniforms.uTime.value = this.time.secondsElapsed
    }
}