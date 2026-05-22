uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

uniform float uTime;
uniform float uSize;

attribute vec3 position;
attribute float aScale;

void main(){
    vec4 modelPosition = modelMatrix * vec4(position,1.0);

    vec4 modelViewPosition = viewMatrix * modelPosition;
    vec4 modelViewProjectionPosition = projectionMatrix * modelViewPosition;
    
    gl_Position = modelViewProjectionPosition;

    // Size
    gl_PointSize = uSize * aScale;
    // Size atenuation, taken from /three/src/renderers/shaders/ShaderLib/points.glsl.js
    gl_PointSize *= (1.0 / -modelViewPosition.z);
}