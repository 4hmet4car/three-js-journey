import * as THREE from 'three'

import Experience from "../Experience"
import parameters from "../parameters.js"

import Firework from "./Firework.js"

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

            firework.createFirework(
                parameters.fireworks.particleCount, // Count
                this.cursor.position,               // Position
                0.5,                                // Size
                this.textures[7],                   // Texture
                1,                                  // Sphere radius
                new THREE.Color('#8affff'),       // Particle color
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
        }
    }
}