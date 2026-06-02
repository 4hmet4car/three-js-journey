import * as THREE from 'three'
// import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
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
        this.items = {}
        this.toLoad = this.sources.length
        this.loaded = 0

        this.setLoaders()
        this.startLoading()

    }

    setLoaders()
    {
        this.loaders = {}
        // this.loaders.dracoLoader = new DRACOLoader()
        // this.loaders.dracoLoader.setDecoderPath('./draco/')
        this.loaders.gltfLoader = new GLTFLoader()
        // this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader)
        this.loaders.textureLoader = new THREE.TextureLoader()
        // this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader()
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

                case 'dracoModel':
                    this.loaders.gltfLoader.load(source.path, (file) =>
                    {
                        this.sourceLoaded(source, file, "%cDraco Loaded: ", "background-color: navy")
                    })
                    break;

                case 'texture':
                    this.loaders.textureLoader.load(source.path, (file) =>
                    {
                        this.sourceLoaded(source, file, "%cTexture Loaded: ", "background-color: maroon")
                    })
                    break;

                case 'cubeTexture':
                    this.loaders.cubeTextureLoader.load(source.path, (file) =>
                    {
                        this.sourceLoaded(source, file, "%cCube Texture Loaded: ", "background-color: darkgreen")
                    })
                    break;

                default:
                    console.log('Unknown type!')
            }
        }
    }

    sourceLoaded(source, file, logMessage, logColor)
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