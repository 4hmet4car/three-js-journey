export default class PointOfInterest
{
    constructor()
    {
        this.setAnchor()
        this.setLabel()
        this.setContent()
    }

    setAnchor()
    {
        this.anchor = document.createElement('div')
        this.anchor.classList.add('anchor', 'anchor-0')
        document.body.appendChild(this.anchor)
    }

    setLabel()
    {
        this.label = document.createElement('div')
        this.label.classList.add('label')
        this.label.textContent = '1'
        this.anchor.appendChild(this.label)
    }

    setContent()
    {
        this.content = document.createElement('div')
        this.content.classList.add('content')
        this.content.textContent = 'Lorem ipsum, dolor sit amet consectetur adipisicing elit'
        this.anchor.appendChild(this.content)
    }
}