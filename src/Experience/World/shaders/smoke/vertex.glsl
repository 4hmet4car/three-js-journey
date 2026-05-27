// uniform mat4 modelMatrix;
// uniform mat4 viewMatrix;
// uniform mat4 projectionMatrix;

// attribute vec3 position;

void main(){
    vec4 modelPosition = modelMatrix * vec4(position,1.0);

    vec4 modelViewPosition = viewMatrix * modelPosition;
    vec4 modelViewProjectionPosition = projectionMatrix * modelViewPosition;

    //Final position
    gl_Position = modelViewProjectionPosition;
}