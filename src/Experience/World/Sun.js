import * as THREE from 'three'

import Experience from '../Experience.js'

import { PI, SUN } from '../constants.js'
import { sunParameters } from '../parameters.js'

export default class Sun
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.debug = this.experience.debug

        this.setGeometry()
        this.setMaterial()
        this.setMesh()
        this.setDirection()
        this.setDebug()
    }

    setGeometry()
    {
        this.geometry = new THREE.SphereGeometry(
            SUN.GEOMETRY.RADIUS,
            SUN.GEOMETRY.WIDTH_SEGMENTS,
            SUN.GEOMETRY.HEIGHT_SEGMENTS
        )
    }

    setMaterial()
    {
        this.material = new THREE.MeshBasicMaterial()
    }

    setMesh()
    {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.position.y = SUN.MESH.RADIUS * Math.cos(sunParameters.phi)
        this.mesh.position.x = SUN.MESH.RADIUS * Math.sin(sunParameters.phi) * Math.sin(sunParameters.theta)
        this.mesh.position.z = SUN.MESH.RADIUS * Math.sin(sunParameters.phi) * Math.cos(sunParameters.theta)
        this.scene.add(this.mesh)
    }

    setDirection()
    {
        this.direction = new THREE.Vector3()
        this.direction
            .copy(this.mesh.position)
            .normalize()
    }

    setDebug()
    {
        if (this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder("Sun")

            this.debugFolder
                .add(sunParameters, 'phi')
                .min(-PI)
                .max(PI)
                .step(0.001)
                .onChange(() =>
                {
                    this.mesh.position.x = SUN.MESH.RADIUS * Math.sin(sunParameters.phi) * Math.sin(sunParameters.theta)
                    this.mesh.position.y = SUN.MESH.RADIUS * Math.cos(sunParameters.phi)
                    this.mesh.position.z = SUN.MESH.RADIUS * Math.sin(sunParameters.phi) * Math.cos(sunParameters.theta)

                    this.direction
                        .copy(this.mesh.position)
                        .normalize()
                })

            this.debugFolder
                .add(sunParameters, 'theta')
                .min(-PI)
                .max(PI)
                .step(0.001)
                .onChange(() =>
                {
                    this.mesh.position.x = SUN.MESH.RADIUS * Math.sin(sunParameters.phi) * Math.sin(sunParameters.theta)
                    this.mesh.position.y = SUN.MESH.RADIUS * Math.cos(sunParameters.phi)
                    this.mesh.position.z = SUN.MESH.RADIUS * Math.sin(sunParameters.phi) * Math.cos(sunParameters.theta)

                    this.direction
                        .copy(this.mesh.position)
                        .normalize()
                })
        }
    }

}