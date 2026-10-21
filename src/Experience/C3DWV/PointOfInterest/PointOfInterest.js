import { Vector3 } from 'three'
import Experience from '../../Experience.js'
import EventEmitter from '../../Utils/EventEmitter.js'

export default class PointOfInterest extends EventEmitter
{
    constructor(pointIndex, pointDescription, pointCoordinates, rayCaster)
    {
        super()

        this.experience = new Experience()
        this.camera = this.experience.camera
        this.scene = this.experience.scene
        this.sizes = this.experience.sizes
        this.rayCaster = rayCaster

        this.setPointOfInterest(pointCoordinates)
        this.setAnchor(pointIndex)
        this.setContent(pointDescription)
        this.addEventListeners()
    }

    setPointOfInterest(pointCoordinates)
    {
        this.pointOfInterest = document.createElement('div')
        this.pointOfInterest.classList.add('pointOfInterest')
        document.body.appendChild(this.pointOfInterest)

        this.coordinates = pointCoordinates
        this.screenCoordinates = new Vector3()
        this.active = false
    }

    setAnchor(pointIndex)
    {
        this.anchor = document.createElement('button')
        this.anchor.type = 'button'
        this.anchor.classList.add('anchor')
        this.anchor.textContent = pointIndex
        this.pointOfInterest.appendChild(this.anchor)
    }

    setContent(pointDescription)
    {
        this.content = document.createElement('div')
        this.content.classList.add('content')
        this.content.textContent = pointDescription
        this.pointOfInterest.appendChild(this.content)
    }

    addEventListeners()
    {
        this.anchor.addEventListener('click', () =>
        {
            this.active = !this.active
            this.pointOfInterest.classList.toggle('active', this.active)
            this.content.classList.toggle('visible', this.active)
            this.trigger('clicked')
        })
    }

    calculateScreenCoordinates()
    {
        this.screenCoordinates.copy(this.coordinates)
        this.screenCoordinates.project(this.camera.instance)
    }

    castRay()
    {
        this.rayCaster.setFromCamera(this.screenCoordinates, this.camera.instance)
        this.intersects = this.rayCaster.intersectObjects(this.scene.children, true)
    }

    togglePointVisibility()
    {
        if (!this.intersects.length)
        {
            this.anchor.classList.add('visible')
        }
        else
        {
            const intersectionDistance = this.intersects[0].distance
            const pointDistance = this.coordinates.distanceTo(this.camera.instance.position)
            if (intersectionDistance < pointDistance)
            {
                this.anchor.classList.remove('visible')
                this.deactivate()
            }
            else
            {
                this.anchor.classList.add('visible')
            }
        }
    }

    move()
    {
        const translateX = this.screenCoordinates.x * this.sizes.width * 0.5
        const translateY = - this.screenCoordinates.y * this.sizes.height * 0.5

        this.pointOfInterest.style.transform =
            `
            translate(${translateX}px, ${translateY}px) translate(-50%, calc(var(--anchor-height) / -2))
            `
    }

    update()
    {
        this.calculateScreenCoordinates()
        this.castRay()
        this.togglePointVisibility()
        this.move()
    }

    deactivate()
    {
        this.active = false
        this.pointOfInterest.classList.remove('active')
        this.content.classList.remove('visible')
    }
}