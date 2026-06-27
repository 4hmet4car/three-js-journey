// precision mediump float;

uniform vec3 uBuoySticksColor;

void main()
{
    gl_FragColor = vec4(uBuoySticksColor, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}