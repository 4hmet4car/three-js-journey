import * as THREE from 'three'

import Experience from '../Experience.js'

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        // Wait for resources
        this.resources.on('ready', () =>
        {
            // Setup
            /**
             * Test mesh
             */
            // Geometry
            const geometry = new THREE.PlaneGeometry(1, 1, 32, 32)

            // Material
            const material = new THREE.MeshBasicMaterial()

            // Mesh
            const mesh = new THREE.Mesh(geometry, material)
            this.scene.add(mesh)
        })
    }

    update()
    {
        
    }
}