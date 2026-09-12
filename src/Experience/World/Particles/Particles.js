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

        this.setMaterial()
        this.setGeometry()
        this.setPoints()
    }

    setGeometry()
    {
        this.geometry = new THREE.SphereGeometry(PARTICLES.GEOMETRY.SPHERE_RADIUS)
    }

    setMaterial()
    {
        this.material = new THREE.ShaderMaterial({
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