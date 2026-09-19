attribute vec2 aParticlesUV;

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

    // Point size
    gl_PointSize = uSize * uResolution.y;
    gl_PointSize *= (1.0 / - viewPosition.z);

    // Varyings
    vColor = vec3(1.0);
}