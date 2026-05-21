// uniform mat4 projectionMatrix;
// uniform mat4 viewMatrix;
// uniform mat4 modelMatrix;

// attribute vec3 position;
// attribute vec3 color;

attribute float aScale;
attribute vec3 aRandomness;

uniform float uTime;
uniform float uSize;

varying vec3 vColor;

void main()
{
    // Position
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    // Spin
    float angle = atan(modelPosition.x,modelPosition.z);
    // modelPosition.x += cos(angle) * 1.0;
    // modelPosition.z -= sin(angle) * 1.0;
    // angle = atan(modelPosition.x,modelPosition.z);
    float distanceFromCenter = length(modelPosition.xz);
    float angleOffset = 0.1 * uTime * (2.0 / distanceFromCenter);
    angle += angleOffset;

    modelPosition.x = cos(angle) * (1.0 + distanceFromCenter);
    modelPosition.z = sin(angle) * (1.0 + distanceFromCenter);

    // Randomness
    modelPosition.xyz += aRandomness.xyz;

    vec4 modelViewPosition = viewMatrix * modelPosition;
    vec4 modelViewProjectionPosition = projectionMatrix * modelViewPosition;
    
    gl_Position = modelViewProjectionPosition;

    // Size
    gl_PointSize = uSize * aScale;
    // Size atenuation, taken from /three/src/renderers/shaders/ShaderLib/points.glsl.js
    gl_PointSize *= (1.0 / -modelViewPosition.z);

    // Varyings
    vColor = color;
}