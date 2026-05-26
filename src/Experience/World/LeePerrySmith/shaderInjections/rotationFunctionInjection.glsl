#include <common>

uniform float uTime;
uniform float uFrequency;
uniform float uSpeed;
uniform float uAmplitude;

varying float vPositionY;

mat2 get2DRotationMatrix(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}