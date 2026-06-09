// precision mediump float;

uniform vec3 uColor;
uniform vec3 uAmbientLightColor;
uniform float uAmbientLightIntensity;

#include ../includes/ambientLight.glsl

void main()
{
    vec3 color = uColor;

    // ----------Light start----------
    // This is the base light
    vec3 light = vec3(0.0);
    // You aggregate different lights together

    // Ambient light
    light += ambientLight(uAmbientLightColor, uAmbientLightIntensity);


    // -----------Light end-----------

    // You multiply the color with the light to apply lighting to the material.
    color *= light;

    // Final color
    gl_FragColor = vec4(color, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}