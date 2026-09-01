attribute float aIntensity;
attribute float aAngle;

uniform vec2 uResolution;
uniform sampler2D uPictureTexture;
uniform sampler2D uDisplacementTexture;

varying vec3 vColor;

void main()
{
    vec3 modifiedPosition = position;
    float displacementIntensity = texture(uDisplacementTexture, uv).r;
    displacementIntensity = smoothstep(0.1, 0.3, displacementIntensity);

    vec3 displacement = vec3(
        cos(aAngle) * 0.2,
        sin(aAngle) * 0.2,
        1.0
    );

    displacement = normalize(displacement);
    displacement *= displacementIntensity;
    displacement *= 3.0;
    displacement *= aIntensity;

    modifiedPosition += displacement;
    
    // Final position
    vec4 modelPosition = modelMatrix * vec4(modifiedPosition, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;

    // Picture
    float pictureIntensity = texture(uPictureTexture, uv).r;
    
    // Point size
    gl_PointSize = 0.3 * uResolution.y * pictureIntensity;
    gl_PointSize *= (1.0 / - viewPosition.z);

    // Varying
    vColor = vec3(pow(pictureIntensity,2.0));
}