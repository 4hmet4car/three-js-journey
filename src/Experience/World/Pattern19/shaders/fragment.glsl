precision mediump float;

varying vec2 vUv;

void main()
{
    float strengthX = abs(vUv.x - 0.5);
    float strengthY = abs(vUv.y - 0.5);
    float strength = step(0.2,max(strengthX, strengthY));
    
    gl_FragColor = vec4(strength,strength,strength,1.0);
}