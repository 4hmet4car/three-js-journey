import * as THREE from 'three'
import Experience from "../../Experience.js"

import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'
import { PARTICLES } from "../../constants.js"
import Displacement from './Displacement.js'

export default class Particles
{
    constructor()
    {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        // Setup
        this.setDisplacement()
        this.setTexture()
        this.setMaterial()
        this.setGeometry()
        this.setMesh()
    }

    setDisplacement(){
        this.displacement = new Displacement()
    }

    setTexture()
    {
        this.pictureTexture = this.resources.items.pictureTexture1
    }

    setMaterial()
    {
        this.material = new THREE.ShaderMaterial({
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            uniforms:
            {
                uResolution: new THREE.Uniform(this.sizes.resolution),
                uPictureTexture: new THREE.Uniform(this.pictureTexture),
            }
        })
    }

    setGeometry()
    {
        this.geometry = new THREE.PlaneGeometry(
            PARTICLES.GEOMETRY.WIDTH,
            PARTICLES.GEOMETRY.HEIGHT,
            PARTICLES.GEOMETRY.WIDTH_SEGMENTS,
            PARTICLES.GEOMETRY.HEIGHT_SEGMENTS,
        )
    }

    setMesh()
    {
        this.particles = new THREE.Points(this.geometry, this.material)
        this.scene.add(this.particles)
    }

    resize()
    {

    }

    update()
    {

    }
}