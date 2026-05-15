precision mediump float;

varying vec2 vUv;

void main()
{
    float strengthX = abs(vUv.x - 0.5);
    float strengthY = abs(vUv.y - 0.5);
    float strength = max(strengthX, strengthY);
    
    gl_FragColor = vec4(strength,strength,strength,1.0);
}