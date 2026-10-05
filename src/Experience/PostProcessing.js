import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js"
import { DotScreenPass } from 'three/examples/jsm/postprocessing/DotScreenPass.js'
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { RGBShiftShader } from 'three/examples/jsm/shaders/RGBShiftShader.js'
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader.js'
import Experience from "./Experience.js"

export default class PostProcessing
{
    constructor()
    {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.renderer = this.experience.renderer
        this.scene = this.experience.scene
        this.camera = this.experience.camera

        this.setEffectComposer()
        this.setRenderPasses()
    }

    setEffectComposer()
    {
        this.effectComposer = new EffectComposer(this.renderer.instance)
        this.effectComposer.setSize(this.sizes.width, this.sizes.height)
        this.effectComposer.setPixelRatio(this.sizes.pixelRatio)
    }

    setRenderPasses()
    {
        // Render Pass is almost always the first one
        this.renderPass = new RenderPass(this.scene, this.camera.instance)
        this.effectComposer.addPass(this.renderPass)

        this.dotScreenPass = new DotScreenPass()
        this.dotScreenPass.enabled = false
        this.effectComposer.addPass(this.dotScreenPass)

        this.glitchPass = new GlitchPass()
        this.glitchPass.enabled = false
        this.effectComposer.addPass(this.glitchPass)

        this.rgbShiftPass = new ShaderPass(RGBShiftShader)
        this.rgbShiftPass.enabled = false
        this.effectComposer.addPass(this.rgbShiftPass)

        // Gamma correction pass is always the last
        this.gammaCorrectionPass = new ShaderPass(GammaCorrectionShader)
        this.effectComposer.addPass(this.gammaCorrectionPass)
    }

    resize()
    {
        this.effectComposer.setSize(this.sizes.width, this.sizes.height)
        this.effectComposer.setPixelRatio(this.sizes.pixelRatio)
    }

    update()
    {
        this.effectComposer.render()
    }
}