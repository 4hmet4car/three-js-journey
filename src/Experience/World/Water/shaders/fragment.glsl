// Shader material includes this by default
// precision mediump float;

varying float vElevation;

void main()
{
    gl_FragColor = vec4(vElevation,0.8,1.0,1.0);

    #include <colorspace_fragment>
}