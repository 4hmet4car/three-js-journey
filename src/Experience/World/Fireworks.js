import * as THREE from 'three'

import Experience from "../Experience.js"

import Firework from "./Firework.js"
import parameters from '../parameters.js'

export default class Fireworks
{
    constructor()
    {
        this.experience = new Experience()
        this.cursor = this.experience.cursor
        this.resources = this.experience.resources
        this.debug = this.experience.debug

        this.setDebug()
        this.setTextures()

        this.cursor.on('pointerdown', () =>
        {
            const firework = new Firework()

            const count = Math.round(400 + Math.random() * 5000)
            const size = 0.2 + Math.random() * 0.1
            const texture = this.textures[Math.floor(Math.random() * this.textures.length)]
            const radius = 3 + Math.random()
            const color = new THREE.Color()
            color.setHSL(Math.random(), 1, 0.7)

            firework.createFirework(
                count,                      // Count
                this.cursor.position,       // Position
                size,                       // Size
                texture,                    // Texture
                radius,                     // Sphere radius
                color,                      // Particle color
            )
        })

        // setInterval(() =>
        // {
        //     console.log(this.experience.renderer.instance.info.memory)
        // }, 1000)
    }

    setTextures()
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
    }

    setDebug()
    {
        if (this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder("Fireworks")

            this.debugFolder
                .add(parameters.fireworks, 'gravity')
                .min(0)
                .max(20)
        }
    }
}