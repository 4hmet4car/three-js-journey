import * as THREE from 'three'
import Experience from '../Experience.js'

import parameters from '../parameters.js'
import EventEmitter from './EventEmitter.js'

export default class RotationMatrix extends EventEmitter
{
    constructor()
    {
        super()

        this.experience = new Experience()
        this.debug = this.experience.debug

        this.setRotationMatrix()
        this.setDebug()
    }

    setRotationMatrix()
    {
        // Tait-Bryan ZYX convention
        this.cosAlpha = Math.cos(parameters.planet.rotationX)
        this.sinAlpha = Math.sin(parameters.planet.rotationX)
        this.cosBeta = Math.cos(parameters.planet.rotationY)
        this.sinBeta = Math.sin(parameters.planet.rotationY)
        this.cosTheta = Math.cos(parameters.planet.rotationZ)
        this.sinTheta = Math.sin(parameters.planet.rotationZ)

        this.rotationMatrix = new THREE.Matrix4()
        this.rotationMatrix.set(
            this.cosBeta * this.cosTheta,
            this.sinAlpha * this.sinBeta * this.cosTheta - this.cosAlpha * this.sinTheta,
            this.cosAlpha * this.sinBeta * this.cosTheta + this.sinAlpha * this.sinTheta,
            0,

            this.cosBeta * this.sinTheta,
            this.sinAlpha * this.sinBeta * this.sinTheta + this.cosAlpha * this.cosTheta,
            this.cosAlpha * this.sinBeta * this.sinTheta - this.sinAlpha * this.cosTheta,
            0,

            -this.sinBeta,
            this.sinAlpha * this.cosBeta,
            this.cosAlpha * this.cosBeta,
            0,

            0, 0, 0, 1
        )
    }

    setDebug()
    {
        if (this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('Rotation')

            this.debugFolder
                .add(parameters.planet, 'rotationX')
                .min(-4)
                .max(4)
                .step(0.001)
                .onChange(() =>
                {
                    this.setRotationMatrix()
                    this.trigger('rotation')
                })

            this.debugFolder
                .add(parameters.planet, 'rotationY')
                .min(-4)
                .max(4)
                .step(0.001)
                .onChange(() =>
                {
                    this.setRotationMatrix()
                    this.trigger('rotation')
                })

            this.debugFolder
                .add(parameters.planet, 'rotationZ')
                .min(-4)
                .max(4)
                .step(0.001)
                .onChange(() =>
                {
                    this.setRotationMatrix()
                    this.trigger('rotation')
                })
        }
    }
}