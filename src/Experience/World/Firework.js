import * as THREE from 'three'

import Experience from "../Experience.js"

import vertexShader from "./shaders/firework/vertex.glsl"
import fragmentShader from "./shaders/firework/fragment.glsl"
import { FIREWORKS, PI } from '../constants.js'

import gsap from 'gsap'
import parameters from '../parameters.js'

export default class Firework
{
    constructor()
    {
        this.experience = new Experience()
        this.camera = this.experience.camera
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
    }

    createFirework(count, position, size, texture, radius, color)
    {
        this.setGeometry(count, radius)
        this.setMaterial(size, texture, color)
        this.setPoints(position)
    }

    setGeometry(count, radius)
    {
        // const spawnPosition = new THREE.Vector3(0, 0, 0)

        this.geometry = new THREE.BufferGeometry()

        const positionsArray = new Float32Array(count * 3)
        const sizesArray = new Float32Array(count)
        const timeMultipliersArray = new Float32Array(count)

        for (let i = 0; i < count; i++)
        {
            const i3 = i * 3

            const radiusWithVariation = radius * ((1 - FIREWORKS.GEOMETRY.RADIUS_VARIATION) + Math.random() * FIREWORKS.GEOMETRY.RADIUS_VARIATION)

            // This is the manual, rigorous method
            // const phi = Math.random() * PI // The polar angle in radians from the y (up) axis.
            const phi = Math.acos(2 * Math.random() - 1) // This phi gives better distribution on the poles.
            const theta = Math.random() * PI * 2 // The equator/azimuthal angle in radians around the y (up) axis.

            positionsArray[i3 + 0] = radiusWithVariation * Math.sin(phi) * Math.sin(theta)
            positionsArray[i3 + 1] = radiusWithVariation * Math.cos(phi)
            positionsArray[i3 + 2] = radiusWithVariation * Math.sin(phi) * Math.cos(theta)

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

            // Sice it is a multiplier you add 1 to make sure that it actually increases the number
            timeMultipliersArray[i] = 1 + Math.random()
        }

        const positionAttribute = new THREE.BufferAttribute(positionsArray, 3)
        const sizeAttribute = new THREE.BufferAttribute(sizesArray, 1)
        const timeMultiplierAttribute = new THREE.BufferAttribute(timeMultipliersArray, 1)
        this.geometry.setAttribute('position', positionAttribute)
        this.geometry.setAttribute('aSize', sizeAttribute)
        this.geometry.setAttribute('aTimeMultiplier', timeMultiplierAttribute)
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
                uGravity: new THREE.Uniform(parameters.fireworks.gravity),
            }
        })

        // Animate
        gsap.to(
            this.material.uniforms.uProgress,
            { value: 1, duration: 3, ease: 'none', onComplete: () => { this.destroy() } }
        )
    }

    setPoints(position)
    {
        const spawnDepth = (1 - FIREWORKS.GEOMETRY.SPAWN_DEPTH_VARIATION) + (Math.random() * FIREWORKS.GEOMETRY.SPAWN_DEPTH_VARIATION)
        const spawnPosition = new THREE.Vector3(position.x, position.y, spawnDepth)
        spawnPosition.unproject(this.camera.instance)
        
        this.firework = new THREE.Points(this.geometry, this.material)
        this.firework.position.copy(spawnPosition)
        this.scene.add(this.firework)
    }

    destroy()
    {
        this.geometry?.dispose() // This is optional chaining, here doesn't make sense but i thought it was a cool syntax
        this.material?.dispose() // This is optional chaining, here doesn't make sense but i thought it was a cool syntax
        this.scene.remove(this.firework)

        this.experience = null
        this.camera = null
        this.sizes = null
        this.scene = null
        this.geometry = null
        this.material = null
        this.firework = null
    }
}