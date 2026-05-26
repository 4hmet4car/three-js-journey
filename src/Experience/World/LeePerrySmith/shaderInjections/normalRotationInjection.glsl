#include <beginnormal_vertex>

float angle = sin(uFrequency * (position.y + uTime * uSpeed)) * uAmplitude;

mat2 rotationMatrix = get2DRotationMatrix(angle);

objectNormal.xz = rotationMatrix * objectNormal.xz;