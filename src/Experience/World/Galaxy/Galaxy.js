import * as THREE from 'three'

import Experience from "../../Experience.js"
import parameters from "../../parameters.js"

export default class Galaxy
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene

        this.setGeometry()
        this.setMaterial()
        this.setPoints()
        this.setDebug()
    }

    setGeometry()
    {
        this.geometry = new THREE.BufferGeometry()

        this.positions = new Float32Array(parameters.galaxy.particleCount * 3)
        this.colors = new Float32Array(parameters.galaxy.particleCount * 3)

        this.insideColor = new THREE.Color(parameters.galaxy.insideColor)
        this.outsideColor = new THREE.Color(parameters.galaxy.outsideColor)

        for (let i = 0; i < parameters.galaxy.particleCount; i++)
        {
            const i3 = i * 3

            // Position
            const radius = Math.random() * parameters.galaxy.branchRadius

            const branchAngle = (i % parameters.galaxy.branches) / parameters.galaxy.branches * Math.PI * 2

            const randomX = Math.pow(Math.random(), parameters.galaxy.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * parameters.galaxy.randomness * radius
            const randomY = Math.pow(Math.random(), parameters.galaxy.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * parameters.galaxy.randomness * radius
            const randomZ = Math.pow(Math.random(), parameters.galaxy.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * parameters.galaxy.randomness * radius

            this.positions[i3] = Math.cos(branchAngle) * radius + randomX
            this.positions[i3 + 1] = randomY
            this.positions[i3 + 2] = Math.sin(branchAngle) * radius + randomZ

            // Color
            const mixedColor = this.insideColor.clone()
            mixedColor.lerp(this.outsideColor, radius / parameters.galaxy.branchRadius)

            this.colors[i3] = mixedColor.r
            this.colors[i3 + 1] = mixedColor.g
            this.colors[i3 + 2] = mixedColor.b
        }

        this.geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3))
        this.geometry.setAttribute('color', new THREE.BufferAttribute(this.colors, 3))

    }

    setMaterial()
    {
        this.material = new THREE.PointsMaterial({
            size: parameters.galaxy.particleSize,
            sizeAttenuation: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            vertexColors: true
        })
    }

    setPoints()
    {
        this.points = new THREE.Points(this.geometry, this.material)
        this.scene.add(this.points)
    }

    setDebug(){
        
    }

    update()
    {

    }
}