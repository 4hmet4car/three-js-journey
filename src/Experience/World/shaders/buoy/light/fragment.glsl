// precision mediump float;

uniform float uBuoyLightColor;

void main()
{
    gl_FragColor = vec4(vec3(uBuoyLightColor), 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}