precision mediump float;

#define PI 3.1415926535897932384626433832795

varying vec2 vUv;

void main()
{   
    float angle = atan(vUv.x - 0.5, vUv.y - 0.5) / (2.0 * PI);
    
    float strength = mod((angle + 0.5) * 20.0 , 1.0);
    
    gl_FragColor = vec4(strength,strength,strength,1.0);
}