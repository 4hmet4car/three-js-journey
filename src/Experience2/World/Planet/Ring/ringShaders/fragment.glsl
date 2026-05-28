precision mediump float;

uniform float uRingCount;
uniform float uRoot1;
uniform float uRoot2;

varying vec2 vUv;

void main()
{   
    float radius = distance(vUv, vec2(0.5));
    radius *= 2.0;

    // Ring formation
    float strength = abs(sin(radius*uRingCount) * (sin(sqrt(uRoot1)*radius*uRingCount)+sin(sqrt(uRoot2)*radius*uRingCount)))/4.0;

    // Mask with soft edges
    strength *= smoothstep(0.35,0.45,radius);
    strength *= smoothstep(1.0,0.95,radius);

    gl_FragColor = vec4(strength,1.0,1.0,strength);
}