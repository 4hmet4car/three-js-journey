export default class LoadingBar
{
    constructor()
    {
        this.setInstance()
        this.setStyle()
        this.setState()
        this.addToDocument()
    }

    setInstance()
    {
        this.instance = document.createElement('div')
    }

    setStyle()
    {
        this.instance.classList.add("loading-bar")
    }

    setState()
    {
        this.canCollapse = false
        this.instance.style.transform = `scaleX(0)`
    }

    addToDocument()
    {
        document.body.appendChild(this.instance)
    }

    progress(resourcesLoaded, resourcesToLoad)
    {
        const progressRatio = resourcesLoaded / resourcesToLoad
        this.instance.style.transform = `scaleX(${progressRatio})`
    }

    collapse()
    {
        window.setTimeout(() =>
        {
            this.instance.classList.add('ended')
            this.instance.style.transform = ''
            window.setTimeout(() =>
            {
                this.instance.remove()
            }, 1500)
        }, 500)
    }
}