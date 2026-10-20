import { Vector3 } from 'three'
import Experience from '../../Experience.js'

export default class PointOfInterest
{
    constructor(pointIndex, pointDescription, pointCoordinates, rayCaster)
    {
        this.experience = new Experience()
        this.camera = this.experience.camera
        this.scene = this.experience.scene
        this.sizes = this.experience.sizes

        this.setPointOfInterest(pointIndex, pointCoordinates)
        this.setLabel(pointIndex)
        this.setContent(pointDescription)
        this.addEventListeners()
        this.setRayCaster(rayCaster)
    }

    setPointOfInterest(pointIndex, pointCoordinates)
    {
        this.pointOfInterest = document.createElement('div')
        this.pointOfInterest.classList.add('pointOfInterest')
        document.body.appendChild(this.pointOfInterest)

        this.isActive = false
        this.coordinates = pointCoordinates
        this.screenCoordinates = new Vector3()
    }

    setLabel(pointIndex)
    {
        this.anchor = document.createElement('div')
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
        this.anchor.addEventListener('mouseenter', () =>
        {
            this.content.style.willChange = 'opacity'
        })

        this.anchor.addEventListener('click', () =>
        {
            // This also returns true when toggled on and false when toggled off
            this.content.classList.toggle('active')
        })

        this.anchor.addEventListener('mouseleave', () =>
        {
            this.content.style.willChange = 'auto'
        })
    }

    setRayCaster(rayCaster)
    {
        this.rayCaster = rayCaster
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
            }
            else
            {
                this.anchor.classList.add('visible')
            }
        }
    }

    movePoint()
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
        this.movePoint()
    }
}