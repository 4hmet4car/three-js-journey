precision mediump float;

uniform float uRingCount;
uniform float uRoot1;
uniform float uRoot2;

varying vec2 vUv;

void main()
{   
    float strength = distance(vUv, vec2(0.5));

    strength = abs(sin(strength*uRingCount) * (sin(sqrt(uRoot1)*strength*uRingCount)+sin(sqrt(uRoot2)*strength*uRingCount)))/4.0;

    float mask = 1.0 - step(0.15,abs(distance(vUv, vec2(0.5)) - 0.34));

    strength *= mask;
    
    gl_FragColor = vec4(strength*2.0,1.0,1.0,strength);
}