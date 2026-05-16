precision mediump float;

varying vec2 vUv;

void main()
{   
    float strength = sqrt(pow(vUv.x,2.0) + pow(vUv.y,2.0));
    
    gl_FragColor = vec4(strength,strength,strength,1.0);
}