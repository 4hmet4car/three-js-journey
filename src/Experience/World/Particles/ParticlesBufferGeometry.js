import * as THREE from 'three'

export default class ParticlesBufferGeometry
{
    constructor(vertexCount, size, colorAttribute)
    {
        this.setParticlesUVArray(vertexCount, size)
        this.setParticlesSizeArray(vertexCount)
        this.setInstance(vertexCount)
        this.setUVAttribute()
        this.setColorAttribute(colorAttribute)
        this.setRandomSizeAttribute(vertexCount)
    }

    setParticlesUVArray(vertexCount, size)
    {
        this.particlesUVArray = new Float32Array(vertexCount * 2)

        for (let y = 0; y < size; y++)
        {
            for (let x = 0; x < size; x++)
            {
                const i = y * size + x
                const i2 = i * 2

                this.particlesUVArray[i2 + 0] = x / size + (1 / 2) / size
                this.particlesUVArray[i2 + 1] = y / size + (1 / 2) / size
            }
        }
    }

    setParticlesSizeArray(vertexCount)
    {
        this.particlesSizeArray = new Float32Array(vertexCount)

        for (let i = 0; i < vertexCount; i++)
        {
            this.particlesSizeArray[i] = Math.random()
        }
    }

    setInstance(vertexCount)
    {
        this.instance = new THREE.BufferGeometry()
        this.instance.setDrawRange(0, vertexCount)
    }

    setUVAttribute()
    {
        this.instance.setAttribute('aParticlesUV', new THREE.BufferAttribute(this.particlesUVArray, 2))
    }

    setColorAttribute(colorAttribute)
    {
        this.instance.setAttribute('aParticlesColor', colorAttribute)
    }

    setRandomSizeAttribute()
    {
        this.instance.setAttribute('aParticlesSize', new THREE.BufferAttribute(this.particlesSizeArray, 1))
    }
}