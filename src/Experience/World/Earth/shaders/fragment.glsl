uniform sampler2D uEarthDayTexture;
uniform sampler2D uEarthNightTexture;
uniform sampler2D uEarthSpecularCloudsTexture;
uniform vec3 uSunDirection;
uniform vec3 uAtmosphereDayColor;
uniform vec3 uAtmosphereTwilightColor;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

void main()
{
    vec3 viewDirection = normalize(vPosition - cameraPosition);
    vec3 normal = normalize(vNormal);
    vec3 color = vec3(0.0);

    // Sun orientation
    float sunOrientation = dot(uSunDirection, normal);
    
    // Day-night color
    float dayMix = smoothstep(-0.25, 0.5, sunOrientation);
    vec3 DayColor = texture2D(uEarthDayTexture, vUv).rgb;
    vec3 nightColor = texture2D(uEarthNightTexture, vUv).rgb;
    color = mix(nightColor, DayColor, dayMix);

    // Specular clouds color
    vec2 specularCloudsColor = texture2D(uEarthSpecularCloudsTexture,vUv).rg;
    
    // Clouds
    float cloudsMix = smoothstep(0.1, 1.0, specularCloudsColor.g);
    cloudsMix *= dayMix;
    color = mix(color, vec3(1.0), cloudsMix);

    // Fresnel
    float fresnel = 1.0 + dot(viewDirection, normal);
    fresnel = pow(fresnel, 2.0);
    
    // Atmosphere
    float atmosphereDayMix = smoothstep(-0.5, 1.0, sunOrientation);
    vec3 atmosphereColor = mix(uAtmosphereTwilightColor, uAtmosphereDayColor, atmosphereDayMix);
    color = mix(color, atmosphereColor, fresnel * atmosphereDayMix);

    // Specular
    vec3 reflection = reflect(-uSunDirection, normal);
    float specular = -dot(reflection, viewDirection);
    specular = max(specular, 0.0);
    specular = pow(specular, 32.0);
    specular *= specularCloudsColor.r;

    vec3 specularColor = mix(vec3(1.0), atmosphereColor, fresnel);
    color += specular * specularColor;

    // Final color
    gl_FragColor = vec4(color, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}