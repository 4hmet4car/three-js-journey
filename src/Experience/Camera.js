import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import Experience from "./Experience"

export default class Camera
{
    constructor()
    {
        this.experience = new Experience() //Singleton
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas
        this.debug = this.experience.debug

        // this.setPerspectiveCameraInstance()
        this.setOrtographicCameraInstance()
        this.setOrbitControls()
        this.setDebug()
    }

    // Perspective camera instance
    setPerspectiveCameraInstance()
    {
        this.instance = new THREE.PerspectiveCamera(75, this.sizes.width / this.sizes.height, 0.1, 100)
        this.instance.position.set(1, 1, 1)
        this.scene.add(this.instance)
    }

    // Orthographic camera instance
    setOrtographicCameraInstance()
    {
        this.isOrthographic = true
        this.zoom = 1
        this.left = -(this.sizes.width / this.sizes.height) * this.zoom
        this.right = (this.sizes.width / this.sizes.height) * this.zoom
        this.top = 1 * this.zoom
        this.bottom = -1 * this.zoom
        this.instance = new THREE.OrthographicCamera(this.left, this.right, this.top, this.bottom, -1, 100)
        this.instance.left = -(this.sizes.width / this.sizes.height) * this.zoom
        this.instance.right = (this.sizes.width / this.sizes.height) * this.zoom
        this.instance.position.set(1, 1, 1)
        this.scene.add(this.instance)
    }

    setOrbitControls()
    {
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enableDamping = true
        this.controls.enablePan = false
        this.controls.enableZoom = false
        this.controls.enableRotate = false
        this.controls.minPolarAngle = 0.9553166181245092
        this.controls.maxPolarAngle = 0.9553166181245092
    }

    setDebug(){
        //Debug
        if (this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder("Camera")

            this.debugFolder
                .add(this.controls,'enableZoom')

            this.debugFolder
                .add(this.controls,'enableRotate')
        }
    }

    resize()
    {
        if (this.isOrthographic)
        {
            this.instance.left = -(this.sizes.width / this.sizes.height) * this.zoom
            this.instance.right = (this.sizes.width / this.sizes.height) * this.zoom
            this.instance.updateProjectionMatrix()
        } else
        {
            this.instance.aspect = this.sizes.width / this.sizes.height
            this.instance.updateProjectionMatrix()
        }
    }

    update()
    {
        this.controls.update()
    }
}
