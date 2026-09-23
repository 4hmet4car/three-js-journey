attribute vec4 tangent;

uniform float uTime;
uniform float uPositionFrequency;
uniform float uTimeFrequency;
uniform float uStrength;
uniform float uWarpPositionFrequency;
uniform float uWarpTimeFrequency;
uniform float uWarpStrength;

varying vec2 vUv;
varying float vWobble;

#include ../includes/simplexNoise4d.glsl

float getWobble(vec3 position)
{
    vec3 warpedPosition = position;
    warpedPosition += simplexNoise4d(vec4(
        position * uWarpPositionFrequency,
        uTime * uWarpTimeFrequency
    )) * uWarpStrength;
    
    return simplexNoise4d(vec4(
        warpedPosition * uPositionFrequency,  //XYZ
        uTime * uTimeFrequency                //W
    )) * uStrength;
}

void main()
{
    
    // ----------Example1----------
    // csm_Position.y += sin(csm_Position.x * 3.0) * 0.5;
    // ----------------------------

    // Calculate biTangent
    vec3 biTangent = cross(normal, tangent.xyz);

    // Calculate neighbor positions
    float shift = 0.1;
    vec3 positionA = csm_Position + tangent.xyz * shift;
    vec3 positionB = csm_Position + biTangent * shift;

    // Wobble
    float wobble = getWobble(csm_Position);
    csm_Position += wobble * normal;
    positionA += getWobble(positionA) * normal;
    positionB += getWobble(positionB) * normal;

    // Compute normal
    vec3 toA = normalize(positionA - csm_Position);
    vec3 toB = normalize(positionB - csm_Position);
    csm_Normal = cross(toA, toB);

    // Varyings
    // vUv = uv;
    vWobble = wobble / uStrength;
}