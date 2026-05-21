import * as THREE from 'three'

import Experience from "../../Experience.js"

import parameters from "../../parameters.js"
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'

export default class Galaxy
{
    constructor()
    {
        this.experience = new Experience()
        this.time = this.experience.time
        this.scene = this.experience.scene
        this.renderer = this.experience.renderer
        this.debug = this.experience.debug

        this.generateGalaxy()
        this.setDebug()
    }

    generateGalaxy()
    {
        if (this.points !== undefined)
        {
            this.geometry.dispose()
            this.material.dispose()
            this.scene.remove(this.points)
        }

        this.setGeometry()
        this.setMaterial()
        this.setPoints()
    }

    setGeometry()
    {
        this.geometry = new THREE.BufferGeometry()

        this.positions = new Float32Array(parameters.galaxy.particleCount * 3)
        this.colors = new Float32Array(parameters.galaxy.particleCount * 3)
        this.scales = new Float32Array(parameters.galaxy.particleCount)
        this.randomness = new Float32Array(parameters.galaxy.particleCount * 3)

        this.insideColor = new THREE.Color(parameters.galaxy.insideColor)
        this.outsideColor = new THREE.Color(parameters.galaxy.outsideColor)

        for (let i = 0; i < parameters.galaxy.particleCount; i++)
        {
            const i3 = i * 3

            // Position
            const radius = Math.random() * parameters.galaxy.branchRadius
            const spinAngle = radius * parameters.galaxy.branchSpin
            const branchAngle = (i % parameters.galaxy.branches) / parameters.galaxy.branches * Math.PI * 2

            this.positions[i3] = Math.cos(branchAngle + spinAngle) * radius
            this.positions[i3 + 1] = 0
            this.positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius

            // Randomness
            const randomX = Math.pow(Math.random(), parameters.galaxy.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * parameters.galaxy.randomness * radius
            const randomY = Math.pow(Math.random(), parameters.galaxy.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * parameters.galaxy.randomness * radius
            const randomZ = Math.pow(Math.random(), parameters.galaxy.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * parameters.galaxy.randomness * radius

            this.randomness[i3] = randomX
            this.randomness[i3 + 1] = randomY
            this.randomness[i3 + 2] = randomZ

            // Color
            const mixedColor = this.insideColor.clone()
            mixedColor.lerp(this.outsideColor, radius / parameters.galaxy.branchRadius)

            this.colors[i3] = mixedColor.r
            this.colors[i3 + 1] = mixedColor.g
            this.colors[i3 + 2] = mixedColor.b

            // Size
            this.scales[i] = Math.random()
        }

        this.geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3))
        this.geometry.setAttribute('color', new THREE.BufferAttribute(this.colors, 3))
        this.geometry.setAttribute('aScale', new THREE.BufferAttribute(this.scales, 1))
        this.geometry.setAttribute('aRandomness', new THREE.BufferAttribute(this.randomness, 3))

    }

    setMaterial()
    {
        this.material = new THREE.ShaderMaterial({
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            vertexColors: true,

            vertexShader: vertexShader,
            fragmentShader: fragmentShader,

            uniforms:
            {
                uTime: { value: 0.0 },
                uSize: { value: parameters.galaxy.particleSize * this.renderer.instance.getPixelRatio() }
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
            this.debugFolder = this.debug.ui.addFolder("Galaxy")

            this.debugFolder.add(parameters.galaxy, 'particleCount').min(100).max(1000000).step(100).onFinishChange(() => { this.generateGalaxy() })
            this.debugFolder.add(parameters.galaxy, 'particleSize').min(0).max(30).step(0.001).onFinishChange(() => { this.generateGalaxy() })
            this.debugFolder.add(parameters.galaxy, 'branchRadius').min(0.01).max(50).step(0.01).onFinishChange(() => { this.generateGalaxy() })
            this.debugFolder.add(parameters.galaxy, 'branches').min(2).max(20).step(1).onFinishChange(() => { this.generateGalaxy() })
            this.debugFolder.add(parameters.galaxy, 'branchSpin').min(0).max(1).step(0.001).onFinishChange(() => { this.generateGalaxy() })
            this.debugFolder.add(parameters.galaxy, 'randomness').min(0).max(2).step(0.001).onFinishChange(() => { this.generateGalaxy() })
            this.debugFolder.add(parameters.galaxy, 'randomnessPower').min(1).max(10).step(0.001).onFinishChange(() => { this.generateGalaxy() })
            this.debugFolder.addColor(parameters.galaxy, 'insideColor').onFinishChange(() => { this.generateGalaxy() })
            this.debugFolder.addColor(parameters.galaxy, 'outsideColor').onFinishChange(() => { this.generateGalaxy() })
        }
    }

    update()
    {
        this.material.uniforms.uTime.value = this.time.secondsElapsed
    }
}