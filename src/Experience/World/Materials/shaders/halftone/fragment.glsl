uniform vec3 uColor;
uniform vec2 uResolution;

varying vec3 vNormal;
varying vec3 vPosition;

#include ../includes/ambientLight.glsl
#include ../includes/directionalLight.glsl

void main()
{
    vec3 viewDirection = normalize(vPosition - cameraPosition);
    vec3 normal = normalize(vNormal);
    vec3 color = uColor;

    // ----------Light start---------
    vec3 light = vec3(0);
    
    // Ambient light
    light += ambientLight(
        vec3(1.0),              // Light color
        1.0                     // Light intensity
    );
    
    // Directional light
    light += directionalLight(
        vec3(1.0, 1.0, 1.0),    // Light color
        1.0,                    // Light intensity
        normal,                 // Normal
        vec3(1.0, 1.0, 0.0),    // Light position
        viewDirection,          // View direction
        1.0                     // Specular power
    );

    // Apply Light
    color *= light;
    // ----------Light end----------

    // ----------Halftone start----------
    vec2 uv = gl_FragCoord.xy / uResolution;
    // -----------Halftone end-----------

    // Final color
    gl_FragColor = vec4(uv, 1.0, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}