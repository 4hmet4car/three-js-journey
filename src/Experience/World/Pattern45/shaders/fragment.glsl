precision mediump float;

#define PI 3.1415926535897932384626433832795

varying vec2 vUv;

void main()
{   
    float angle = atan(vUv.x - 0.5, vUv.y - 0.5) / (2.0 * PI);
    
    float sinusoid = sin((angle + 0.5) * 100.0);

    float radius = 0.25 + sinusoid * 0.02;
    
    float strength = 1.0 - step(0.01,abs(distance(vUv, vec2(0.5)) - radius));
    
    gl_FragColor = vec4(strength,strength,strength,1.0);
}