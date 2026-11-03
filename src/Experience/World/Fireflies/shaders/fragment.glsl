void main()
{
    float alpha = 0.05 / distance(vec2(0.5), gl_PointCoord) - 0.05 * 2.0;

    gl_FragColor = vec4(1.0, 1.0, 1.0, alpha);
}