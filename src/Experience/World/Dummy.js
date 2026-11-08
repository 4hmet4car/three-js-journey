import * as THREE from 'three/webgpu'
import Experience from "../Experience.js"
import { color, modelViewMatrix, modelWorldMatrix, normalLocal, positionGeometry, positionLocal, positionWorld, vec2, vec3, vec4 } from 'three/tsl'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js'

export default class Floor
{
    constructor()
    {
        this.experience = new Experience()
        this.resources = this.experience.resources
        this.scene = this.experience.scene
        this.camera = this.experience.camera
        this.canvas = this.experience.canvas
        this.renderer = this.experience.renderer

        this.setGeometry()
        this.setMaterial()
        this.setMesh()
        this.setTransformControls()
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

        // const foo = color(new THREE.Color('red'))
        // this.material.colorNode = foo

        // this.material.outputNode = vec4(positionLocal, 1)

        // this.material.outputNode = vec4(positionWorld, 1)

        // this.material.outputNode = vec4(positionGeometry, 1)

        // this.material.outputNode = vec4(uv(), 1 , 1)

        // this.material.outputNode = vec4(normalLocal, 1)

        this.material.outputNode = vec4(modelWorldMatrix.mul(vec4(normalLocal, 0)).xyz, 1)
    }

    setMesh()
    {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.castShadow = true
        this.mesh.receiveShadow = true
        this.mesh.position.y = 1
        this.scene.add(this.mesh)
    }

    setTransformControls()
    {
        // TransformControl
        this.transformControls = new TransformControls(this.camera.instance, this.canvas)
        this.transformControls.attach(this.mesh)
        this.scene.add(this.transformControls.getHelper())

        this.transformControls.addEventListener('dragging-changed', (event) =>
        {
            this.camera.controls.enabled = !event.value
        })

        window.addEventListener('keydown', (event) =>
        {
            if (event.key === 'g')
                this.transformControls.setMode('translate')
            else if (event.key === 'r')
                this.transformControls.setMode('rotate')
            else if (event.key === 's')
                this.transformControls.setMode('scale')
        })
    }
}