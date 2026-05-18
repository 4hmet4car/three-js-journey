import * as THREE from 'three'
import Experience from './Experience.js'

export default class RayCaster
{
    constructor()
    {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.camera = this.experience.camera

        this.setRayCaster()
        this.setEventListeners()
    }

    setRayCaster()
    {
        this.instance = new THREE.Raycaster()
        this.objectsToIntersect = []
        // console.log(this.objectsToIntersect)
    }

    setEventListeners()
    {
        this.mouse = new THREE.Vector2()

        window.addEventListener('mousemove', (event) =>
        {
            this.mouse.x = (event.clientX / this.sizes.width) * 2 - 1
            this.mouse.y = -((event.clientY / this.sizes.height) * 2 - 1)
            // console.log(this.mouse.x)
        })


        window.addEventListener('click', (event) =>
        {
            alert(this.intersects[0].object.material.fragmentShader)
        })
    }

    update()
    {
        if (this.mouse) {
            this.instance.setFromCamera(this.mouse,this.camera.instance)
            this.intersects = this.instance.intersectObjects(this.objectsToIntersect)
        }
    }
}