// uniform mat4 modelMatrix;
// uniform mat4 viewMatrix;
// uniform mat4 projectionMatrix;
uniform float uParticleSize;
uniform vec2 uResolution;
uniform float uProgress;
uniform float uGravity;

// attribute vec3 position;
attribute float aSize;
attribute float aTimeMultiplier;

#include ../includes/remap.glsl

void main(){
    // Randomize the speed
    float progress = uProgress * aTimeMultiplier;
    
    // Assign position to a new variable to be able to modify it
    vec3 newPosition = position;

    // ----------Exploding start----------
    // // This remaps progress from 0-1 to 0-0.1
    // float explodingProgress = clampedRemap(progress, 0.0, 0.1, 0.0, 1.0);
    // // This applies easing
    // explodingProgress = 1.0 - pow(1.0 - explodingProgress, 3.0);
    // newPosition *= explodingProgress;
    // -----------Exploding end-----------

    // ----------Projectile start----------
    newPosition.xz *= progress;
    newPosition.y = newPosition.y * progress - 0.5 * uGravity * progress * progress;
    // -----------Projectile end-----------

    // -----------Falling start-----------
    float fallingProgress = clampedRemap(progress, 0.1, 1.0, 0.0, 1.0);
    // This applies easing
    fallingProgress = 1.0 - pow(1.0 - fallingProgress, 3.0);
    newPosition.y -= fallingProgress * 0.2;
    // ------------Falling end------------

    // -----------Scaling start-----------
    float scalingOpeningProgress = remap(progress, 0.0, 0.125, 0.0, 1.0);
    float scalingClosingProgress = remap(progress, 0.125, 1.0, 1.0, 0.0);
    float scalingProgress = min(scalingOpeningProgress, scalingClosingProgress);
    scalingProgress = clamp(scalingProgress, 0.0, 1.0);
    // ------------Scaling end------------

    // ----------Twinkling start----------
    float twinklingProgress = clampedRemap(progress, 0.2, 0.8, 0.0, 1.0);
    float scaleTwinkling = sin(progress * 30.0) * 0.5 + 0.5;
    scaleTwinkling = 1.0 - scaleTwinkling * twinklingProgress;
    // -----------Twinkling end-----------

    // Final position
    vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
    vec4 modelViewPosition = viewMatrix * modelPosition;
    vec4 modelViewProjectionPosition = projectionMatrix * modelViewPosition;
    gl_Position = modelViewProjectionPosition;

    // Final size
    gl_PointSize = uParticleSize * uResolution.y * aSize * scalingProgress * scaleTwinkling;
    // Size atenuation, taken from /three/src/renderers/shaders/ShaderLib/points.glsl.js
    gl_PointSize *= (1.0 / -modelViewPosition.z);

    // This hides the particles that are smaller than 1
    // Just yeets them to the oblivion
    if(gl_PointSize < 1.0)
        gl_Position = vec4(9999.9);
}