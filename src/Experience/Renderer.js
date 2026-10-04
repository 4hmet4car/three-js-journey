import * as THREE from 'three'

import Experience from './Experience.js'

import { RENDERER } from './constants.js'

import { rendererParameters } from './parameters.js'

export default class Renderer
{
    constructor(postProcessingPasses)
    {
        this.experience = new Experience()
        this.canvas = this.experience.canvas
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.camera = this.experience.camera
        this.debug = this.experience.debug

        this.postProcessingPasses = postProcessingPasses
        this.effectComposerReady = false

        this.setRendererInstance()

        if (this.postProcessingPasses.length) this.setEffectComposer();

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

    async setEffectComposer()
    {
        const { EffectComposer } = await import("three/examples/jsm/postprocessing/EffectComposer.js")
        this.effectComposer = new EffectComposer(this.instance)
        this.effectComposer.setSize(this.sizes.width, this.sizes.height)
        this.effectComposer.setPixelRatio(this.sizes.pixelRatio)

        const { RenderPass } = await import('three/examples/jsm/postprocessing/RenderPass.js')
        this.renderPass = new RenderPass(this.scene, this.camera.instance)
        this.effectComposer.addPass(this.renderPass)

        this.setPostProcessingPasses()

        this.effectComposerReady = true
    }

    setPostProcessingPasses()
    {
        for (const postProcessingPass of this.postProcessingPasses)
        {
            if (postProcessingPass.enabled)
            {
                this.effectComposer.addPass(postProcessingPass.pass)
            }
        }
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

        if (this.effectComposer)
        {
            this.effectComposer.setSize(this.sizes.width, this.sizes.height)
            this.effectComposer.setPixelRatio(this.sizes.pixelRatio)
        }
    }

    update()
    {
        if (this.effectComposerReady)
        {
            this.effectComposer.render()
        } else
        {
            this.instance.render(this.scene, this.camera.instance)
        }
    }
}