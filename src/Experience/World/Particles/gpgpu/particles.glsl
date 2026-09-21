uniform sampler2D uInitialParticlesPositions;
uniform float uTime;
uniform float uDeltaTime;
uniform float uFlowFieldInfluence;
uniform float uFlowFieldStrength;
uniform float uFlowFieldFrequency;

#include ../includes/simplexNoise4d.glsl

void main()
{
    float time = uTime * 0.2;
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec4 particlePositions = texture(uParticlesPositions, uv);
    vec4 initialParticlePositions = texture(uInitialParticlesPositions, uv);

    // Dead
    if(particlePositions.a >= 1.0){
        particlePositions.a = mod(particlePositions.a, 1.0);
        particlePositions.xyz = initialParticlePositions.xyz;
    }else{
        // Strength
        float strength = simplexNoise4d(vec4(initialParticlePositions.xyz * 0.2, time + 1.0));
        float influence = (uFlowFieldInfluence - 0.5) * (-2.0);
        strength = smoothstep(influence, 1.0, strength);
        
        // Flow field
        // This gives the direction that particle should move towards
        vec3 flowField = vec3(
            simplexNoise4d(vec4(particlePositions.xyz * uFlowFieldFrequency + 0.0, time)),
            simplexNoise4d(vec4(particlePositions.xyz * uFlowFieldFrequency + 1.0, time)),
            simplexNoise4d(vec4(particlePositions.xyz * uFlowFieldFrequency + 2.0, time))
        );
        // Since it is a direction, we need to normalize it
        flowField = normalize(flowField);
        particlePositions.xyz += uDeltaTime * flowField * uFlowFieldStrength * strength;

        particlePositions.a += uDeltaTime * 0.3;
    }
        
    gl_FragColor = particlePositions;
}