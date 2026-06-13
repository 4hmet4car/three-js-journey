vec3 pointLight(
    vec3 lightColor,
    float lightIntensity,
    vec3 normal,
    vec3 lightPosition,
    vec3 fragmentPosition,
    vec3 viewDirection,
    float specularPower,
    float lightDecay
)
{
    vec3 lightDelta = lightPosition - fragmentPosition;
    float lightDistance = length(lightDelta);
    vec3 lightDirection = normalize(lightDelta);
    vec3 lightReflection = reflect(-lightDirection, normal);

    // Shading
    float shading = dot(lightDirection, normal);
    shading = max(0.0, shading);

    // Reflection
    float specular = -dot(lightReflection, viewDirection);
    specular = max(0.0, specular);
    specular = pow(specular, specularPower);

    // Decay
    float decay = 1.0 - lightDistance * lightDecay;
    decay = max(0.0, decay);

    return lightColor * lightIntensity * decay * (shading + specular);
}