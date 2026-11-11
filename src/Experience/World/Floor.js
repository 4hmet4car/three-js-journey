import * as THREE from 'three/webgpu'
import Experience from "../Experience.js"
import { distance, smoothstep, uv, vec2 } from 'three/tsl'

export default class Floor
{
    constructor()
    {
        this.experience = new Experience()
        this.resources = this.experience.resources
        this.scene = this.experience.scene
        this.renderer = this.experience.renderer
        this.camera = this.experience.camera

        this.setMaterial()
        this.setMesh()
        // this.logShaders()
    }

    setMaterial()
    {
        this.floorTexture = this.resources.items.floorTexture
        this.floorTexture.colorSpace = THREE.SRGBColorSpace

        this.material = new THREE.MeshStandardNodeMaterial({
            transparent: true,
            map: this.floorTexture,
        })

        const fade = smoothstep(0.5, 0.2, distance(uv(), vec2(0.5)))
                        // .toVar('fade')
                        // .debug()
                        .toInspector('lol')
        this.material.opacityNode = fade
    }

    setMesh()
    {
        this.mesh = new THREE.Mesh(
            new THREE.PlaneGeometry(10, 10, 10, 10),
            this.material
        )
        this.mesh.rotation.x = - Math.PI * 0.5
        this.mesh.receiveShadow = true
        this.scene.add(this.mesh)
    }

    async logShaders()
    {
        const program = await this.renderer.instance.debug.getShaderAsync(this.scene, this.camera.instance, this.mesh)
        console.log(program.vertexShader)
        console.log(program.fragmentShader)
    }
}