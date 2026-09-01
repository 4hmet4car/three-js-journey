import * as THREE from 'three'
import Experience from "../../Experience.js"

import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'
import { PARTICLES } from "../../constants.js"
import Displacement from './Displacement.js'
import { particlesParameters } from '../../parameters.js'

export default class Particles
{
    constructor()
    {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.debug = this.experience.debug

        // Setup
        this.setDisplacement()
        this.setTexture()
        this.setGeometry()
        this.setMaterial()
        this.setMesh()
        this.setDebug()
    }

    setDisplacement()
    {
        this.displacement = new Displacement()
    }

    setTexture()
    {
        this.pictureTexture = this.resources.items['pictureTexture' + particlesParameters.pictureTexture]
    }

    setGeometry()
    {
        this.geometry = new THREE.PlaneGeometry(
            PARTICLES.GEOMETRY.WIDTH,
            PARTICLES.GEOMETRY.HEIGHT,
            PARTICLES.GEOMETRY.WIDTH_SEGMENTS,
            PARTICLES.GEOMETRY.HEIGHT_SEGMENTS,
        )

        this.geometry.setIndex(null)
        this.geometry.deleteAttribute('normal')
    }

    setMaterial()
    {
        this.intensitiesArray = new Float32Array(this.geometry.attributes.position.count)
        this.anglesArray = new Float32Array(this.geometry.attributes.position.count)

        for (let i = 0; i < this.geometry.attributes.position.count; i++)
        {
            this.intensitiesArray[i] = Math.random()
            this.anglesArray[i] = Math.random() * Math.PI * 2
        }

        this.intensitiesAttribute = new THREE.BufferAttribute(this.intensitiesArray, 1)
        this.anglesAttribute = new THREE.BufferAttribute(this.anglesArray, 1)

        this.geometry.setAttribute('aIntensity', this.intensitiesAttribute)
        this.geometry.setAttribute('aAngle', this.anglesAttribute)

        this.material = new THREE.ShaderMaterial({
            // blending: THREE.AdditiveBlending,
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            uniforms:
            {
                uResolution: new THREE.Uniform(this.sizes.resolution),
                uPictureTexture: new THREE.Uniform(this.pictureTexture),
                uDisplacementTexture: new THREE.Uniform(this.displacement.texture),
            }
        })
    }

    setMesh()
    {
        this.particles = new THREE.Points(this.geometry, this.material)
        this.scene.add(this.particles)
    }


    setDebug()
    {
        if (this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder("Particles")

            this.debugFolder
                .add(particlesParameters, 'pictureTexture', [1, 2, 3, 4])
                .onChange((selection) =>
                {
                    this.material.uniforms.uPictureTexture.value = this.resources.items['pictureTexture' + selection]
                })
        }
    }

    resize()
    {

    }

    update()
    {
        this.displacement.update()
    }
}