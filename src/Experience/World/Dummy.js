import * as THREE from 'three/webgpu'
import Experience from "../Experience.js"
import { color, vec2, vec3 } from 'three/tsl'

export default class Floor
{
    constructor()
    {
        this.experience = new Experience()
        this.resources = this.experience.resources
        this.scene = this.experience.scene

        this.setGeometry()
        this.setMaterial()
        this.setMesh()
    }

    setGeometry()
    {
        this.geometry = new THREE.TorusKnotGeometry(0.5, 0.24, 128, 32)
    }

    setMaterial()
    {
        this.material = new THREE.MeshStandardMaterial()

        // const foo = vec2(1, 0)
        // this.material.colorNode = vec3(foo, 0)

        // const foo = color(0xff0000)
        // this.material.colorNode = foo

        // const foo = color('#ff0000')
        // this.material.colorNode = foo

        // const foo = color(0xff0000)
        // this.material.colorNode = foo

        // const foo = color(1, 0, 0)
        // this.material.colorNode = foo

        // const foo = color({ r: 1, g: 0, b: 0 })
        // this.material.colorNode = foo

        const foo = color(new THREE.Color('red'))
        this.material.colorNode = foo
    }

    setMesh()
    {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.castShadow = true
        this.mesh.receiveShadow = true
        this.mesh.position.y = 1
        this.scene.add(this.mesh)
    }
}