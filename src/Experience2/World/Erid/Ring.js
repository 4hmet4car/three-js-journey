import * as THREE from 'three'
import Experience from "../../Experience.js"

import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'

import { ERID } from "../../constants.js"
import parameters from "../../parameters.js"

export default class Ring
{
    constructor()
    {
        this.experience = new Experience()
        this.renderer = this.experience.renderer
        this.scene = this.experience.scene
        this.debug = this.experience.debug

        this.setRing()
        this.setDebug()
    }

    setRing()
    {
        if (this.particles !== undefined) {
            this.geometry.dispose()
            this.material.dispose()
            this.scene.remove(this.particles)
        }
        
        this.setGeometry()
        this.setMaterial()
        this.setParticles()
    }

    setGeometry()
    {
        this.geometry = new THREE.BufferGeometry()

        this.positions = new Float32Array(parameters.ring.particleCount * 3)
        this.scales = new Float32Array(parameters.ring.particleCount)

        for (let i = 0; i < parameters.ring.particleCount; i++)
        {
            const i3 = i * 3

            const radius = ERID.RADIUS + Math.random() * (parameters.ring.outerRadius - ERID.RADIUS)
            const angle = (Math.random() - 0.5) * 2 * Math.PI * 2

            this.positions[i3] = radius * Math.cos(angle)
            this.positions[i3 + 1] = 0
            this.positions[i3 + 2] = radius * Math.sin(angle)

            this.scales[i] = Math.random()
        }

        this.geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3))
        this.geometry.setAttribute('aScale', new THREE.BufferAttribute(this.scales, 1))
    }

    setMaterial()
    {
        this.material = new THREE.RawShaderMaterial({
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            vertexColors: true,

            vertexShader: vertexShader,
            fragmentShader: fragmentShader,

            uniforms:
            {
                uTime: { value: 0.0 },
                uSize: { value: parameters.ring.particleSize * this.renderer.instance.getPixelRatio() }
            }
        })
    }

    setParticles()
    {
        this.particles = new THREE.Points(this.geometry, this.material)
        this.particles.rotation.x = parameters.ring.rotationX
        this.particles.rotation.y = parameters.ring.rotationY
        this.particles.rotation.z = parameters.ring.rotationZ
        this.scene.add(this.particles)
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
                .onChange(()=>{
                    this.setRing()
                })

            this.debugFolder
                .add(parameters.ring, 'rotationY')
                .min(-4)
                .max(4)
                .step(0.001)
                .onChange(()=>{
                    this.setRing()
                })

            this.debugFolder
                .add(parameters.ring, 'rotationZ')
                .min(-4)
                .max(4)
                .step(0.001)
                .onChange(()=>{
                    this.setRing()
                })
        }
    }
}