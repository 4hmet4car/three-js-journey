precision mediump float;

varying vec2 vUv;

void main()
{   
    float strengthX = abs(vUv.x - 0.5) / 8.0;
    float strengthY = abs(vUv.y - 0.5) / 2.0;
    
    float strength = 0.015 / sqrt(pow(strengthX, 2.0) + pow(strengthY, 2.0));
    
    gl_FragColor = vec4(strength,strength,strength,1.0);
}