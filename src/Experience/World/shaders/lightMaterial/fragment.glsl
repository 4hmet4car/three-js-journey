// precision mediump float;

uniform vec3 uColor;
uniform vec3 uAmbientLightColor;
uniform float uAmbientLightIntensity;
uniform vec3 uDirectionalLightColor;
uniform float uDirectionalLightIntensity;
uniform vec3 uDirectionalLightPosition;
uniform vec3 uDirectionalLightTarget;
uniform float uDirectionalLightSpecularPower;
uniform vec3 uPointLightColor;
uniform float uPointLightIntensity;
uniform vec3 uPointLightPosition;
uniform float uPointLightSpecularPower;
uniform float uPointLightDecay;
uniform vec3 uCursorLightColor;
uniform vec3 uCursorLightPosition;

varying vec3 vNormal;
varying vec3 vPosition;

#include ../includes/ambientLight.glsl
#include ../includes/directionalLight.glsl
#include ../includes/pointLight.glsl

void main()
{
    vec3 normal = normalize(vNormal);
    vec3 viewDirection = normalize(vPosition - cameraPosition);
    vec3 color = uColor;

    // ----------Light start----------
    // This is the base light
    vec3 light = vec3(0.0);
    // You aggregate different lights together

    // Ambient light
    light += ambientLight(
        uAmbientLightColor,
        uAmbientLightIntensity
    );

    // Directional light
    light += directionalLight(
        uDirectionalLightColor,
        uDirectionalLightIntensity,
        normal,
        uDirectionalLightPosition,
        uDirectionalLightTarget,
        viewDirection,
        uDirectionalLightSpecularPower
    );

    // Point light
    light += pointLight(
        uPointLightColor,
        uPointLightIntensity,
        normal,
        uPointLightPosition,
        vPosition,
        viewDirection,
        uPointLightSpecularPower,
        uPointLightDecay
    );

    // Cursor light
    light += pointLight(
        uCursorLightColor,
        uPointLightIntensity,
        normal,
        uCursorLightPosition,
        vPosition,
        viewDirection,
        uPointLightSpecularPower,
        uPointLightDecay
    );


    // -----------Light end-----------

    // You multiply the color with the light to apply lighting to the material.
    color *= light;

    // Final color
    gl_FragColor = vec4(color, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}