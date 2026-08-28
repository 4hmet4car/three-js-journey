uniform vec2 uResolution;
uniform sampler2D uPictureTexture;

varying vec3 vColor;

void main()
{
    // Final position
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;

    // Picture
    float pictureIntensity = texture2D(uPictureTexture, uv).r;
    
    // Point size
    gl_PointSize = 0.3 * uResolution.y * pictureIntensity;
    gl_PointSize *= (1.0 / - viewPosition.z);

    // Varying
    vColor = vec3(pow(pictureIntensity,2.0));
}