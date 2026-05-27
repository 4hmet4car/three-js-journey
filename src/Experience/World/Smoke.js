import * as THREE from 'three'
import Experience from "../Experience"

import vertexShader from './shaders/smoke/vertex.glsl'
import fragmentShader from './shaders/smoke/fragment.glsl'

export default class Smoke
{
    constructor()
    {
        this.experience = new Experience()
        this.resources = this.experience.resources
        this.scene = this.experience.scene
        this.time = this.experience.time

        this.setGeometry()
        this.setMaterial()
        this.setMesh()
    }

    setGeometry()
    {
        this.geometry = new THREE.PlaneGeometry(1, 1, 16, 64)
        this.geometry.translate(0, 0.5, 0)
        this.geometry.scale(1.5, 6, 1.5)
    }

    setMaterial()
    {
        this.perlinTexture = this.resources.items.perlinTexture
        // this.perlinTexture.generateMipmaps =false
        this.perlinTexture.wrapS = THREE.RepeatWrapping
        this.perlinTexture.wrapT = THREE.RepeatWrapping

        this.material = new THREE.ShaderMaterial({
            // wireframe: true,
            side: THREE.DoubleSide,
            transparent: true,
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            uniforms: {
                uTime: new THREE.Uniform(0),
                uPerlinTexture: new THREE.Uniform(this.perlinTexture)
            },
        })
    }

    setMesh()
    {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.position.y = 1.83
        this.scene.add(this.mesh)
    }

    update()
    {
        this.material.uniforms.uTime.value = this.time.secondsElapsed
    }
}