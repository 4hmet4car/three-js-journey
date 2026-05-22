precision mediump float;

void main()
{   
    float strength = 1.0 / abs(gl_PointCoord.y - 0.5) / 8.0;
    // float strengthY = abs(gl_PointCoord.y - 0.5) / 2.0;
    
    // float strength = 0.001 / sqrt(pow(strengthX, 3.0) + pow(strengthY, 2.0));
    
    gl_FragColor = vec4(1.0,1.0,1.0,strength);
}