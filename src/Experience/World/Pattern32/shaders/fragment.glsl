precision mediump float;

#define PI 3.1415926535897932384626433832795

varying vec2 vUv;

vec2 rotate(vec2 uv, float rotation, vec2 mid)
{
    return vec2(
      cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x,
      cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y
    );
}

void main()
{   
    vec2 rotatedUv = rotate(vUv, PI/4.0, vec2(0.5));

    float strengthX1 = abs(rotatedUv.x - 0.5) / 8.0;
    float strengthY1 = abs(rotatedUv.y - 0.5) / 1.5;
    
    float strength1 = 0.015 / length(vec2(strengthX1,strengthY1));
    
    float strengthX2 = abs(rotatedUv.x - 0.5) / 1.5;
    float strengthY2 = abs(rotatedUv.y - 0.5) / 8.0;
    
    float strength2 = 0.015 / length(vec2(strengthX2,strengthY2));

    float strength = strength1 * strength2;
    
    gl_FragColor = vec4(strength,strength,strength,1.0);
}