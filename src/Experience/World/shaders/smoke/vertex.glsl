// uniform mat4 modelMatrix;
// uniform mat4 viewMatrix;
// uniform mat4 projectionMatrix;
uniform float uTime;
uniform float uCursorPosition;
uniform sampler2D uPerlinTexture;

// attribute vec3 position;
// attribute vec2 uv;

varying vec2 vUv;

// #include ../includes/rotate2D.glsl

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position,1.0);

    // Twist
    float twistPerlin = texture(
        uPerlinTexture,
        vec2(0.5, uv.y * 0.2 - uTime * 0.005)
    ).r;
    float radius = modelPosition.x;
    float angle = twistPerlin * 10.0;
    
    // modelPosition.x = radius * cos(angle);
    // modelPosition.z = radius * sin(angle);
    // This is the same as above but matrix multiplication is more performant
    modelPosition.xz = mat2
    (
        cos(angle), sin(angle),
        0.0,        0.0
    ) * vec2(radius, 0.0);

    // Wind
    vec2 windOffset = vec2(
        texture(uPerlinTexture, vec2(0.25, uTime * 0.01 + uv.y * uCursorPosition)).r - 0.5,
        texture(uPerlinTexture, vec2(0.75, uTime * 0.01 + uv.y * uCursorPosition)).r - 0.5
    );

    windOffset *= pow(uv.y, 2.0) * 10.0;

    modelPosition.xz += windOffset;

    vec4 modelViewPosition = viewMatrix * modelPosition;
    vec4 modelViewProjectionPosition = projectionMatrix * modelViewPosition;

    //Final position
    gl_Position = modelViewProjectionPosition;

    //Varyings
    vUv = uv;
}