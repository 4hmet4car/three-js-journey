import * as THREE from 'three'
import Experience from "../../Experience.js"
import { WATER, PI } from "../../constants.js"
import parameters from '../../parameters.js'

import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'

export default class Water
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.debug = this.experience.debug

        this.setGeometry()
        this.setMaterial()
        this.setMesh()
        this.setDebug()
    }

    setGeometry()
    {
        this.geometry = new THREE.PlaneGeometry(
            WATER.GEOMETRY.SCALE_X,
            WATER.GEOMETRY.SCALE_Z,
            WATER.GEOMETRY.SUBDIVISIONS_X,
            WATER.GEOMETRY.SUBDIVISIONS_Z
        )
    }

    setMaterial()
    {
        this.material = new THREE.ShaderMaterial({
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            uniforms:
            {
                uTime: { value: 0 },

                uBigWavesElevation: new THREE.Uniform(parameters.water.bigWavesElevation),
                uBigWavesFrequency: new THREE.Uniform(parameters.water.bigWavesFrequency),
                uBigWavesSpeed: new THREE.Uniform(parameters.water.bigWavesSpeed),

                uSmallWavesElevation: new THREE.Uniform(parameters.water.smallWavesElevation),
                uSmallWavesFrequency: new THREE.Uniform(parameters.water.smallWavesFrequency),
                uSmallWavesSpeed: new THREE.Uniform(parameters.water.smallWavesSpeed),
                uSmallIterations: new THREE.Uniform(parameters.water.smallIterations),

                uDepthColor: new THREE.Uniform(new THREE.Color(parameters.water.depthColor)),
                uSurfaceColor: new THREE.Uniform(new THREE.Color(parameters.water.surfaceColor)),
                uColorOffset: new THREE.Uniform(parameters.water.colorOffset),
                uColorMultiplier: new THREE.Uniform(parameters.water.colorMultiplier),
            }
        })
    }

    setMesh()
    {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.rotation.x = - PI * 0.5
        this.scene.add(this.mesh)
    }

    setDebug()
    {
        if (this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder("Water")

            this.debugFolder
                .addColor(parameters.water, 'depthColor')
                .name('depthColor')
                .onChange(() =>
                {
                    this.material.uniforms.uDepthColor.value.set(new THREE.Color(parameters.water.depthColor))
                })

            this.debugFolder
                .addColor(parameters.water, 'surfaceColor')
                .name('surfaceColor')
                .onChange(() =>
                {
                    this.material.uniforms.uSurfaceColor.value.set(new THREE.Color(parameters.water.surfaceColor))
                })

            this.debugFolder
                .add(parameters.water, 'bigWavesElevation')
                .min(0)
                .max(1)
                .step(0.001)
                .name('uBigWavesElevation')
                .onChange(() =>
                {
                    this.material.uniforms.uBigWavesElevation.value = parameters.water.bigWavesElevation
                })

            this.debugFolder
                .add(parameters.water.bigWavesFrequency, 'x')
                .min(0)
                .max(10)
                .step(0.001)
                .name('uBigWavesFrequencyX')

            this.debugFolder
                .add(parameters.water.bigWavesFrequency, 'y')
                .min(0)
                .max(10)
                .step(0.001)
                .name('uBigWavesFrequencyY')

            this.debugFolder
                .add(parameters.water, 'bigWavesSpeed')
                .min(0)
                .max(4)
                .step(0.001)
                .name('uBigWavesSpeed')
                .onChange(() =>
                {
                    this.material.uniforms.uBigWavesSpeed.value = parameters.water.bigWavesSpeed
                })

            this.debugFolder
                .add(parameters.water, 'smallWavesElevation')
                .min(0)
                .max(1)
                .step(0.001)
                .name('uSmallWavesElevation')
                .onChange(() =>
                {
                    this.material.uniforms.uSmallWavesElevation.value = parameters.water.smallWavesElevation
                })

            this.debugFolder
                .add(parameters.water, 'smallWavesFrequency')
                .min(0)
                .max(30)
                .step(0.001)
                .name('uSmallWavesFrequency')
                .onChange(() =>
                {
                    this.material.uniforms.uSmallWavesFrequency.value = parameters.water.smallWavesFrequency
                })

            this.debugFolder
                .add(parameters.water, 'smallWavesSpeed')
                .min(0)
                .max(4)
                .step(0.001)
                .name('uSmallWavesSpeed')
                .onChange(() =>
                {
                    this.material.uniforms.uSmallWavesSpeed.value = parameters.water.smallWavesSpeed
                })

            this.debugFolder
                .add(parameters.water, 'smallIterations')
                .min(0)
                .max(5)
                .step(1)
                .name('uSmallIterations')
                .onChange(() =>
                {
                    this.material.uniforms.uSmallIterations.value = parameters.water.smallIterations
                })

            this.debugFolder
                .add(parameters.water, 'colorOffset')
                .min(0)
                .max(1)
                .step(0.001)
                .name('uColorOffset')
                .onChange(() =>
                {
                    this.material.uniforms.uColorOffset.value = parameters.water.colorOffset
                })

            this.debugFolder
                .add(parameters.water, 'colorMultiplier')
                .min(0)
                .max(10)
                .step(0.001)
                .name('uColorMultiplier')
                .onChange(() =>
                {
                    this.material.uniforms.uColorMultiplier.value = parameters.water.colorMultiplier
                })
        }
    }

    update()
    {
        this.material.uniforms.uTime.value = this.time.secondsElapsed
    }
}