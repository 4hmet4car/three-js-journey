// uniform mat4 modelMatrix;
// uniform mat4 viewMatrix;
// uniform mat4 projectionMatrix;
uniform float uParticleSize;
uniform vec2 uResolution;

// attribute vec3 position;

void main(){
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    vec4 modelViewPosition = viewMatrix * modelPosition;
    vec4 modelViewProjectionPosition = projectionMatrix * modelViewPosition;

    // Final position
    gl_Position = modelViewProjectionPosition;

    // Final size
    gl_PointSize = uParticleSize * uResolution.y;
    // Size atenuation, taken from /three/src/renderers/shaders/ShaderLib/points.glsl.js
    gl_PointSize *= (1.0 / -modelViewPosition.z);
}