uniform float uSliceStart;
uniform float uSliceArc;

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

    // float noise = simplexNoise3d(vPosition);

    // csm_FragColor = vec4(noise);
}