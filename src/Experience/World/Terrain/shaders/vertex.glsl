uniform float uPositionFrequency;
uniform float uDetailAmount;
uniform float uStrength;
uniform float uWarpFrequency;
uniform float uWarpStrength;
uniform float uTime;
uniform float uTranslationSpeed;

varying vec3 vPosition;
varying float vUpDot;

#include ./includes/simplexNoise2d.glsl

float getElevation(vec2 position)
{      
    float elevation = 0.0;
            
    vec2 warpedPosition = position;
    warpedPosition += uTime * uTranslationSpeed;
    warpedPosition += simplexNoise2d(warpedPosition * uPositionFrequency * uWarpFrequency) * uWarpStrength;

    for(float i = 0.0; i < uDetailAmount; i++){
        elevation += simplexNoise2d(warpedPosition * uPositionFrequency * pow(2.0, i)) / pow(2.0, i + 1.0);    
    }
    // This is the same thing as the above "for loop", just explicit
    // elevation += simplexNoise2d(warpedPosition * uPositionFrequency      ) / 2.0;
    // elevation += simplexNoise2d(warpedPosition * uPositionFrequency * 2.0) / 4.0;
    // elevation += simplexNoise2d(warpedPosition * uPositionFrequency * 4.0) / 8.0;

    float elevationSign = sign(elevation);
    elevation = pow(abs(elevation), 2.0) * elevationSign;
    elevation *= uStrength;
    
    return elevation;
}

void main()
{
    // csm_Position.xz += uTime;
    
    // Neighbours' positions
    float shift = 0.01;
    vec3 positionA = position.xyz + vec3(shift, 0.0, 0.0);
    vec3 positionB = position.xyz + vec3(0.0, 0.0, -shift);       

    // Elevation
    float elevation = getElevation(position.xz);
    csm_Position.y += elevation;
    positionA.y = getElevation(positionA.xz);
    positionB.y = getElevation(positionB.xz);

    // Normal
    vec3 toA = normalize(positionA - csm_Position);
    vec3 toB = normalize(positionB - csm_Position);

    csm_Normal = cross(toA, toB);

    vPosition = csm_Position;
    vPosition.xz += uTime * uTranslationSpeed;

    vUpDot = dot(csm_Normal, vec3(0.0, 1.0, 0.0));
}