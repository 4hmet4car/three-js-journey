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
        this.rayCaster = rayCaster

        this.setPointOfInterest(pointCoordinates)
        this.setLabel(pointIndex)
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
            const activeContentDiv = document.querySelector('.content.active')
            if (activeContentDiv)
            {
                activeContentDiv.style.willChange = 'opacity'
            }

            this.content.style.willChange = 'opacity'
        })

        this.anchor.addEventListener('click', () =>
        {
            const activeContentDiv = document.querySelector('.content.active')
            if (activeContentDiv && activeContentDiv !== this.content)
            {
                const activePointOfInterest = activeContentDiv.parentElement
                activePointOfInterest.style.zIndex = 'auto'
                activeContentDiv.classList.remove('active')
            }

            const contentIsActive = this.content.classList.toggle('active')
            if (contentIsActive)
            {
                this.pointOfInterest.style.zIndex = '9999'
            }
            else
            {
                this.pointOfInterest.style.zIndex = 'auto'
            }
        })

        this.anchor.addEventListener('mouseleave', () =>
        {
            const allContentDivs = document.querySelectorAll('.content')
            allContentDivs.forEach((div) => div.style.willChange = 'auto')
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
                this.content.classList.remove('active')
                this.pointOfInterest.style.zIndex = 'auto'
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