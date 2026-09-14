varying vec3 vColor;

void main()
{
    float alpha = 0.05 / length(gl_PointCoord - 0.5);
    alpha = smoothstep(0.1, 1.0, alpha) * vColor.x;
    
    gl_FragColor = vec4(1.0, 1.0, 1.0, alpha);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}