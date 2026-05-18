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
        this.geometry = new THREE.PlaneGeometry(2, 2, 128, 128)
    }
    setTextures()
    {

    }
    setMaterial()
    {
        this.material = new THREE.ShaderMaterial({
            side: THREE.DoubleSide,
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            uniforms: {
                uTime: { value: 0 },
                uBigWavesElevation: { value: 0.1 },
                uBigWavesFrequency: { value: new THREE.Vector2(3.0, 1.0) },
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
