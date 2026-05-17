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

        // this.setPerspectiveCameraInstance()
        this.setOrtographicCameraInstance()
        // this.setOrbitControls()

        // Move camera vertically
        this.totalContentLength = 0
        this.currentCameraPosition = 0
        this.wheelMoveCamera()
        this.touchMoveCamera()
    }

    // Perspective camera instance
    setPerspectiveCameraInstance()
    {
        this.instance = new THREE.PerspectiveCamera(75, this.sizes.width / this.sizes.height, 0.1, 100)
        this.instance.position.set(0.25, - 0.25, 1)
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
        this.instance = new THREE.OrthographicCamera(this.left, this.right, this.top, this.bottom, 0.1, 100)
        this.instance.left = -(this.sizes.width / this.sizes.height) * this.zoom
        this.instance.right = (this.sizes.width / this.sizes.height) * this.zoom
        this.instance.position.set(0, 0, 1)
        this.scene.add(this.instance)
    }

    setOrbitControls()
    {
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enableDamping = true
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

    wheelMoveCamera()
    {
        window.addEventListener('wheel', (event) =>
        {
            this.moveCamera(event.deltaY / 1000)
        })
    }

    touchMoveCamera()
    {
        let previousY = 0

        window.addEventListener('touchstart', (event) =>
        {
            previousY = event.touches[0].clientY
        })

        window.addEventListener('touchmove', (event) =>
        {
            const currentCameraPosition = event.touches[0].clientY
            const deltaY = previousY - currentCameraPosition

            this.moveCamera(deltaY / 300)

            previousY = currentCameraPosition
        }, { passive: false })
    }

    moveCamera(delta)
    {
        const nextY = this.currentCameraPosition + delta

        const spaceBelow = this.totalContentLength - 2 - this.currentCameraPosition

        if (0 <= nextY)
        {
            if (nextY < this.totalContentLength - 2)
            {
                this.currentCameraPosition = nextY
                this.instance.position.y -= delta
            } else
            {
                this.instance.position.y -= spaceBelow
                this.currentCameraPosition = this.totalContentLength - 2
            }
        } else
        {
            this.instance.position.y += this.currentCameraPosition
            this.currentCameraPosition = 0
        }
    }

    update()
    {
        // this.controls.update()
    }
}