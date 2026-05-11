import * as THREE from 'three'

import Experience from '../Experience.js'

export default class Floor
{
    constructor()
    {
        this.experience = new Experience()
        this.resources = this.experience.resources
        this.scene = this.experience.scene

        this.setGeometry()
        this.setTextures()
        this.setMaterial()
        this.setMesh()
    }

    setGeometry()
    {
        this.geometry = new THREE.CircleGeometry(4, 64)
    }

    setTextures(){
        this.textures = {}

        this.textures.colorTexture = this.resources.items.dirtColorTexture
        this.textures.colorTexture.colorSpace = THREE.SRGBColorSpace
        this.textures.colorTexture.repeat.set(1.5,1.5)
        this.textures.colorTexture.wrapS = THREE.RepeatWrapping
        this.textures.colorTexture.wrapT = THREE.RepeatWrapping

        this.textures.normalTexture = this.resources.items.dirtNormalTexture
        this.textures.normalTexture.repeat.set(1.5,1.5)
        this.textures.normalTexture.wrapS = THREE.RepeatWrapping
        this.textures.normalTexture.wrapT = THREE.RepeatWrapping
    }

    setMaterial(){
        this.material = new THREE.MeshStandardMaterial({
            map: this.textures.colorTexture,
            normalMap: this.textures.normalTexture
        })
    }

    setMesh()
    {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.rotation.x = - Math.PI * 0.5
        this.mesh.receiveShadow = true
        this.scene.add(this.mesh)
    }
}