// precision mediump float;

uniform sampler2D uTexture;

void main(){
    
    
    float texture = texture(uTexture,gl_PointCoord).r;
    
    // Final color
    gl_FragColor = vec4(1.0,0.0,0.0,texture);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}