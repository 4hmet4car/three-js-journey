vec3 pointLight(vec3 lightColor, float lightIntensity, vec3 normal, vec3 lightPosition, vec3 fragmentPosition, vec3 viewDirection, float specularPower, float lightDecay)
{
    vec3 lightDelta = lightPosition - fragmentPosition;
    float lightDistance = length(lightDelta);
    vec3 lightDirection = normalize(lightDelta);
    vec3 lightReflection = reflect(-lightDirection, normal);

    // Shading
    float shading = dot(normal, lightDirection);
    // This clamps the value to a minimum of 1 so that 
    // the resulting dot product from the back of the 
    // meshes do not cancel out the ambient light
    shading = max(0.0, shading);

    // Reflection
    float specular = -dot(lightReflection, viewDirection);
    specular = max(0.0, specular);
    specular = pow(specular, specularPower);

    // Decay
    float decay = 1.0 - lightDistance * lightDecay;
    decay = max(0.0, decay);
    
    // return lightColor * lightIntensity * decay * (shading + specular);
    return lightColor * lightIntensity * (shading + specular);
}