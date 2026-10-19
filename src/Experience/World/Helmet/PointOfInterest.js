export default class PointOfInterest
{
    constructor(pointIndex, pointDescription)
    {
        this.setPointOfInterest(pointIndex)
        this.setLabel(pointIndex)
        this.setContent(pointDescription)
        this.addEventListeners()
    }

    setPointOfInterest(pointIndex)
    {
        this.pointOfInterest = document.createElement('div')
        this.pointOfInterest.classList.add('pointOfInterest', `pointOfInterest-${pointIndex}`)
        document.body.appendChild(this.pointOfInterest)

        this.isActive = false
    }

    setLabel(pointIndex)
    {
        this.anchor = document.createElement('div')
        this.anchor.classList.add('anchor', 'visible')
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
            // This also return true when toggled on and false when toggled off
            this.content.classList.toggle('active')
        })

        this.anchor.addEventListener('mouseleave', () =>
        {
            this.content.style.willChange = 'auto'
        })
    }
}