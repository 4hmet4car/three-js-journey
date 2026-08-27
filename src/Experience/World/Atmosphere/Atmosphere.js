import * as THREE from 'three'

import Experience from "../../Experience.js"

import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'
import { ATMOSPHERE } from '../../constants.js'
import { atmosphereParameters } from '../../parameters.js'

export default class Atmosphere
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.resources = this.experience.resources
        this.sun = this.experience.world.sun
        this.earth = this.experience.world.earth
        this.debug = this.experience.debug

        //Setup
        this.setMaterial()
        this.setGeometry()
        this.setMesh()
        this.setDebug()
    }

    setMaterial()
    {
        this.material = new THREE.ShaderMaterial({
            side: THREE.BackSide,
            transparent: true,
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            uniforms: {
                uSunDirection: new THREE.Uniform(this.sun.direction),

                uAtmosphereDayColor: new THREE.Uniform(new THREE.Color(atmosphereParameters.atmosphereDayColor)),
                uAtmosphereTwilightColor: new THREE.Uniform(new THREE.Color(atmosphereParameters.atmosphereTwilightColor)),
            }
        })
    }

    setGeometry()
    {
        this.geometry = new THREE.SphereGeometry(
            ATMOSPHERE.GEOMETRY.RADIUS,
            ATMOSPHERE.GEOMETRY.WIDTH_SEGMENTS,
            ATMOSPHERE.GEOMETRY.HEIGHT_SEGMENTS
        )
    }

    setMesh()
    {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.scene.add(this.mesh)
    }

    setDebug()
    {
        if (this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder("Atmosphere")

            this.debugFolder
                .addColor(atmosphereParameters, 'atmosphereDayColor')
                .onChange(() =>
                {
                    this.material.uniforms.uAtmosphereDayColor.value.set(atmosphereParameters.atmosphereDayColor)
                    this.earth.material.uniforms.uAtmosphereDayColor.value.set(atmosphereParameters.atmosphereDayColor)
                })

            this.debugFolder
                .addColor(atmosphereParameters, 'atmosphereTwilightColor')
                .onChange(() =>
                {
                    this.material.uniforms.uAtmosphereTwilightColor.value.set(atmosphereParameters.atmosphereTwilightColor)
                    this.earth.material.uniforms.uAtmosphereTwilightColor.value.set(atmosphereParameters.atmosphereTwilightColor)
                })
        }
    }
}