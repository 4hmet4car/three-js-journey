varying vec2 vUv;

#include ../includes/simplexNoise4d.glsl

void main()
{
    // Example1
    // csm_Position.y += sin(csm_Position.x * 3.0) * 0.5;

    // Wobble
    float wobble = simplexNoise4d(vec4(
        csm_Position,   //XYZ
        0.0             //W
    ));

    csm_Position += wobble * normal;

    // Varyings
    vUv = uv;
}