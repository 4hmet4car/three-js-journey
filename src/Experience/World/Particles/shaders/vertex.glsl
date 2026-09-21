attribute vec2 aParticlesUV;
attribute vec3 aParticlesColor;
attribute float aParticlesSize;

uniform vec2 uResolution;
uniform float uSize;
uniform sampler2D uParticlesPositionTexture;

varying vec3 vColor;

void main()
{
    vec4 particlePosition = texture(uParticlesPositionTexture, aParticlesUV);
    
    // Final position
    vec4 modelPosition = modelMatrix * vec4(particlePosition.xyz, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;

    // Size
    float sizeIn = smoothstep(0.0, 0.1, particlePosition.a);
    float sizeOut = 1.0 - smoothstep(0.7, 1.0, particlePosition.a);
    float size = min(sizeIn, sizeOut);

    // Point size
    gl_PointSize = size * aParticlesSize * uSize * uResolution.y;
    gl_PointSize *= (1.0 / - viewPosition.z);

    // Varyings
    vColor = aParticlesColor;
}