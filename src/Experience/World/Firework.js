import * as THREE from 'three'

import Experience from "../Experience.js"
import parameters from "../parameters.js"

import vertexShader from "./shaders/firework/vertex.glsl"
import fragmentShader from "./shaders/firework/fragment.glsl"
import { FIREWORKS, PI } from '../constants.js'

import gsap from 'gsap'

export default class Firework
{
    constructor()
    {
        this.experience = new Experience()
        this.cursor = this.experience.cursor
        this.camera = this.experience.camera
        this.resources = this.experience.resources
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
    }

    createFirework(count, position, size, texture, radius, color)
    {
        this.setGeometry(count, position, radius)
        this.setMaterial(size, texture, color)
        this.setPoints()
    }

    setGeometry(count, position, radius)
    {
        const spawnDepth = (1 - FIREWORKS.GEOMETRY.SPAWN_DEPTH_VARIATION) + (Math.random() * FIREWORKS.GEOMETRY.SPAWN_DEPTH_VARIATION)
        const spawnPosition = new THREE.Vector3(position.x, position.y, spawnDepth)
        spawnPosition.unproject(this.camera.instance)

        // const spawnPosition = new THREE.Vector3(0, 0, 0)

        this.geometry = new THREE.BufferGeometry()

        const positionsArray = new Float32Array(count * 3)
        const sizesArray = new Float32Array(count)

        for (let i = 0; i < count; i++)
        {
            const i3 = i * 3

            const radiusWithVariation = radius * ((1 - FIREWORKS.GEOMETRY.RADIUS_VARIATION) + Math.random() * FIREWORKS.GEOMETRY.RADIUS_VARIATION)

            // This is the manual, rigorous method
            const phi = Math.random() * PI
            const theta = Math.random() * PI * 2

            positionsArray[i3 + 0] = spawnPosition.x + radiusWithVariation * Math.cos(theta) * Math.cos(phi)
            positionsArray[i3 + 1] = spawnPosition.y + radiusWithVariation * Math.cos(theta) * Math.sin(phi)
            positionsArray[i3 + 2] = spawnPosition.z + radiusWithVariation * Math.sin(theta)

            // // This is the spherical method
            // const phi = Math.random() * PI
            // const theta = Math.random() * PI * 2
            // const spherical = new THREE.Spherical(radiusWithVariation, phi, theta)
            // const position = new THREE.Vector3()
            // position.setFromSpherical(spherical)

            // positionsArray[i3 + 0] = spawnPosition.x + position.x
            // positionsArray[i3 + 1] = spawnPosition.y + position.y
            // positionsArray[i3 + 2] = spawnPosition.z + position.z

            sizesArray[i] = Math.random()
        }

        const positionAttribute = new THREE.BufferAttribute(positionsArray, 3)
        const sizeAttribute = new THREE.BufferAttribute(sizesArray, 1)
        this.geometry.setAttribute('position', positionAttribute)
        this.geometry.setAttribute('aSize', sizeAttribute)
    }

    setMaterial(size, texture, color)
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
                uTexture: new THREE.Uniform(texture),
                uColor: new THREE.Uniform(color),
                uProgress: new THREE.Uniform(0),
            }
        })

        // Animate
        gsap.to(
            this.material.uniforms.uProgress,
            { value: 1, duration: 3, ease: 'none', onComplete: () => { this.destroy() } }
        )
    }

    setPoints()
    {
        this.firework = new THREE.Points(this.geometry, this.material)
        this.scene.add(this.firework)
    }

    destroy()
    {
        this.geometry?.dispose() // This is optional chaining, here doesn't make sense but i thought it was a cool syntax
        this.material?.dispose() // This is optional chaining, here doesn't make sense but i thought it was a cool syntax
        this.scene.remove(this.firework)
    }
}