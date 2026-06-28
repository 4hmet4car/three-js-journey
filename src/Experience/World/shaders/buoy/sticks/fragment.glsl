// precision mediump float;

uniform vec3 uBuoySticksColor;
uniform float uBuoyLightColor;
uniform vec3 uBuoyLightPosition;
uniform vec3 uBuoyLightNormal;

varying vec3 vNormal;
varying vec3 vPosition;

#include ../../includes/pointLight.glsl

void main()
{
    vec3 color = uBuoySticksColor;
    vec3 normal = normalize(vNormal);
    vec3 viewDirection = normalize(vPosition - cameraPosition);
    vec3 lightNormal = normalize(uBuoyLightNormal);
    vec3 lightPosition = uBuoyLightPosition + 0.3 * lightNormal;
    
    // ----------Light start----------
    vec3 light = vec3(0.0);
    // Buoy light
    vec3 buoyLight = pointLight(
        vec3(uBuoyLightColor),        // Light color
        3.0,                    // Light intensity
        normal,                 // Normal
        lightPosition,          // Light position
        vPosition,              // Light target position
        viewDirection,          // View direction
        30.0,                   // Specular power
        0.95                    // Decay
    );
    light += buoyLight;
    // Apply the light
    color *= light;
    // -----------Light end-----------

    gl_FragColor = vec4(color, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}