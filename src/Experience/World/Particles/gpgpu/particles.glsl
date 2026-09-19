void main()
{
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec4 particlePositions = texture(uParticlesPositions, uv);
    particlePositions.y += 0.001;
    
    gl_FragColor = particlePositions;
}