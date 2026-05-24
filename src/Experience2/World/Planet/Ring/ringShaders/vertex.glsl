uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

uniform mat4 uRotationMatrix;

attribute vec3 position;
attribute vec2 uv;

varying vec2 vUv;

void main(){
    vec4 modelPosition = modelMatrix * vec4(position,1.0);
    
    vec4 rotatedModelPosition = uRotationMatrix * modelPosition;

    vec4 modelViewPosition = viewMatrix * rotatedModelPosition;
    vec4 modelViewProjectionPosition = projectionMatrix * modelViewPosition;
    gl_Position = modelViewProjectionPosition;

    //Varyings
    vUv = uv;
}