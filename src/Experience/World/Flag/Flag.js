import * as THREE from 'three'

import Experience from "../../Experience.js";

import testVertexShader from './shaders/vertex.glsl'
import testFragmentShader from './shaders/fragment.glsl'

export default class Flag
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug

        if (this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('Flag')
        }

        this.setGeometry()
        this.setTextures()
        this.setMaterial()
        this.setMesh()
    }

    setGeometry()
    {
        this.geometry = new THREE.PlaneGeometry(1, 1, 32, 32)
    }

    setTextures()
    {
        this.textures = {}

        this.textures.colorTexture = this.resources.items.flag
        this.textures.colorTexture.magFilter = THREE.NearestFilter
    }

    setMaterial()
    {
        this.material = new THREE.RawShaderMaterial({
            transparent: true,
            side: THREE.DoubleSide,
            vertexShader: testVertexShader,
            fragmentShader: testFragmentShader,
            uniforms: {
                uFrequency: { value: new THREE.Vector2(10, 5) },
                uTime: { value: 0 },
                uColor: { value: new THREE.Color('#ff1565') },
                uTexture: { value: this.textures.colorTexture }
            }
        })

        if (this.debug.active)
        {
            this.debugFolder
                .add(this.material.uniforms.uFrequency.value, 'x')
                .min(0)
                .max(20)
                .step(0.01)
                .name('FraquencyX')

            this.debugFolder
                .add(this.material.uniforms.uFrequency.value, 'y')
                .min(0)
                .max(20)
                .step(0.01)
                .name('FraquencyY')
        }
    }

    setMesh()
    {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.scene.add(this.mesh)
    }

    update()
    {
        this.material.uniforms.uTime.value = this.time.elapsed
    }
}