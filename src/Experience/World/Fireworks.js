import * as THREE from 'three'

import Experience from "../Experience.js"
import parameters from "../parameters.js"

import vertexShader from "./shaders/firework/vertex.glsl"
import fragmentShader from "./shaders/firework/fragment.glsl"
import { FIREWORKS, PI } from '../constants.js'

export default class Fireworks
{
    constructor()
    {
        this.experience = new Experience()
        this.cursor = this.experience.cursor
        this.camera = this.experience.camera
        this.resources = this.experience.resources
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.debug = this.experience.debug

        this.setTextures()
        this.setDebug()


        // this.cursor.on('pointerdown', () =>
        // {
        //     this.createFirework(
        //         parameters.fireworks.particleCount, // Count
        //         this.cursor.position,               // Position
        //         0.5,                                // Size
        //         this.textures[7],                                  // Texture
        //     )
        // })

        this.createFirework(
            parameters.fireworks.particleCount, // Count
            this.cursor.position,               // Position
            0.5,                                // Size
            this.textures[7],                                  // Texture
        )
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
        // const spawnDepth = FIREWORKS.GEOMETRY.SPAWN_DEPTH + Math.random() * (1 - FIREWORKS.GEOMETRY.SPAWN_DEPTH)
        // const spawnPosition = new THREE.Vector3(position.x, position.y, spawnDepth)
        // spawnPosition.unproject(this.camera.instance)

        const spawnPosition = new THREE.Vector3(0, 0, 0)

        this.geometry = new THREE.BufferGeometry()

        const positionsArray = new Float32Array(count * 3)
        const sizesArray = new Float32Array(count)

        for (let i = 0; i < count; i++)
        {
            const i3 = i * 3

            const radius = 1
            const theta = Math.random() * PI * 2
            const phi = Math.random() * PI

            positionsArray[i3 + 0] = spawnPosition.x + radius * Math.cos(theta) * Math.cos(phi)
            positionsArray[i3 + 1] = spawnPosition.y + radius * Math.cos(theta) * Math.sin(phi)
            positionsArray[i3 + 2] = spawnPosition.z + radius * Math.sin(theta)

            sizesArray[i] = Math.random()
        }

        const positionAttribute = new THREE.BufferAttribute(positionsArray, 3)
        const sizeAttribute = new THREE.BufferAttribute(sizesArray, 1)
        this.geometry.setAttribute('position', positionAttribute)
        this.geometry.setAttribute('aSize', sizeAttribute)
    }

    setMaterial(size, texture)
    {
        texture.flipY = false // You flip it because uv maps of points are inverted
        
        this.material = new THREE.ShaderMaterial({
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            uniforms: {
                uParticleSize: new THREE.Uniform(size),
                uResolution: new THREE.Uniform(this.sizes.resolution),
                uTexture: new THREE.Uniform(texture)
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