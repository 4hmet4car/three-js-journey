void main()
{
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec4 particlePositions = texture(uParticlesPositions, uv);
    
    gl_FragColor = particlePositions;
}