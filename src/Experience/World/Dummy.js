import * as THREE from 'three/webgpu'
import Experience from "../Experience.js"

import { sin, positionLocal, time, vec2, checker, uv, float, vec3 } from 'three/tsl'


export default class Dummy
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene

        this.setMaterial()
        this.setGeometry()
        this.setMesh()
    }

    setGeometry()
    {
        this.geometry = new THREE.TorusKnotGeometry(0.5, 0.24, 128, 32)
    }

    setMaterial()
    {
        this.material = new THREE.MeshStandardNodeMaterial({
            color: 'red',
            metalness: 0.5,
            roughness: 0.25,
        })

        this.pattern = checker(
            uv()
                .add(time.mul(0.02))
                .mul(vec2(40, 5))
        )

        this.material.colorNode = vec3(this.pattern, 0, 0)

        this.material.roughnessNode = this.pattern

        const zOffset = sin(time.add(positionLocal.y.mul(3))).mul(0.4)
        this.material.positionNode = positionLocal.add(vec3(0, 0, zOffset))
    }

    setMesh()
    {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.castShadow = true
        this.mesh.receiveShadow = true
        this.mesh.position.y = 1
        this.scene.add(this.mesh)
    }
}