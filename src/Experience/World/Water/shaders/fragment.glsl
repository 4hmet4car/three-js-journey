uniform vec3 uDepthColor;
uniform vec3 uSurfaceColor;
uniform float uColorOffset;
uniform float uColorMultiplier;
uniform vec3 uBuoyLightPosition;

varying float vElevation;
varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vUv;

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
    // vec3 color = vec3(0.0);

    // ----------Light start----------
    vec3 light = vec3(0.0);
    // Directional light
    // light += directionalLight(
    //     vec3(1.0),              // Light color
    //     1.0,                    // Light intensity
    //     normal,                 // Normal
    //     vec3(-1.0, 0.5, 0.0),   // Light position
    //     vec3(0.0),              // Light target position
    //     viewDirection,          // View direction
    //     30.0                    // Specular power
    // );
    // Buoy light
    vec3 buoyLight = pointLight(
        vec3(1.0),              // Light color
        3.0,                    // Light intensity
        normal,                 // Normal
        uBuoyLightPosition,     // Light position
        vPosition,              // Light target position
        viewDirection,          // View direction
        30.0,                   // Specular power
        0.95                    // Decay
    );
    light += buoyLight;
    // Apply the light
    color *= light;
    // -----------Light end-----------

    // Depth emission
    color += uDepthColor * -vElevation * 0.15;
    // Clamp it, because tone mapping treats negative
    // values in a weird way, it does not clamp them to 0
    color = clamp(color, 0.0, 1.0);

    // Smooth edges
    float alpha = 1.0 - distance(vUv, vec2(0.5));
    alpha = smoothstep(0.5,0.6,alpha);

    // color += vec3(0.1);
    
    // Final color
    gl_FragColor = vec4(color, alpha);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}