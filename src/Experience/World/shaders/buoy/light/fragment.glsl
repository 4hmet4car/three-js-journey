// precision mediump float;

uniform float uBuoyLightColor;

void main()
{
    // Clamp it, because tone mapping treats negative
    // values in a weird way, it does not clamp them to 0
    float color = clamp(uBuoyLightColor, 0.0, 1.0);
    
    gl_FragColor = vec4(vec3(color), 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}