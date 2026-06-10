// uniform mat4 modelMatrix;
// uniform mat4 viewMatrix;
// uniform mat4 projectionMatrix;

// attribute vec3 position;
// attribute vec3 normal;

varying vec3 vNormal;
varying vec3 vPosition;

void main()
{
    // Position
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * viewMatrix * modelPosition;

    // Update normal orientation
    vec4 modelNormal = modelMatrix * vec4(normal, 0.0);

    // Varyings
    vNormal = modelNormal.xyz;
    vPosition = modelPosition.xyz;
}