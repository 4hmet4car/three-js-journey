import * as THREE from 'three'

import Experience from "../../Experience.js";
import constants from '../../constants.js'
import parameters from '../../parameters.js';

import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'

export default class Water
{
    constructor()
    {
        this.experience = new Experience()
        this.time = this.experience.time
        this.scene = this.experience.scene
        this.debug = this.experience.debug

        //Debug
        if (this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder("Water")
        }

        this.setGeometry()
        this.setTextures()
        this.setMaterial()
        this.setMesh()
    }
    setGeometry()
    {
        this.geometry = new THREE.PlaneGeometry(constants.WATER_SCALE_X,constants.WATER_SCALE_Z, constants.WATER_SUBDIVISIONS_X, constants.WATER_SUBDIVISIONS_Z)
    }
    setTextures()
    {

    }
    setMaterial()
    {
        this.colors = {}
        this.colors.depthColor = parameters.depthColor
        this.colors.surfaceColor = parameters.surfaceColor

        this.material = new THREE.ShaderMaterial({
            transparent: true,
            side: THREE.DoubleSide,
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            uniforms: {
                uPI: { value: constants.PI },

                uTime: { value: 0 },

                uBigWavesElevation: { value: parameters.bigWavesElevation },
                uBigWavesFrequency: { value: new THREE.Vector2(parameters.bigWavesFrequencyX, parameters.bigWavesFrequencyZ) },
                uBigWavesSpeed: { value: parameters.bigWavesSpeed },

                uSmallWavesElevation: { value: parameters.smallWavesElevation },
                uSmallWavesFrequency: { value: parameters.smallWavesFrequency },
                uSmallWavesSpeed: { value: parameters.smallWavesSpeed },
                uSmallWavesIterations: { value: parameters.smallWavesIterations },

                uDepthColor: { value: new THREE.Color(this.colors.depthColor) },
                uSurfaceColor: { value: new THREE.Color(this.colors.surfaceColor) },
                uColorOffset: { value: parameters.colorOffset },
                uColorMultiplier: { value: parameters.colorMultiplier },
            }
        })

        //Debug
        if (this.debug.active)
        {
            this.debugFolder
                .add(this.material.uniforms.uBigWavesElevation, 'value')
                .min(0)
                .max(1)
                .step(0.001)
                .name('uBigWavesElevation')
                .onChange((value) =>
                {
                    parameters.bigWavesElevation = value
                })

            this.debugFolder
                .add(this.material.uniforms.uBigWavesFrequency.value, 'x')
                .min(0)
                .max(10)
                .step(0.001)
                .name('uBigWavesFrequencyX')
                .onChange((value) =>
                {
                    parameters.bigWavesFrequencyX = value
                })

            this.debugFolder
                .add(this.material.uniforms.uBigWavesFrequency.value, 'y')
                .min(0)
                .max(10)
                .step(0.001)
                .name('uBigWavesFrequencyZ')
                .onChange((value) =>
                {
                    parameters.bigWavesFrequencyZ = value
                })

            this.debugFolder
                .add(this.material.uniforms.uBigWavesSpeed, 'value')
                .min(0)
                .max(4)
                .step(0.001)
                .name('uBigWavesSpeed')
                .onChange((value) =>
                {
                    parameters.bigWavesSpeed = value
                })

            this.debugFolder
                .addColor(this.colors, 'depthColor')
                .name('depthColor')
                .onChange((value) =>
                {
                    this.material.uniforms.uDepthColor.value.set(this.colors.depthColor)
                    parameters.depthColor = value
                })

            this.debugFolder
                .addColor(this.colors, 'surfaceColor')
                .name('surfaceColor')
                .onChange((value) =>
                {
                    this.material.uniforms.uSurfaceColor.value.set(this.colors.surfaceColor)
                    parameters.surfaceColor = value
                })

            this.debugFolder
                .add(this.material.uniforms.uColorOffset, 'value')
                .min(-1)
                .max(1)
                .step(0.001)
                .name('uColorOffset')
                .onChange((value) =>
                {
                    parameters.colorOffset = value
                })

            this.debugFolder
                .add(this.material.uniforms.uColorMultiplier, 'value')
                .min(0)
                .max(10)
                .step(0.001)
                .name('uColorMultiplier')
                .onChange((value) =>
                {
                    parameters.colorMultiplier = value
                })

            this.debugFolder
                .add(this.material.uniforms.uSmallWavesElevation, 'value')
                .min(0)
                .max(0.5)
                .step(0.001)
                .name('uSmallWavesElevation')
                .onChange((value) =>
                {
                    parameters.smallWavesElevation = value
                })

            this.debugFolder
                .add(this.material.uniforms.uSmallWavesFrequency, 'value')
                .min(1)
                .max(10)
                .step(0.001)
                .name('uSmallWavesFrequenct')
                .onChange((value) =>
                {
                    parameters.smallWavesFrequency = value
                })

            this.debugFolder
                .add(this.material.uniforms.uSmallWavesIterations, 'value')
                .min(0)
                .max(10)
                .step(1)
                .name('uSmallWavesIterations')
                .onChange((value) =>
                {
                    parameters.smallWavesIterations = value
                })

            this.debugFolder
                .add(this.material.uniforms.uSmallWavesSpeed, 'value')
                .min(0)
                .max(5)
                .step(0.001)
                .name('uSmallWavesSpeed')
                .onChange((value) =>
                {
                    parameters.smallWavesSpeed = value
                })
        }

    }
    setMesh()
    {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.rotation.x = -Math.PI * 0.5
        this.scene.add(this.mesh)
    }

    update()
    {
        this.material.uniforms.uTime.value = this.time.secondsElapsed
    }
}
