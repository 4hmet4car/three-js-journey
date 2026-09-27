import * as THREE from 'three'

import Experience from './Experience.js'

import { RENDERER } from './constants.js'

import { rendererParameters } from './parameters.js'

export default class Renderer
{
    constructor()
    {
        this.experience = new Experience()
        this.canvas = this.experience.canvas
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.camera = this.experience.camera
        this.debug = this.experience.debug

        this.setRendererInstance()
        this.setDebug()

        // console.log(this.instance.capabilities.getMaxAnisotropy())
    }

    setRendererInstance()
    {
        this.instance = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: RENDERER.ANTIALIAS,
        })
        this.instance.setClearColor(rendererParameters.clearColor)
        this.instance.shadowMap.enabled = RENDERER.SHADOWMAP.ENABLED
        this.instance.shadowMap.type = RENDERER.SHADOWMAP.TYPE
        this.instance.toneMapping = RENDERER.TONEMAPPING.TYPE
        this.instance.toneMappingExposure = RENDERER.TONEMAPPING.EXPOSURE
        // this.instance.outputColorSpace = RENDERER.OUTPUT_COLOR_SPACE
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixelRatio)
    }

    setDebug()
    {
        if (this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder("Renderer")

            this.debugFolder
                .addColor(rendererParameters, 'clearColor')
                .onChange(() =>
                {
                    this.instance.setClearColor(rendererParameters.clearColor)
                })
        }
    }

    resize()
    {
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixelRatio)
    }

    update()
    {
        this.instance.render(this.scene, this.camera.instance)
    }
}