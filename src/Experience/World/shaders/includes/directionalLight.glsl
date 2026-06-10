vec3 directionalLight(vec3 lightColor, float lightIntensity, vec3 normal, vec3 lightPosition, vec3 lightTarget, vec3 viewDirection, float specularPower)
{
    vec3 lightDirection = normalize(lightPosition - lightTarget);
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
    
    return lightColor * lightIntensity * (shading + specular);
}