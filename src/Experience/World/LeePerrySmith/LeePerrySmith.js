import * as THREE from 'three'

import Experience from "../../Experience.js"
import vertexChunk1 from './shaderChunks/vertexChunk1.glsl'

export default class LeePerrySmith
{
    constructor()
    {
        this.experience = new Experience()
        this.resources = this.experience.resources
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.debug = this.experience.debug

        //Debug
        if (this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('LeePerrySmith')
        }

        //Setup
        this.resource = this.resources.items.leePerrySmithModel

        this.setMaterial()
        this.setModel()

    }

    setMaterial()
    {
        this.mapTexture = this.resources.items.leePerrySmithColorTexture
        this.mapTexture.colorSpace = THREE.SRGBColorSpace

        this.normalTexture = this.resources.items.leePerrySmithNormalTexture

        this.material = new THREE.MeshStandardMaterial({
            map: this.mapTexture,
            normalMap: this.normalTexture
        })

        this.material.onBeforeCompile = (shader) =>
        {
            shader.vertexShader = shader.vertexShader.replace(
                '#include <begin_vertex>',
                vertexChunk1
            )
        }
    }

    setModel()
    {
        this.model = this.resource.scene
        this.scene.add(this.model)

        this.model.traverse((child) =>
        {
            if (child instanceof THREE.Mesh)
            {
                child.material = this.material
                child.rotation.y = Math.PI * 0.5
                child.castShadow = true
                child.receiveShadow = true
            }
        })
    }

    update()
    {

    }
}