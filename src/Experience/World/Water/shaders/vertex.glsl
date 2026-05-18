/*
//Shader material includes these by default
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

attribute vec3 position;
*/

#define PI 3.1415926535897932384626433832795

uniform float uTime;
uniform float uBigWavesElevation;
uniform vec2 uBigWavesFrequency;

varying float vElevation;

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    // Elevation
    float bigWavesFrequencyX = sin(modelPosition.x * PI * uBigWavesFrequency.x + uTime);
    float bigWavesFrequencyZ = sin(modelPosition.z * PI * uBigWavesFrequency.y + uTime);
    float bigWavesElevation = bigWavesFrequencyX * bigWavesFrequencyZ * uBigWavesElevation;
    
    modelPosition.y = bigWavesElevation;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    
    gl_Position = projectedPosition;

    vElevation = bigWavesFrequencyX * bigWavesFrequencyZ;
}