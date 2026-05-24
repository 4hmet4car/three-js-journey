import * as THREE from 'three'
import Experience from "../../../Experience.js"

import particleVertexShader from './particleShaders/vertex.glsl'
import particleFragmentShader from './particleShaders/fragment.glsl'

import ringVertexShader from './ringShaders/vertex.glsl'
import ringFragmentShader from './ringShaders/fragment.glsl'

import { PLANET, PI } from "../../../constants.js"
import parameters from "../../../parameters.js"

export default class Ring
{
    constructor()
    {
        this.experience = new Experience()
        this.time = this.experience.time
        this.renderer = this.experience.renderer
        this.scene = this.experience.scene
        this.debug = this.experience.debug

        this.setRotationMatrix()
        this.setRing()
        this.setRingParticles()
        this.setDebug()
    }

    setRotationMatrix()
    {
        // Tait-Bryan ZYX convention
        this.cosAlpha = Math.cos(parameters.ring.rotationX)
        this.sinAlpha = Math.sin(parameters.ring.rotationX)
        this.cosBeta = Math.cos(parameters.ring.rotationY)
        this.sinBeta = Math.sin(parameters.ring.rotationY)
        this.cosTheta = Math.cos(parameters.ring.rotationZ)
        this.sinTheta = Math.sin(parameters.ring.rotationZ)

        this.rotationMatrix = new THREE.Matrix4()
        this.rotationMatrix.set(
            this.cosBeta * this.cosTheta,
            this.sinAlpha * this.sinBeta * this.cosTheta - this.cosAlpha * this.sinTheta,
            this.cosAlpha * this.sinBeta * this.cosTheta + this.sinAlpha * this.sinTheta,
            0,

            this.cosBeta * this.sinTheta,
            this.sinAlpha * this.sinBeta * this.sinTheta + this.cosAlpha * this.cosTheta,
            this.cosAlpha * this.sinBeta * this.sinTheta - this.sinAlpha * this.cosTheta,
            0,

            -this.sinBeta,
            this.sinAlpha * this.cosBeta,
            this.cosAlpha * this.cosBeta,
            0,

            0, 0, 0, 1
        )
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

        this.positions = new Float32Array(parameters.ring.particleCount * 3)
        this.scales = new Float32Array(parameters.ring.particleCount)
        this.angles = new Float32Array(parameters.ring.particleCount)

        for (let i = 0; i < parameters.ring.particleCount; i++)
        {
            const i3 = i * 3

            const radius = PLANET.RADIUS + PLANET.RING_SPACE + Math.random() * (parameters.ring.outerRadius - PLANET.RADIUS)
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
                uSize: { value: parameters.ring.particleSize * this.renderer.instance.getPixelRatio() }
            }
        })
    }

    setParticles()
    {
        this.particles = new THREE.Points(this.particleGeometry, this.particleMaterial)
        this.scene.add(this.particles)
    }

    setRing()
    {
        if (this.mesh !== undefined)
        {
            this.ringGeometry.dispose()
            this.ringMaterial.dispose()
            this.scene.remove(this.mesh)
        }

        this.setRingGeometry()
        this.setRingMaterial()
        this.setMesh()
    }

    setRingGeometry()
    {
        this.ringGeometry = new THREE.PlaneGeometry(parameters.ring.outerRadius * 3,parameters.ring.outerRadius * 3)
    }

    setRingMaterial()
    {
        this.ringMaterial = new THREE.RawShaderMaterial({
            side: THREE.DoubleSide,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            vertexColors: true,

            vertexShader: ringVertexShader,
            fragmentShader: ringFragmentShader,

            uniforms:
            {
                uRotationMatrix: { value: this.rotationMatrix },

                uRingCount: {value: parameters.ring.ringCount},
                uRoot1: {value: parameters.ring.root1},
                uRoot2: {value: parameters.ring.root2},

                uPI: { value: PI },
            }
        })
    }

    setMesh()
    {
        this.mesh = new THREE.Mesh(this.ringGeometry, this.ringMaterial)
        this.mesh.rotation.x = PI * 0.5
        this.scene.add(this.mesh)
    }

    setDebug()
    {
        if (this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('Ring')

            this.debugFolder
                .add(parameters.ring, 'rotationX')
                .min(-4)
                .max(4)
                .step(0.001)
                .onChange(() =>
                {
                    this.setRotationMatrix()
                    this.setRing()
                    this.setRingParticles()
                })

            this.debugFolder
                .add(parameters.ring, 'rotationY')
                .min(-4)
                .max(4)
                .step(0.001)
                .onChange(() =>
                {
                    this.setRotationMatrix()
                    this.setRing()
                    this.setRingParticles()
                })

            this.debugFolder
                .add(parameters.ring, 'rotationZ')
                .min(-4)
                .max(4)
                .step(0.001)
                .onChange(() =>
                {
                    this.setRotationMatrix()
                    this.setRing()
                    this.setRingParticles()
                })

            this.debugFolder
                .add(parameters.ring, 'ringCount')
                .min(0)
                .max(500)
                .step(1)
                .onChange(() =>
                {
                    this.setRotationMatrix()
                    this.setRing()
                    this.setRingParticles()
                })
            
            this.debugFolder
                .add(parameters.ring, 'root1')
                .min(0)
                .max(500)
                .step(0.01)
                .onChange(() =>
                {
                    this.setRotationMatrix()
                    this.setRing()
                    this.setRingParticles()
                })

            this.debugFolder
                .add(parameters.ring, 'root2')
                .min(0)
                .max(500)
                .step(0.01)
                .onChange(() =>
                {
                    this.setRotationMatrix()
                    this.setRing()
                    this.setRingParticles()
                })
        }
    }

    update()
    {
        this.particleMaterial.uniforms.uTime.value = this.time.secondsElapsed
    }
}