// uniform mat4 modelMatrix;
// uniform mat4 viewMatrix;
// uniform mat4 projectionMatrix;

// attribute vec3 position;
// attribute vec3 normal;

varying vec3 vNormal;
varying vec3 vPosition;

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 modelViewPosition = viewMatrix * modelPosition;
    vec4 projectionModelViewPosition = projectionMatrix * modelViewPosition;

    gl_Position = projectionModelViewPosition;

    // Varyings
    vNormal = (modelMatrix * vec4(normal, 0.0)).xyz;
    vPosition = modelPosition.xyz;
}