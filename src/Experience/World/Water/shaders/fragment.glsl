// Shader material includes this by default
// precision mediump float;

uniform vec3 uDepthColor;
uniform vec3 uSurfaceColor;
uniform float uColorOffset;
uniform float uColorMultiplier;

varying float vElevation;

void main()
{
    float mixStrength = (vElevation + uColorOffset) * uColorMultiplier;
    
    vec3 blendColor = mix(uDepthColor,uSurfaceColor,mixStrength);
    
    gl_FragColor = vec4(blendColor,1.0);

    #include <colorspace_fragment>
}