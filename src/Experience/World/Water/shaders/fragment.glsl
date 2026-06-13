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
        vec3(1.0),
        1.0,
        normal,
        vec3(0.0, 3.0, 3.0),
        vec3(0.0),
        viewDirection,
        20.0
    );
    // Point light
    light += pointLight(
        vec3(1.0),
        1.0,
        normal,
        vec3(0.0, 2.5, 0.0),
        vPosition,
        viewDirection,
        20.0,
        0.25
    );
    // -----------Light end-----------

    color *= light;
    
    // Final color
    gl_FragColor = vec4(color, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}