// precision mediump float;

uniform vec3 uBuoyLightColor;

void main()
{
    gl_FragColor = vec4(uBuoyLightColor, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}