// Shader material includes this by default
// precision mediump float;

uniform vec3 uDepthColor;
uniform vec3 uSurfaceColor;
uniform float uColorOffset;
uniform float uColorMultiplier;
uniform vec3 uFoamColor;
uniform float uFoamAmount;

varying float vElevation;
varying float vSmallWavesElevation;
varying vec2 vUv;

void main()
{
    float mixStrength = (vElevation + uColorOffset) * uColorMultiplier;
    float foamStrength = smoothstep(0.0, 1.0, -vSmallWavesElevation * uFoamAmount);

    vec3 blendColor = mix(uDepthColor,uSurfaceColor,mixStrength);
    blendColor = mix(uFoamColor, blendColor, foamStrength);

    float alphaStrength = 1.0 - distance(vUv, vec2(0.5)) * 2.0;
    
    gl_FragColor = vec4(blendColor,alphaStrength);

    #include <colorspace_fragment>
}