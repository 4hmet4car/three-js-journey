uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

uniform mat4 uRotationMatrix;

uniform float uTime;
uniform float uSize;

attribute vec3 position;
attribute float aScale;
attribute float aAngle;

// varying float vAngle;

void main(){
    vec4 modelPosition = modelMatrix * vec4(position,1.0);

    float radius = length(modelPosition.xyz);
    float angleOffset = 0.1 * uTime / radius;
    float angle = aAngle + angleOffset;
    modelPosition.x = cos(angle) * radius;
    modelPosition.y = 0.0;
    modelPosition.z = sin(angle) * radius;

    vec4 rotatedModelPosition = uRotationMatrix * modelPosition;

    vec4 modelViewPosition = viewMatrix * rotatedModelPosition;
    vec4 modelViewProjectionPosition = projectionMatrix * modelViewPosition;
    
    gl_Position = modelViewProjectionPosition;

    // Size
    gl_PointSize = uSize * aScale;
    // Size atenuation, taken from /three/src/renderers/shaders/ShaderLib/points.glsl.js
    gl_PointSize *= (1.0 / -modelViewPosition.z);

    // // Varyings
    // vAngle = aAngle;
}