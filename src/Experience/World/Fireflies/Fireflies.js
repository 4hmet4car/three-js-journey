import * as THREE from 'three'
import Experience from '../../Experience.js'

import firefliesVertexShader from './shaders/vertex.glsl'
import firefliesFragmentShader from './shaders/fragment.glsl'

import { firefliesParameters } from '../../parameters.js'

export default class Fireflies
{
    constructor()
    {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.debug = this.experience.debug
        this.time = this.experience.time

        this.setGeometry()
        this.setMaterial()
        this.setInstance()
        this.setDebug()
    }

    setGeometry()
    {
        this.geometry = new THREE.BufferGeometry()
        const positionsArray = new Float32Array(firefliesParameters.firefliesCount * 3)
        const scalesArray = new Float32Array(firefliesParameters.firefliesCount * 1)
        for (let i = 0; i < firefliesParameters.firefliesCount; i++)
        {
            const i3 = i * 3

            positionsArray[i3 + 0] = (Math.random() - 0.5) * 4
            positionsArray[i3 + 1] = Math.random() * 1.5 + 0.2
            positionsArray[i3 + 2] = (Math.random() - 0.5) * 4

            scalesArray[i] = Math.random()
        }
        const positionAttribute = new THREE.BufferAttribute(positionsArray, 3)
        const scaleAttribute = new THREE.BufferAttribute(scalesArray, 1)
        this.geometry.setAttribute('position', positionAttribute)
        this.geometry.setAttribute('aScale', scaleAttribute)
    }

    setMaterial()
    {
        this.material = new THREE.ShaderMaterial({
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            vertexShader: firefliesVertexShader,
            fragmentShader: firefliesFragmentShader,
            uniforms:
            {
                uTime: new THREE.Uniform(0),
                uPixelRatio: new THREE.Uniform(this.sizes.pixelRatio),
                uSize: new THREE.Uniform(firefliesParameters.firefliesSize),
            },
        })
    }

    setInstance()
    {
        this.instance = new THREE.Points(this.geometry, this.material)
        this.scene.add(this.instance)
    }

    setDebug()
    {
        if (this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('Fireflies')

            this.debugFolder
                .add(firefliesParameters, 'firefliesSize')
                .min(0)
                .max(500)
                .step(1)
                .onChange(() =>
                {
                    this.material.uniforms.uSize.value = firefliesParameters.firefliesSize
                })
        }
    }

    update()
    {
        this.material.uniforms.uTime.value = this.time.secondsElapsed
    }
}