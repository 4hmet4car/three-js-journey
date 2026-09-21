import * as THREE from 'three'
import { GPUComputationRenderer } from "three/addons/misc/GPUComputationRenderer.js"
import Experience from "../../Experience.js"

import { GPGPUParameters } from '../../parameters.js'
import gpgpuParticlesShader from './gpgpu/particles.glsl'

export default class GPGPU
{
    constructor(size, positionsArray)
    {
        this.experience = new Experience()
        this.renderer = this.experience.renderer
        this.debug = this.experience.debug
        this.scene = this.experience.scene
        this.time = this.experience.time

        this.setComputationRenderer(size)
        this.createBaseParticlesTexture(size, positionsArray)
        this.setParticlesVariable()
        this.setParticlesVariableDependencies()
        this.setVariableUniforms()
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
            this.baseParticlesPositionTexture.image.data[i4 + 3] = Math.random()
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

    setVariableUniforms()
    {
        this.particlesPositionVariable.material.uniforms.uTime = new THREE.Uniform(0)
        this.particlesPositionVariable.material.uniforms.uDeltaTime = new THREE.Uniform(0)
        this.particlesPositionVariable.material.uniforms.uInitialParticlesPositions = new THREE.Uniform(this.baseParticlesPositionTexture)
        this.particlesPositionVariable.material.uniforms.uFlowFieldInfluence = new THREE.Uniform(GPGPUParameters.flowFieldInfluence)
        this.particlesPositionVariable.material.uniforms.uFlowFieldStrength = new THREE.Uniform(GPGPUParameters.flowFieldStrength)
        this.particlesPositionVariable.material.uniforms.uFlowFieldFrequency = new THREE.Uniform(GPGPUParameters.flowFieldFrequency)
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

            this.debugFolder
                .add(GPGPUParameters, 'flowFieldInfluence')
                .min(0)
                .max(1)
                .step(0.001)
                .onChange(() =>
                {
                    this.particlesPositionVariable.material.uniforms.uFlowFieldInfluence.value = GPGPUParameters.flowFieldInfluence
                })

            this.debugFolder
                .add(GPGPUParameters, 'flowFieldStrength')
                .min(0)
                .max(10)
                .step(0.001)
                .onChange(() =>
                {
                    this.particlesPositionVariable.material.uniforms.uFlowFieldStrength.value = GPGPUParameters.flowFieldStrength
                })

            this.debugFolder
                .add(GPGPUParameters, 'flowFieldFrequency')
                .min(0)
                .max(1)
                .step(0.001)
                .onChange(() =>
                {
                    this.particlesPositionVariable.material.uniforms.uFlowFieldFrequency.value = GPGPUParameters.flowFieldFrequency
                })

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
            this.debugPlane.visible = GPGPUParameters.debugPlane
            this.debugPlane.position.x = 3
            this.scene.add(this.debugPlane)

            this.debugFolder
                .add(GPGPUParameters, 'debugPlane')
                .onChange(() =>
                {
                    this.debugPlane.visible = GPGPUParameters.debugPlane
                })
        }
    }

    update()
    {
        this.particlesPositionVariable.material.uniforms.uTime.value = this.time.secondsElapsed
        this.particlesPositionVariable.material.uniforms.uDeltaTime.value = this.time.delta / 1000
        this.computationRenderer.compute()
        // This is how you get the result of the computation as a texture
        this.computationTextureOutput = this.computationRenderer
            .getCurrentRenderTarget(this.particlesPositionVariable)
            .texture
    }
}