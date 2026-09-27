uniform float uSliceStart;
uniform float uSliceArc;
uniform float uHorizontalCut;
uniform float uTime;

varying vec3 vPosition;

#include ../includes/simplexNoise3d.glsl

void main()
{
    float angle = atan(vPosition.y, vPosition.x);
    angle -= uSliceStart;
    angle = mod(angle, PI2);
    
    if(0.0 < angle && angle < uSliceArc)
        discard;

    float csm_Slice;

    float noise = simplexNoise3d(vec3(vPosition.xz, uTime * 0.05) * 2.0) * 0.05;
    
    if(vPosition.y > uHorizontalCut + noise)
        discard;

        // csm_FragColor = vec4(noise);
}