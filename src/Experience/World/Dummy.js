import * as THREE from 'three/webgpu'
import Experience from "../Experience.js"
import { attribute, cameraPosition, color, dot, modelDirection, modelPosition, modelScale, modelViewMatrix, modelWorldMatrix, normalLocal, normalView, normalWorld, positionGeometry, positionLocal, positionViewDirection, positionWorld, screenCoordinate, screenUV, userData, vec2, vec3, vec4 } from 'three/tsl'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js'

export default class Floor
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.debug = this.experience.debug
        this.camera = this.experience.camera
        this.canvas = this.experience.canvas
        this.renderer = this.experience.renderer
        this.sizes = this.experience.sizes

        this.setGeometry()
        this.setMaterial()
        this.setMesh()
        this.setDebug()
    }

    setGeometry()
    {
        this.geometry = new THREE.TorusKnotGeometry(0.5, 0.24, 128, 32)
    }

    setMaterial()
    {
        this.material = new THREE.MeshStandardNodeMaterial()
    }

    setMesh()
    {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.castShadow = true
        this.mesh.receiveShadow = true
        this.mesh.position.y = 1
        this.scene.add(this.mesh)
    }

    setDebug()
    {
        if (this.debug.active)
        {
            this.material.userData.graphId = 'torusKnotMaterial'

            this.setTransformControls()

            const gui = this.renderer.instance.inspector.createParameters('Torus')

            gui.add(this.material, 'roughness', 0, 1)
            gui.addColor(this.material, 'color')
            gui.add(this.material, 'wireframe')
        }
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