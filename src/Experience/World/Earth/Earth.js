import * as THREE from 'three'

import Experience from "../../Experience.js"

import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'
import { EARTH } from '../../constants.js'
import { earthParameters, atmosphereParameters } from '../../parameters.js'

export default class Earth
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.resources = this.experience.resources
        this.sun = this.experience.world.sun
        this.debug = this.experience.debug

        //Setup
        this.setTextures()
        this.setMaterial()
        this.setGeometry()
        this.setMesh()
        this.setDebug()
    }

    setTextures()
    {
        this.earthDayTexture = this.resources.items.earthDayTexture
        this.earthDayTexture.colorSpace = THREE.SRGBColorSpace
        this.earthDayTexture.anisotropy = 8

        this.earthNightTexture = this.resources.items.earthNightTexture
        this.earthNightTexture.colorSpace = THREE.SRGBColorSpace
        this.earthNightTexture.anisotropy = 8

        this.earthSpecularCloudsTexture = this.resources.items.earthSpecularCloudsTexture
        this.earthSpecularCloudsTexture.anisotropy = 8
    }

    setMaterial()
    {
        this.material = new THREE.ShaderMaterial({
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            uniforms: {
                uEarthDayTexture: new THREE.Uniform(this.earthDayTexture),
                uEarthNightTexture: new THREE.Uniform(this.earthNightTexture),
                uEarthSpecularCloudsTexture: new THREE.Uniform(this.earthSpecularCloudsTexture),

                uSunDirection: new THREE.Uniform(this.sun.direction),

                uAtmosphereDayColor: new THREE.Uniform(new THREE.Color(atmosphereParameters.atmosphereDayColor)),
                uAtmosphereTwilightColor: new THREE.Uniform(new THREE.Color(atmosphereParameters.atmosphereTwilightColor)),
            }
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

    setDebug()
    {
        if (this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder("Earth")

            this.debugFolder
                .add(earthParameters, 'minutesPerDay')
                .min(1)
                .max(1440)
        }
    }

    update()
    {
        const coswt = Math.cos(EARTH.ANIMATION.ANGULAR_ROTATION_SPEED * this.time.secondsElapsed / earthParameters.minutesPerDay) 
        const sinwt = Math.sin(EARTH.ANIMATION.ANGULAR_ROTATION_SPEED * this.time.secondsElapsed / earthParameters.minutesPerDay) 
        const rotationMatrix = new THREE.Matrix4(
            coswt, 0, sinwt, 0,
            0, 1, 0, 0,
            -sinwt, 0, coswt, 0,
            0, 0, 0, 1,
        )
        this.mesh.setRotationFromMatrix(rotationMatrix)
    }

}