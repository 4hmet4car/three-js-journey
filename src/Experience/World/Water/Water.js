import * as THREE from 'three'

import Experience from "../../Experience.js";

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
        this.geometry = new THREE.PlaneGeometry(2, 2, 512, 512)
    }
    setTextures()
    {

    }
    setMaterial()
    {
        this.colors = {}
        this.colors.depthColor = '#186691'
        this.colors.surfaceColor = '#9bd8ff'

        this.material = new THREE.ShaderMaterial({
            side: THREE.DoubleSide,
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            uniforms: {
                uTime: { value: 0 },

                uBigWavesElevation: { value: 0.09 },
                uBigWavesFrequency: { value: new THREE.Vector2(1, 0.5) },
                uBigWavesSpeed: { value: 0.25 },

                uSmallWavesElevation: { value: 0.03 },
                uSmallWavesFrequency: { value: 10 },
                uSmallWavesSpeed: { value: 0.2 },
                uSmallWavesIterations: { value: 4 },

                uDepthColor: { value: new THREE.Color(this.colors.depthColor) },
                uSurfaceColor: { value: new THREE.Color(this.colors.surfaceColor) },
                uColorOffset: { value: 0.09 },
                uColorMultiplier: { value: 4.8 },
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

            this.debugFolder
                .add(this.material.uniforms.uBigWavesFrequency.value, 'x')
                .min(0)
                .max(10)
                .step(0.001)
                .name('uBigWavesFrequencyX')

            this.debugFolder
                .add(this.material.uniforms.uBigWavesFrequency.value, 'y')
                .min(0)
                .max(10)
                .step(0.001)
                .name('uBigWavesFrequencyZ')

            this.debugFolder
                .add(this.material.uniforms.uBigWavesSpeed, 'value')
                .min(0)
                .max(4)
                .step(0.001)
                .name('uBigWavesSpeed')

            this.debugFolder
                .addColor(this.colors, 'depthColor')
                .name('depthColor')
                .onChange(() =>
                {
                    this.material.uniforms.uDepthColor.value.set(this.colors.depthColor)
                })

            this.debugFolder
                .addColor(this.colors, 'surfaceColor')
                .name('surfaceColor')
                .onChange(() =>
                {
                    this.material.uniforms.uSurfaceColor.value.set(this.colors.surfaceColor)
                })

            this.debugFolder
                .add(this.material.uniforms.uColorOffset, 'value')
                .min(-1)
                .max(1)
                .step(0.001)
                .name('uColorOffset')

            this.debugFolder
                .add(this.material.uniforms.uColorMultiplier, 'value')
                .min(0)
                .max(10)
                .step(0.001)
                .name('uColorMultiplier')

            this.debugFolder
                .add(this.material.uniforms.uSmallWavesElevation, 'value')
                .min(0)
                .max(0.5)
                .step(0.001)
                .name('uSmallWavesElevation')

            this.debugFolder
                .add(this.material.uniforms.uSmallWavesFrequency, 'value')
                .min(1)
                .max(10)
                .step(0.001)
                .name('uSmallWavesFrequenct')

            this.debugFolder
                .add(this.material.uniforms.uSmallWavesIterations, 'value')
                .min(0)
                .max(10)
                .step(1)
                .name('uSmallWavesIterations')

            this.debugFolder
                .add(this.material.uniforms.uSmallWavesSpeed, 'value')
                .min(0)
                .max(5)
                .step(0.001)
                .name('uSmallWavesSpeed')
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
        this.material.uniforms.uTime.value = this.time.elapsed * 0.001
    }
}
