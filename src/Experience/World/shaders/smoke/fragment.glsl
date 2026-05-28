// precision mediump float;

uniform float uTime;
// uniform vec2 uCursorPosition;
uniform vec3 uSmokeColor;
uniform sampler2D uPerlinTexture;

varying vec2 vUv;

void main()
{
    // Scale and animate
    vec2 smokeUv = vUv;
    smokeUv.x *= 0.5;
    smokeUv.y *= 0.3;
    smokeUv.y -= uTime * 0.03;
    // smokeUv.y = mod(smokeUv.y*0.3,1.0);

    // Smoke
    float smoke = texture(uPerlinTexture,smokeUv).r;
    // Remap
    smoke = smoothstep(0.4,1.0,smoke);
    // Edges
    smoke *= smoothstep(0.0,0.1,vUv.x);
    smoke *= smoothstep(1.0,0.9,vUv.x);
    smoke *= smoothstep(0.0,0.1,vUv.y);
    smoke *= smoothstep(1.0,0.4,vUv.y);

    // smoke *= abs(uCursorPosition.x);

    // Final color
    gl_FragColor = vec4(uSmokeColor,smoke);
    // gl_FragColor = vec4(1.0,0.0,0.0,1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}