varying vec3 vPosition;

void main()
{
    if(1.0 < atan(vPosition.y, vPosition.x))
        discard;

    if(!gl_FrontFacing)
        csm_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}