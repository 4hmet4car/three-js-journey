import * as THREE from 'three'
import Experience from "../../../Experience.js"

import particleVertexShader from './particleShaders/vertex.glsl'
import particleFragmentShader from './particleShaders/fragment.glsl'

import { PLANET, PI } from "../../../constants.js"
import parameters from "../../../parameters.js"

export default class RingParticles
{
    constructor()
    {
        this.experience = new Experience()
        this.rotationMatrix = this.experience.rotationMatrix.rotationMatrix
        this.time = this.experience.time
        this.renderer = this.experience.renderer
        this.scene = this.experience.scene
        this.debug = this.experience.debug

        this.setRingParticles()
        this.setDebug()
    }
    setRingParticles()
    {
        if (this.particles !== undefined)
        {
            this.particleGeometry.dispose()
            this.particleMaterial.dispose()
            this.scene.remove(this.particles)
        }

        this.setParticleGeometry()
        this.setParticleMaterial()
        this.setParticles()
    }

    setParticleGeometry()
    {
        this.particleGeometry = new THREE.BufferGeometry()

        this.positions = new Float32Array(parameters.planet.particleCount * 3)
        this.scales = new Float32Array(parameters.planet.particleCount)
        this.angles = new Float32Array(parameters.planet.particleCount)

        for (let i = 0; i < parameters.planet.particleCount; i++)
        {
            const i3 = i * 3

            const radius = PLANET.RADIUS + PLANET.RING_SPACE + Math.random() * (parameters.planet.particleOuterRadius - PLANET.RADIUS)
            const angle = (Math.random() - 0.5) * 2 * Math.PI * 2

            this.positions[i3] = radius * Math.cos(angle)
            this.positions[i3 + 1] = 0
            this.positions[i3 + 2] = radius * Math.sin(angle)

            this.scales[i] = Math.random()

            this.angles[i] = angle
        }

        this.particleGeometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3))
        this.particleGeometry.setAttribute('aScale', new THREE.BufferAttribute(this.scales, 1))
        this.particleGeometry.setAttribute('aAngle', new THREE.BufferAttribute(this.angles, 1))
    }

    setParticleMaterial()
    {
        this.particleMaterial = new THREE.RawShaderMaterial({
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            vertexColors: true,

            vertexShader: particleVertexShader,
            fragmentShader: particleFragmentShader,

            uniforms:
            {
                uRotationMatrix: { value: this.rotationMatrix },

                uPI: { value: PI },

                uTime: { value: 0.0 },
                uSize: { value: parameters.planet.particleSize * this.renderer.instance.getPixelRatio() }
            }
        })
    }

    setParticles()
    {
        this.particles = new THREE.Points(this.particleGeometry, this.particleMaterial)
        this.scene.add(this.particles)
    }

    setDebug()
    {
        if (this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('RingParticles')

            this.debugFolder
                .add(parameters.planet, 'particleCount')
                .min(0)
                .max(500000)
                .step(1)
                .onChange(() =>
                {
                    this.setRingParticles()
                })

            this.debugFolder
                .add(parameters.planet, 'particleSize')
                .min(0)
                .max(200)
                .step(0.1)
                .onChange(() =>
                {
                    this.setRingParticles()
                })

            this.debugFolder
                .add(parameters.planet, 'particleOuterRadius')
                .min(0)
                .max(5)
                .step(0.1)
                .onChange(() =>
                {
                    this.setRingParticles()
                })

            this.debugFolder
                .add(parameters.planet, 'rotationSpeed')
                .min(0)
                .max(100)
                .step(0.1)
                .onChange(() =>
                {
                    this.setRingParticles()
                })
        }
    }

    update()
    {
        this.particleMaterial.uniforms.uTime.value = this.time.secondsElapsed * parameters.planet.rotationSpeed
    }

    rotate()
    {
        this.rotationMatrix = this.experience.rotationMatrix.rotationMatrix
        this.setRingParticles()
    }
}