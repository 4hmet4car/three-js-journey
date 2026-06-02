// uniform mat4 modelMatrix;
// uniform mat4 viewMatrix;
// uniform mat4 projectionMatrix;

// attribute vec3 position;
// attribute vec2 uv;
// attribute vec3 normal;

uniform float uTime;
uniform sampler2D uPerlinTexture;

varying vec3 vPosition;
varying vec3 vNormal;

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position,1.0);

    // ------Glitch start------
    // Get a random value from perlin noise
    float glitchStrength = sin(uTime - modelPosition.y);
    glitchStrength = smoothstep(0.3,1.0,glitchStrength);
    glitchStrength *= 0.5;
    vec2 randomValue = texture(uPerlinTexture, vec2(abs(modelPosition.x),fract(uTime*8.0*abs(modelPosition.z)))).rg - vec2(0.5);
    modelPosition.x += randomValue.r * glitchStrength;
    modelPosition.z += randomValue.g * glitchStrength;
    // -------Glitch end-------

    vec4 modelViewPosition = viewMatrix * modelPosition;
    vec4 modelViewProjectionPosition = projectionMatrix * modelViewPosition;

    // Final position
    gl_Position = modelViewProjectionPosition;

    // ------Transform normal start------
    // You need to apply transformations to the normal too
    // otherwise it will not be transformed with the model
    // the fourt value is 0.0 so that the translation
    // transformations are not applied to the normal.
    vec4 modelNormal = modelMatrix * vec4(normal,0.0);
    // -------Transform normal end-------

    // Varyings
    vPosition = modelPosition.xyz;
    vNormal = modelNormal.xyz;
}