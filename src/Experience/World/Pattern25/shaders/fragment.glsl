precision mediump float;

varying vec2 vUv;

float random(vec2 st)
{
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main()
{ 
    float strengthX = floor(vUv.x * 10.0) / 10.0;
    float strengthY = floor(((vUv.x / 2.0 + vUv.y) * 2.0 / 3.0) * 15.0) / 15.0;
    
    float strength = random(vec2(strengthX,strengthY));
    
    gl_FragColor = vec4(strength,strength,strength,1.0);
}