import * as THREE from 'three'
import Experience from "../../../Experience.js"

import ringVertexShader from './ringShaders/vertex.glsl'
import ringFragmentShader from './ringShaders/fragment.glsl'

import { PLANET, PI } from "../../../constants.js"
import parameters from "../../../parameters.js"

export default class Ring
{
    constructor()
    {
        this.experience = new Experience()
        this.rotationMatrix = this.experience.rotationMatrix.rotationMatrix
        this.time = this.experience.time
        this.renderer = this.experience.renderer
        this.scene = this.experience.scene
        this.debug = this.experience.debug

        this.setRing()
        this.setDebug()
    }

    setRing()
    {
        if (this.mesh !== undefined)
        {
            this.ringGeometry.dispose()
            this.ringMaterial.dispose()
            this.scene.remove(this.mesh)
        }

        this.setRingGeometry()
        this.setRingMaterial()
        this.setMesh()
    }

    setRingGeometry()
    {
        this.ringGeometry = new THREE.PlaneGeometry(parameters.planet.ringOuterRadius * 2, parameters.planet.ringOuterRadius * 2)
    }

    setRingMaterial()
    {
        this.ringMaterial = new THREE.RawShaderMaterial({
            side: THREE.DoubleSide,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            vertexColors: true,

            vertexShader: ringVertexShader,
            fragmentShader: ringFragmentShader,

            uniforms:
            {
                uRotationMatrix: { value: this.rotationMatrix },

                uRingCount: { value: parameters.planet.ringCount },
                uRoot1: { value: parameters.planet.root1 },
                uRoot2: { value: parameters.planet.root2 },

                uPI: { value: PI },
            }
        })
    }

    setMesh()
    {
        this.mesh = new THREE.Mesh(this.ringGeometry, this.ringMaterial)
        this.mesh.rotation.x = PI * 0.5
        this.scene.add(this.mesh)
    }

    setDebug()
    {
        if (this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('Ring')

            this.debugFolder
                .add(parameters.planet, 'ringCount')
                .min(0)
                .max(500)
                .step(1)
                .onChange(() =>
                {
                    this.setRing()
                })

            this.debugFolder
                .add(parameters.planet, 'root1')
                .min(0)
                .max(500)
                .step(0.01)
                .onChange(() =>
                {
                    this.setRing()
                })

            this.debugFolder
                .add(parameters.planet, 'root2')
                .min(0)
                .max(500)
                .step(0.01)
                .onChange(() =>
                {
                    this.setRing()
                })

            this.debugFolder
                .add(parameters.planet, 'ringOuterRadius')
                .min(0)
                .max(5)
                .step(0.1)
                .onChange(() =>
                {
                    this.setRing()
                })
        }
    }

    update()
    {

    }

    rotate()
    {
        this.rotationMatrix = this.experience.rotationMatrix.rotationMatrix
        this.setRing()
    }
}