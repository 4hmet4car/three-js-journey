import * as THREE from 'three'

import Experience from "../../Experience.js"

import earthVertexShader from './shaders/earth/vertex.glsl'
import earthFragmentShader from './shaders/earth/fragment.glsl'
import { EARTH } from '../../constants.js'

export default class Earth
{
    constructor()
    {
        this.experience = new Experience()
        this.scene =  this.experience.scene
        this.time = this.experience.time

        //Setup
        this.setMaterial()
        this.setGeometry()
        this.setMesh()
    }

    setMaterial()
    {
        this.material = new THREE.ShaderMaterial({
            vertexShader: earthVertexShader,
            fragmentShader: earthFragmentShader,
            uniforms: {}
        })
    }

    setGeometry()
    {
        this.geometry = new THREE.SphereGeometry(
            EARTH.GEOMETRY.RADIUS,
            EARTH.GEOMETRY.WIDTH_SEGMENTS,
            EARTH.GEOMETRY.HEIGHT_SEGMENTS
        )
    }

    setMesh()
    {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.scene.add(this.mesh)
    }

    update(){
        this.mesh.rotation.y = this.time.secondsElapsed * EARTH.ANIMATION.ROTATION_SPEED_Y
    }

}