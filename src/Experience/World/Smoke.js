import * as THREE from 'three'
import Experience from "../Experience"

import vertexShader from './shaders/smoke/vertex.glsl'
import fragmentShader from './shaders/smoke/fragment.glsl'

export default class Smoke
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene

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
        this.material = new THREE.ShaderMaterial({
            // wireframe: true,
            side: THREE.DoubleSide,
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
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

    }
}