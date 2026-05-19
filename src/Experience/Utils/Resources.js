/**
 * This class instantiates the needed loaders.
 * This class loops through an array of assets and loads them.
 * This class triggers an event when all assets are loaded.
 */

import * as THREE from 'three'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"

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
        this.loaders.gltfLoader = new GLTFLoader()
    }

    startLoading()
    {
        for (const source of this.sources)
        {
            switch (source.type)
            {
                case 'gltfModel':
                    this.loaders.gltfLoader.load(source.path, (file) =>
                    {
                        this.sourceLoaded(source, file, "%cGLTF Loaded: ", "background-color: navy")
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