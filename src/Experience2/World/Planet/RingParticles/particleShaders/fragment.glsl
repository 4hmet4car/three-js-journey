precision mediump float;

void main()
{   
    float strengthX1 = abs(gl_PointCoord.x - 0.5) / 8.0;
    float strengthY1 = abs(gl_PointCoord.y - 0.5) / 1.5;
    
    float strength1 = 0.015 / length(vec2(strengthX1,strengthY1));
    
    float strengthX2 = abs(gl_PointCoord.x - 0.5) / 1.5;
    float strengthY2 = abs(gl_PointCoord.y - 0.5) / 8.0;
    
    float strength2 = 0.015 / length(vec2(strengthX2,strengthY2));

    float strength = strength1 * strength2;
    
    gl_FragColor = vec4(1.0,1.0,1.0,strength);
}