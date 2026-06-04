import * as THREE from 'three'

import Experience from "../Experience.js"
import parameters from "../parameters.js"

import vertexShader from "./shaders/firework/vertex.glsl"
import fragmentShader from "./shaders/firework/fragment.glsl"

export default class Fireworks
{
    constructor()
    {
        this.experience = new Experience()
        this.cursor = this.experience.cursor
        this.resources = this.experience.resources
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.debug = this.experience.debug

        this.cursor.on('pointerdown', () =>
        {
            this.createFirework(
                parameters.fireworks.particleCount, // Count
                this.cursor.position,               // Position
                0.5,                                // Size
                7,                                  // Texture
            )
        })

        this.setDebug()
    }

    createFirework(count, position, size, texture)
    {
        if (this.firework !== undefined)
        {
            this.geometry.dispose()
            this.material.dispose()
            this.scene.remove(this.firework)
        }

        this.setGeometry(count, position)
        this.setMaterial(size, texture)
        this.setPoints()
    }

    setGeometry(count, position)
    {
        this.geometry = new THREE.BufferGeometry()

        this.positions = new Float32Array(count * 3)

        for (let i = 0; i < count; i++)
        {
            const i3 = i * 3

            this.positions[i3 + 0] = Math.random() - 0.5
            this.positions[i3 + 1] = Math.random() - 0.5
            this.positions[i3 + 2] = Math.random() - 0.5
        }

        this.positionAttribute = new THREE.BufferAttribute(this.positions, 3)
        this.geometry.setAttribute('position', this.positionAttribute)
    }

    setMaterial(size, texture)
    {
        this.textures = [
            this.resources.items.particleTexture1,
            this.resources.items.particleTexture2,
            this.resources.items.particleTexture3,
            this.resources.items.particleTexture4,
            this.resources.items.particleTexture5,
            this.resources.items.particleTexture6,
            this.resources.items.particleTexture7,
            this.resources.items.particleTexture8,
        ]

        this.material = new THREE.ShaderMaterial({
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            uniforms: {
                uParticleSize: new THREE.Uniform(size),
                uResolution: new THREE.Uniform(this.sizes.resolution),
                uTexture: new THREE.Uniform(this.textures[texture])
            }
        })
    }

    setPoints()
    {
        this.firework = new THREE.Points(this.geometry, this.material)
        this.scene.add(this.firework)
    }

    setDebug()
    {
        if (this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder("Fireworks")
        }
    }
}