/**
 * This class instantiates the needed loaders.
 * This class loops through adn array of assets and loads them.
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

        this.setLoadingManager()
        this.setLoaders()
    }

    setLoadingManager()
    {
        this.loadingManager = new THREE.LoadingManager()
    }

    setLoaders()
    {
        this.loaders = {}
        // console.log("%cRosso %cVerde %cBlu", "color: red", "color: green", "background-color: #204bd6")
        this.loaders.gltfLoader = new GLTFLoader(this.loadingManager)
        // console.log(this.loaders.gltfLoader)
        this.loaders.textureLoader = new THREE.TextureLoader()
        this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader()
    }
}