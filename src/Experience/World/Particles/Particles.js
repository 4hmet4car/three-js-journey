import * as THREE from 'three'
import Experience from "../../Experience.js"

import { particlesParameters } from '../../parameters.js'
import BaseGeometry from './BaseGeometry.js'
import GPGPU from './GPGPU.js'
import ParticlesBufferGeometry from './ParticlesBufferGeometry.js'
import particlesFragmentShader from './shaders/fragment.glsl'
import particlesVertexShader from './shaders/vertex.glsl'

export default class Particles
{
    constructor()
    {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.debug = this.experience.debug

        this.setBaseGeometry()
        this.setGPGPU()
        this.setBufferGeometry()

        this.setGeometry()
        this.setMaterial()
        this.setPoints()
        this.setDebug()
    }

    setBaseGeometry()
    {
        this.baseGeometry = new BaseGeometry()
    }

    setGPGPU()
    {
        this.GPGPU = new GPGPU(this.baseGeometry.vertexCount, this.baseGeometry.positionsArray)
    }

    setBufferGeometry()
    {
        this.bufferGeometry = new ParticlesBufferGeometry(this.baseGeometry.vertexCount, this.GPGPU.size)
    }

    setGeometry()
    {
        this.geometry = this.bufferGeometry.instance
    }

    setMaterial()
    {
        this.material = new THREE.ShaderMaterial({
            vertexShader: particlesVertexShader,
            fragmentShader: particlesFragmentShader,
            uniforms:
            {
                uSize: new THREE.Uniform(particlesParameters.particleSize),
                uResolution: new THREE.Uniform(this.sizes.resolution),
                uParticlesPositionTexture: new THREE.Uniform()
            }
        })
    }

    setPoints()
    {
        this.points = new THREE.Points(this.geometry, this.material)
        this.scene.add(this.points)
    }

    setDebug()
    {
        if (this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder("Particles")

            this.debugFolder
                .add(particlesParameters, 'particleSize')
                .min(0)
                .max(1)
                .step(0.001)
                .onChange(() =>
                {
                    this.material.uniforms.uSize.value = particlesParameters.particleSize
                })
        }
    }

    resize()
    {

    }

    update()
    {
        this.GPGPU.update()
        this.material.uniforms.uParticlesPositionTexture.value = this.GPGPU.computationTextureOutput
    }
}