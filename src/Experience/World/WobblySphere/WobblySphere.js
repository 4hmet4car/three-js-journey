import * as THREE from 'three'
import Experience from "../../Experience.js"
import { wobblySphereParameters } from "../../parameters.js"
import { WOBBLY_SPHERE } from '../../constants.js'

export default class WobblySphere
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.debug = this.experience.debug

        this.setMaterial()
        this.setGeometry()
        this.setMesh()
        this.setDebug()
    }

    setMaterial()
    {
        this.material = new THREE.MeshPhysicalMaterial({
            metalness: wobblySphereParameters.material.metalness,
            roughness: wobblySphereParameters.material.roughness,
            color: wobblySphereParameters.material.color,
            transmission: wobblySphereParameters.material.transmission,
            ior: wobblySphereParameters.material.ior,
            thickness: wobblySphereParameters.material.thickness,
            transparent: WOBBLY_SPHERE.MATERIAL.TRANSPARENT,
            wireframe: wobblySphereParameters.material.wireframe
        })
    }

    setGeometry()
    {
        this.geometry = new THREE.IcosahedronGeometry(
            WOBBLY_SPHERE.GEOMETRY.RADIUS,
            WOBBLY_SPHERE.GEOMETRY.DETAIL_NUMBER
        )
    }

    setMesh()
    {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.receiveShadow = WOBBLY_SPHERE.MESH.RECEIVE_SHADOW
        this.mesh.castShadow = WOBBLY_SPHERE.MESH.CAST_SHADOW
        this.scene.add(this.mesh)
    }

    setDebug()
    {
        if (this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder("Wobbly Sphere")

            this.debugFolder
                .add(wobblySphereParameters.material, 'metalness', 0, 1, 0.001)
                .onChange(() =>
                {
                    this.material.metalness = wobblySphereParameters.material.metalness
                })

            this.debugFolder
                .add(wobblySphereParameters.material, 'roughness', 0, 1, 0.001)
                .onChange(() =>
                {
                    this.material.roughness = wobblySphereParameters.material.roughness
                })

            this.debugFolder
                .add(wobblySphereParameters.material, 'transmission', 0, 1, 0.001)
                .onChange(() =>
                {
                    this.material.transmission = wobblySphereParameters.material.transmission
                })

            this.debugFolder
                .add(wobblySphereParameters.material, 'ior', 0, 10, 0.001)
                .onChange(() =>
                {
                    this.material.ior = wobblySphereParameters.material.ior
                })

            this.debugFolder
                .add(wobblySphereParameters.material, 'thickness', 0, 10, 0.001)
                .onChange(() =>
                {
                    this.material.thickness = wobblySphereParameters.material.thickness
                })

            this.debugFolder
                .add(wobblySphereParameters.material, 'wireframe')
                .onChange(() =>
                {
                    this.material.wireframe = wobblySphereParameters.material.wireframe
                })

            this.debugFolder
                .addColor(wobblySphereParameters.material, 'color')
                .onChange(() =>
                {
                    this.material.color.set(new THREE.Color(wobblySphereParameters.material.color))
                })
        }
    }
}