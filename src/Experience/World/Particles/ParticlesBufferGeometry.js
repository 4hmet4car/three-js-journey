import * as THREE from 'three'

export default class ParticlesBufferGeometry
{
    constructor(vertexCount, size)
    {
        this.setParticlesUVArray(vertexCount, size)
        this.setInstance(vertexCount)
        this.setUVAttribute()
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

    setInstance(vertexCount)
    {
        this.instance = new THREE.BufferGeometry()
        this.instance.setDrawRange(0, vertexCount)
    }

    setUVAttribute()
    {
        this.instance.setAttribute('aParticlesUV', new THREE.BufferAttribute(this.particlesUVArray, 2))
    }
}