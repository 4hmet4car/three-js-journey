void main()
{
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec4 positions = texture(uParticlesPositions, uv);
    positions.y += 0.001;
    
    gl_FragColor = positions;
}