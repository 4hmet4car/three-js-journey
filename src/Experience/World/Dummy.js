import * as THREE from 'three/webgpu'
import Experience from "../Experience.js"
import { attribute, cameraPosition, color, dot, modelDirection, modelPosition, modelScale, modelViewMatrix, modelWorldMatrix, normalLocal, normalView, normalWorld, positionGeometry, positionLocal, positionViewDirection, positionWorld, screenCoordinate, screenUV, userData, vec2, vec3, vec4 } from 'three/tsl'
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
        this.sizes = this.experience.sizes

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

        // const worldNormal = modelWorldMatrix.mul(vec4(normalLocal, 0)).xyz
        // this.material.outputNode = vec4(worldNormal, 1)

        // this.material.outputNode = vec4(normalWorld, 1)

        // this.material.outputNode = vec4(normalView, 1)

        // this.material.outputNode = vec4(screenUV, 1, 1)

        // const fragCoord = screenCoordinate.div(vec2(this.sizes.width, this.sizes.height))
        // this.material.outputNode = vec4(fragCoord, 0, 1)

        // this.material.outputNode = vec4(modelPosition, 1)

        // this.material.outputNode = vec4(modelDirection, 1)

        // this.material.outputNode = vec4(modelScale, 1)

        // this.material.colorNode = userData('foo')

        // this.material.outputNode = vec4(attribute('uv'), 1)

        this.material.outputNode = vec4(attribute('position'), 1)
    }

    setMesh()
    {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.userData.foo = new THREE.Vector3(1, 0, 0)
        this.mesh.castShadow = true
        this.mesh.receiveShadow = true
        this.mesh.position.y = 1
        this.scene.add(this.mesh)

        setTimeout(() =>
        {
            this.mesh.userData.foo.set(1, 0.5, 0)
        }, 2000)
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