uniform float uTime;
uniform vec3 uColorStart;
uniform vec3 uColorEnd;

varying  vec2 vUv;

#include ./includes/perlinNoise3D.glsl

void main()
{
    // Displace the UV
    vec2 displacedUV = vUv + cnoise(vec3(vUv * 5.0, uTime * 0.1));
    
    // Perlin noise
    float strength = cnoise(vec3(displacedUV * 5.0, uTime * 0.2));

    // Outer glow
    float outerGlow = smoothstep(0.2, 0.5, distance(vec2(0.5), vUv));

    strength = mix(strength, 1.0, outerGlow);
    strength += step(0.1, strength) * 0.5;
    strength = clamp(strength, 0.0, 1.0);

    // Final color
    vec3 color = mix(uColorStart, uColorEnd, strength);
    
    gl_FragColor = vec4(color, 1.0);

    #include <colorspace_fragment>
}