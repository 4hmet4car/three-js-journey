import * as THREE from 'three'
import Experience from "../Experience.js"

import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'

export default class Foo
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time

        this.setCube()
        this.setTorusKnot()
        this.setSphere()
        this.setFloor()
        this.setCubeCluster()
    }

    setCube()
    {
        this.cube = new THREE.Mesh(
            new THREE.BoxGeometry(2, 2, 2),
            new THREE.MeshStandardMaterial()
        )
        this.cube.castShadow = true
        this.cube.receiveShadow = false
        this.cube.position.set(- 5, 0, 0)
        this.scene.add(this.cube)
    }

    setTorusKnot()
    {
        this.torusKnot = new THREE.Mesh(
            new THREE.TorusKnotGeometry(1, 0.4, 128, 32),
            new THREE.MeshStandardMaterial()
        )
        this.torusKnot.castShadow = true
        this.torusKnot.receiveShadow = false
        this.scene.add(this.torusKnot)
    }

    setSphere()
    {
        this.sphere = new THREE.Mesh(
            new THREE.SphereGeometry(1, 32, 32),
            new THREE.MeshStandardMaterial()
        )
        this.sphere.position.set(5, 0, 0)
        this.sphere.castShadow = true
        this.sphere.receiveShadow = false
        this.scene.add(this.sphere)
    }

    setFloor()
    {
        this.floor = new THREE.Mesh(
            new THREE.PlaneGeometry(10, 10),
            new THREE.MeshStandardMaterial()
        )
        this.floor.position.set(0, - 2, 0)
        this.floor.rotation.x = - Math.PI * 0.5
        this.floor.castShadow = true
        this.floor.receiveShadow = true
        this.scene.add(this.floor)
    }

    setCubeCluster()
    {
        this.cubeClusterGeometries = []

        for (let i = 0; i < 50; i++)
        {
            const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)

            geometry.rotateX((Math.random() - 0.5) * Math.PI * 2)
            geometry.rotateY((Math.random() - 0.5) * Math.PI * 2)
            
            geometry.translate(
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10
            )

            this.cubeClusterGeometries.push(geometry)
        }

        this.cubeClusterGeometry = mergeGeometries(this.cubeClusterGeometries)
        this.cubeClusterMaterial = new THREE.MeshNormalMaterial()

        this.cubeClusterMesh = new THREE.Mesh(this.cubeClusterGeometry, this.cubeClusterMaterial)

        this.scene.add(this.cubeClusterMesh)
    }

    update()
    {
        this.torusKnot.rotation.y = this.time.secondsElapsed * 0.1
    }

}