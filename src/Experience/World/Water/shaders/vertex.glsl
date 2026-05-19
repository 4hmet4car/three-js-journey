/*
//Shader material includes these by default
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

attribute vec3 position;
*/

uniform float uPI;

uniform float uTime;

uniform float uBigWavesElevation;
uniform vec2 uBigWavesFrequency;
uniform float uBigWavesSpeed;

uniform float uSmallWavesElevation;
uniform float uSmallWavesFrequency;
uniform float uSmallWavesSpeed;
uniform float uSmallWavesIterations;

varying float vElevation;
varying vec2 vUv;

//Perlin noise
#include ./perlinNoise.glsl

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    // Elevation
    float bigWavesFrequencyX = sin(modelPosition.x * uPI * uBigWavesFrequency.x + uTime * uBigWavesSpeed);
    float bigWavesFrequencyZ = sin(modelPosition.z * uPI * uBigWavesFrequency.y + uTime * uBigWavesSpeed);
    float bigWavesElevation = bigWavesFrequencyX * bigWavesFrequencyZ * uBigWavesElevation;

    for(float i = 1.0; i <= uSmallWavesIterations; i++)
    {
        bigWavesElevation -= abs(cnoise(vec3(modelPosition.xz * uSmallWavesFrequency * i, uTime * uSmallWavesSpeed)) * uSmallWavesElevation) / i;
    }
    
    modelPosition.y += bigWavesElevation;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    
    gl_Position = projectedPosition;

    // Varyings
    vElevation = bigWavesElevation;
    vUv = uv;
}