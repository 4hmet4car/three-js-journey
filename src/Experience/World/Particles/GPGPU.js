import * as THREE from 'three'
import { GPUComputationRenderer } from "three/addons/misc/GPUComputationRenderer.js"
import Experience from "../../Experience.js"

import gpgpuParticlesShader from './gpgpu/particles.glsl'

export default class GPGPU
{
    constructor(size, positionsArray)
    {
        this.experience = new Experience()
        this.renderer = this.experience.renderer
        this.debug = this.experience.debug
        this.scene = this.experience.scene

        this.setComputationRenderer(size)
        this.createBaseParticlesTexture(size, positionsArray)
        this.setParticlesVariable()
        this.setParticlesVariableDependencies()
        this.initializeCompute()
        this.setDebug()
    }

    setComputationRenderer(size)
    {
        // Calculate the texture size
        this.size = Math.ceil(Math.sqrt(size))

        this.computationRenderer = new GPUComputationRenderer(this.size, this.size, this.renderer.instance)
    }

    createBaseParticlesTexture(size, positionsArray)
    {
        this.baseParticlesPositionTexture = this.computationRenderer.createTexture()

        for (let i = 0; i < size; i++)
        {
            const i3 = i * 3
            const i4 = i * 4

            this.baseParticlesPositionTexture.image.data[i4 + 0] = positionsArray[i3 + 0]
            this.baseParticlesPositionTexture.image.data[i4 + 1] = positionsArray[i3 + 1]
            this.baseParticlesPositionTexture.image.data[i4 + 2] = positionsArray[i3 + 2]
            this.baseParticlesPositionTexture.image.data[i4 + 3] = 0
        }
    }

    setParticlesVariable()
    {
        this.particlesPositionVariable = this.computationRenderer.addVariable(
            'uParticlesPositions',
            gpgpuParticlesShader,
            this.baseParticlesPositionTexture
        )
    }

    setParticlesVariableDependencies()
    {
        this.computationRenderer.setVariableDependencies(
            this.particlesPositionVariable,
            [this.particlesPositionVariable]
        )
    }

    initializeCompute()
    {
        this.computationRenderer.init()
    }

    setDebug()
    {
        if (this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder("GPGPU")

            /**
             * Debug plane
             */
            // This is how you get the result of the computation as a texture
            this.computationTextureOutput = this.computationRenderer
                .getCurrentRenderTarget(this.particlesPositionVariable)
                .texture

            this.debugPlane = new THREE.Mesh(
                new THREE.PlaneGeometry(3, 3),
                new THREE.MeshBasicMaterial({ map: this.computationTextureOutput })
            )
            this.debugPlane.position.x = 3
            this.scene.add(this.debugPlane)
        }
    }

    update()
    {
        this.computationRenderer.compute()
        // This is how you get the result of the computation as a texture
        this.computationTextureOutput = this.computationRenderer
                                            .getCurrentRenderTarget(this.particlesPositionVariable)
                                            .texture
    }
}