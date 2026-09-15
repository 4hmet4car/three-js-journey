import gsap from 'gsap'
import * as THREE from 'three'
import Experience from "../../Experience.js"
// console.log('ok')

import { PARTICLES } from '../../constants.js'
import { particlesParameters } from '../../parameters.js'
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
        this.debug = this.experience.debug
        this.time = this.experience.time

        this.setModels()
        this.extractModelPositionAttributes()
        this.normalizeModelPositionAttributeArrayLength()
        this.setRandomParticleSizes()
        this.setParticleIndex()

        this.setGeometry()
        this.setMaterial()
        this.setPoints()
        this.setDebug()
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
        this.maxCount = this.modelPositionAttributes.reduce((previous, current) =>
        {
            return previous < current.count ? current.count : previous
        }, 0)

        // this.maxCount = 0

        // for (const positionAttribute of this.modelPositionAttributes)
        // {
        //     if (positionAttribute.count > this.maxCount)
        //     {
        //         this.maxCount = positionAttribute.count
        //     }
        // }

        this.normalizedPositionAttributes = []

        for (const positionAttribute of this.modelPositionAttributes)
        {
            const originalPositionAttributeArray = positionAttribute.array

            if (positionAttribute.array.length !== this.maxCount)
            {
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
            } else
            {
                this.normalizedPositionAttributes.push(new THREE.Float32BufferAttribute(originalPositionAttributeArray, 3))
            }
        }

        // let cube = new Float32Array(this.maxCount * 3)
        // for (let i = 0; i < this.maxCount; i++)
        // {
        //     const i3 = i * 3
        //     cube[i3 + 0] = (Math.random() - 0.5) * 2
        //     cube[i3 + 1] = (Math.random() - 0.5) * 2
        //     cube[i3 + 2] = (Math.random() - 0.5) * 2
        // }
        // this.normalizedPositionAttributes.push(new THREE.Float32BufferAttribute(cube, 3))

        // console.log(this.normalizedPositionAttributes)
    }

    setRandomParticleSizes()
    {
        this.randomSizesArray = new Float32Array(this.maxCount)

        for (let i = 0; i < this.maxCount; i++)
        {
            this.randomSizesArray[i] = Math.random()
        }

        this.randomParticleSizeAttribute = new THREE.Float32BufferAttribute(this.randomSizesArray, 1)
    }

    setParticleIndex()
    {
        this.index = 0
    }

    setGeometry()
    {
        this.geometry = new THREE.BufferGeometry()
        this.geometry.setAttribute('position', this.normalizedPositionAttributes[this.index])
        this.geometry.setAttribute('aPositionTarget', this.normalizedPositionAttributes[3])
        this.geometry.setAttribute('aRandomSize', this.randomParticleSizeAttribute)
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
                uResolution: new THREE.Uniform(this.sizes.resolution),
                uProgress: new THREE.Uniform(particlesParameters.transitionProgress),
                uColorA: new THREE.Uniform(new THREE.Color(particlesParameters.colorA)),
                uColorB: new THREE.Uniform(new THREE.Color(particlesParameters.colorB)),
                uTime: new THREE.Uniform(0),
            }
        })
    }

    setPoints()
    {
        this.points = new THREE.Points(this.geometry, this.material)
        this.points.frustumCulled = false
        this.scene.add(this.points)
    }

    morph(index)
    {
        // Update attributes
        this.geometry.attributes.position = this.normalizedPositionAttributes[this.index]
        this.geometry.attributes.aPositionTarget = this.normalizedPositionAttributes[index]

        // Animate uProgress
        gsap.fromTo(
            particlesParameters,
            { transitionProgress: 0 },
            {
                transitionProgress: 1, duration: 3, ease: 'none', onUpdate: () =>
                {
                    this.material.uniforms.uProgress.value = particlesParameters.transitionProgress
                }
            }
        )

        // Save index
        this.index = index
    }

    morph0()
    {
        this.morph(0)
    }

    morph1()
    {
        this.morph(1)
    }

    morph2()
    {
        this.morph(2)
    }

    morph3()
    {
        this.morph(3)
    }

    setDebug()
    {
        if (this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder("Particles")

            this.debugFolder
                .addColor(particlesParameters, 'colorA')
                .onChange(() =>
                {
                    this.material.uniforms.uColorA.value.set(new THREE.Color(particlesParameters.colorA))
                })

            this.debugFolder
                .addColor(particlesParameters, 'colorB')
                .onChange(() =>
                {
                    this.material.uniforms.uColorA.value.set(new THREE.Color(particlesParameters.colorB))
                })

            this.debugFolder
                .add(particlesParameters, 'transitionProgress')
                .min(0)
                .max(1)
                .step(0.001)
                .onChange(() =>
                {
                    this.material.uniforms.uProgress.value = particlesParameters.transitionProgress
                })
                .listen()

            this.debugFolder
                .add(this, 'morph0')

            this.debugFolder
                .add(this, 'morph1')

            this.debugFolder
                .add(this, 'morph2')

            this.debugFolder
                .add(this, 'morph3')
        }
    }

    resize()
    {

    }

    update()
    {
        this.material.uniforms.uTime.value = this.time.secondsElapsed
    }
}