// precision mediump float;

uniform float uTime;
uniform vec3 uColor;
uniform sampler2D uPerlinTexture;

varying vec3 vPosition;
varying vec3 vNormal;

void main()
{
    // ------Stripes start------
    float stripes = mod((vPosition.y - uTime * 0.02) * 20.0, 1.0);
    // Make the stripes sharper
    stripes = pow(stripes,3.0);
    // -------Stripes end-------

    // ------Fresnel start------
    // View direction vector
    vec3 viewDirection = vPosition - cameraPosition;
    viewDirection = normalize(viewDirection);
    // Normal vector
    vec3 normal = vNormal;
    normal = normalize(normal);
    // Invert back facing normals
    if(!gl_FrontFacing)
        normal *= - 1.0;
    // Compare normal and view direction
    float fresnel = dot(viewDirection,normal) + 1.0;
    // Make the fresnel sharper
    fresnel = pow(fresnel,2.0);
    // Falloff the fresnel
    float falloff = smoothstep(0.8,0.0,fresnel);
    fresnel *= falloff;
    // -------Fresnel end-------

    // ------Combination start------
    float holographic = stripes * fresnel;
    // Make fresnel more apparent
    holographic += fresnel * 1.25;
    // -------Combination end-------
    
    // Final color
    gl_FragColor = vec4(uColor,holographic);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}