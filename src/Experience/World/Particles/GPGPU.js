import { GPUComputationRenderer } from "three/addons/misc/GPUComputationRenderer.js"
import Experience from "../../Experience.js"

import gpgpuParticlesShader from './gpgpu/particles.glsl'

export default class GPGPU
{
    constructor(size)
    {
        this.experience = new Experience()
        this.renderer = this.experience.renderer

        this.setComputationRenderer(size)
        this.createBaseParticlesTexture()
        this.setParticlesVariable()
    }

    setComputationRenderer(size)
    {
        // Calculate the texture size
        this.size = Math.ceil(Math.sqrt(size))

        this.computationRenderer = new GPUComputationRenderer(this.size, this.size, this.renderer.instance)
    }

    createBaseParticlesTexture()
    {
        this.baseParticlesTexture = this.computationRenderer.createTexture()
    }

    setParticlesVariable()
    {
        this.particlesVariable = this.computationRenderer.addVariable(
            'uParticles',
            gpgpuParticlesShader,
            this.baseParticlesTexture
        )
    }
}