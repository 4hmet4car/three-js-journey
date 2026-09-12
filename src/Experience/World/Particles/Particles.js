import * as THREE from 'three'
import Experience from "../../Experience.js"
// import gsap from 'gsap'
// console.log('ok')

import { PARTICLES } from '../../constants.js'
import particlesFragmentShader from './shaders/fragment.glsl'
import particlesVertexShader from './shaders/vertex.glsl'

export default class Particles
{
    constructor()
    {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.setModels()
        this.extractModelPositionAttributes()
        this.normalizeModelPositionAttributeArrayLength()

        this.setGeometry()
        this.setMaterial()
        this.setPoints()
    }

    setModels()
    {
        this.models = this.resources.items.models.scene.children
    }

    extractModelPositionAttributes()
    {
        this.modelPositionAttributes = this.models.map((model) =>
        {
            return model.geometry.attributes.position
        })

        // This is an alternative way of writing the same thing
        // this.modelPositionAttributes = this.models.map(model => model.geometry.attributes.position)
    }

    normalizeModelPositionAttributeArrayLength()
    {
        this.maxCount = 0

        for (const positionAttribute of this.modelPositionAttributes)
        {
            if (positionAttribute.count > this.maxCount)
            {
                this.maxCount = positionAttribute.count
            }
        }

        this.normalizedPositionAttributes = []

        for (const positionAttribute of this.modelPositionAttributes)
        {
            const originalPositionAttributeArray = positionAttribute.array
            const newPositionAttributeArray = new Float32Array(this.maxCount * 3)

            for (let i = 0; i < this.maxCount; i++)
            {
                const i3 = i * 3

                if (i3 < originalPositionAttributeArray.length)
                {
                    newPositionAttributeArray[i3 + 0] = originalPositionAttributeArray[i3 + 0]
                    newPositionAttributeArray[i3 + 1] = originalPositionAttributeArray[i3 + 1]
                    newPositionAttributeArray[i3 + 2] = originalPositionAttributeArray[i3 + 2]
                }
                else    
                {   
                    const randomIndex = Math.floor(Math.random() * positionAttribute.count) * 3

                    newPositionAttributeArray[i3 + 0] = originalPositionAttributeArray[randomIndex + 0]
                    newPositionAttributeArray[i3 + 1] = originalPositionAttributeArray[randomIndex + 1]
                    newPositionAttributeArray[i3 + 2] = originalPositionAttributeArray[randomIndex + 2]
                }
            }

            this.normalizedPositionAttributes.push(new THREE.Float32BufferAttribute(newPositionAttributeArray, 3))
        }

        console.log(this.normalizedPositionAttributes)
    }

    setGeometry()
    {
        this.geometry = new THREE.BufferGeometry()
        this.geometry.setAttribute('position', this.normalizedPositionAttributes[1])
    }

    setMaterial()
    {
        this.material = new THREE.ShaderMaterial({
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            vertexShader: particlesVertexShader,
            fragmentShader: particlesFragmentShader,
            uniforms:
            {
                uSize: new THREE.Uniform(PARTICLES.MATERIAL.PARTICLE_SIZE),
                uResolution: new THREE.Uniform(this.sizes.resolution)
            }
        })
    }

    setPoints()
    {
        this.points = new THREE.Points(this.geometry, this.material)
        this.scene.add(this.points)
    }

    resize()
    {

    }

    update()
    {

    }
}