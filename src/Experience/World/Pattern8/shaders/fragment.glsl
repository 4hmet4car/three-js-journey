precision mediump float;

varying vec2 vUv;

void main()
{
    float strength = mod(vUv.y * 10.0, 1.0);
    strength = step(0.5, strength);
    
    // float strength = mod(vUv.y * 10.0, 1.0); //Avoid using if statements
    // strength = strength < 0.5 ? 0.0 : 1.0;
    
    gl_FragColor = vec4(strength,strength,strength,1.0);
}