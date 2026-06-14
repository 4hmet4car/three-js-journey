uniform vec3 uDepthColor;
uniform vec3 uSurfaceColor;
uniform float uColorOffset;
uniform float uColorMultiplier;

varying float vElevation;
varying vec3 vNormal;
varying vec3 vPosition;

#include ./includes/ambientLight.glsl
#include ./includes/directionalLight.glsl
#include ./includes/pointLight.glsl

void main()
{
    // View direction
    vec3 normal = normalize(vNormal);
    vec3 viewDirection = normalize(vPosition - cameraPosition);
    
    // Base color
    float mixStrength = (vElevation + uColorOffset) * uColorMultiplier;
    mixStrength = smoothstep(0.0, 1.0, mixStrength);
    vec3 color = mix(uDepthColor, uSurfaceColor, mixStrength);

    // ----------Light start----------
    vec3 light = vec3(0.0);
    // Directional light
    light += directionalLight(
        vec3(1.0),              // Light color
        1.0,                    // Light intensity
        normal,                 // Normal
        vec3(-1.0, 0.5, 0.0),   // Light position
        vec3(0.0),              // Light target position
        viewDirection,          // View direction
        30.0                    // Specular power
    );
    // Point light
    // light += pointLight(
    //     vec3(1.0),
    //     1.0,
    //     normal,
    //     vec3(0.0, 2.5, 0.0),
    //     vPosition,
    //     viewDirection,
    //     20.0,
    //     0.25
    // );
    // Apply the light
    color *= light;
    // -----------Light end-----------
    
    // Final color
    gl_FragColor = vec4(color, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}