/**
 * This class instantiates the needed loaders.
 * This class loops through an array of assets and loads them.
 * This class triggers an event when all assets are loaded.
 */

import * as THREE from 'three'

import EventEmitter from "./EventEmitter.js"

export default class Resources extends EventEmitter
{
    constructor(sources)
    {
        super()

        //Options
        this.sources = sources

        //Setup
        this.items = {} //Loaded resources
        this.toLoad = this.sources.length //the number of sources to load
        this.loaded = 0 //the loaded number of sources to compare

        this.setLoaders()
        this.startLoading()
    }

    setLoaders()
    {
        this.loaders = {}
        this.loaders.textureLoader = new THREE.TextureLoader()
    }

    startLoading()
    {
        for (const source of this.sources)
        {
            switch (source.type)
            {
                case 'texture':
                    this.loaders.textureLoader.load(source.path, (file) =>
                    {
                        this.sourceLoaded(source, file, "%cTexture Loaded: ", "background-color: maroon")
                    })
                    break;

                default:
                    console.log('Unknown type!')
            }
        }
    }

    sourceLoaded(source, file, logMessage ,logColor)
    {
        console.log(logMessage + source.name, logColor)

        this.items[source.name] = file

        this.loaded++

        if (this.loaded === this.toLoad)
        {
            this.trigger('ready')
        }
    }
}
