import {
  add,
  atan,
  checker,
  color,
  cos,
  div,
  dot,
  float,
  Fn,
  hash,
  max,
  min,
  mix,
  mul,
  mx_noise_float,
  mx_worley_noise_float,
  parallaxUV,
  PI,
  rand,
  time,
  uv,
  vec2,
  vec3,
  xor,
  sin,
} from 'three/tsl';

export const patterns = {};

{
  const pattern = vec3(0.5, 0, 1);
  patterns.solidPurple = pattern;
}

{
  const pattern = vec3(uv(), 0);
  patterns.uvSpectrum = pattern;
}

{
  const pattern = vec3(uv(), 1);
  patterns.uvSpectrumBlue = pattern;
}

{
  const pattern = vec3(uv().x);
  patterns.verticalGradient = pattern;
}

{
  const pattern = vec3(uv().y);
  patterns.horizontalGradient = pattern;
}

{
  const pattern = vec3(uv().y.oneMinus());
  patterns.horizontalGradientInverted = pattern;
}

{
  const pattern = vec3(uv().y.mul(10));
  patterns.horizontalGradientCompressed = pattern;
}

{
  const pattern = vec3(uv().y.mul(10).fract());
  patterns.horizontalGradientRepeated = pattern;
}

{
  const pattern = vec3(uv().y.mul(10).fract().step(0.5));
  patterns.horizontalStripes = pattern;
}

{
  const pattern = vec3(uv().y.mul(10).fract().step(0.8));
  patterns.horizontalStripesThin = pattern;
}

{
  const pattern = vec3(uv().x.mul(10).fract());
  patterns.verticalGradientRepeated = pattern;
}

{
  const pattern = vec3(uv().x.mul(10).fract().step(0.8));
  patterns.verticalStripesThin = pattern;
}

{
  const horizontalStripes = vec3(uv().y.mul(10).fract().step(0.8));
  const verticalStripes = vec3(uv().x.mul(10).fract().step(0.8));
  const pattern = horizontalStripes.add(verticalStripes);
  patterns.gridLines = pattern;
}

{
  const horizontalStripes = vec3(uv().y.mul(10).fract().step(0.8));
  const verticalStripes = vec3(uv().x.mul(10).fract().step(0.8));
  const pattern = horizontalStripes.mul(verticalStripes);
  patterns.gridSquares = pattern;
}

{
  const horizontalStripes = vec3(uv().y.mul(10).fract().step(0.8));
  const verticalStripes = vec3(uv().x.mul(10).fract().step(0.4));
  const pattern = horizontalStripes.mul(verticalStripes);
  patterns.gridDashesHorizontal = pattern;
}

{
  const horizontalThinStripes = vec3(uv().y.mul(10).fract().step(0.8));
  const horizontalThickStripes = vec3(uv().y.mul(10).fract().step(0.4));

  const verticalThinStripes = vec3(uv().x.mul(10).fract().step(0.8));
  const verticalThickStripes = vec3(uv().x.mul(10).fract().step(0.4));

  const horizontalDashes = horizontalThinStripes.mul(verticalThickStripes);
  const verticalDashes = horizontalThickStripes.mul(verticalThinStripes);

  const pattern = horizontalDashes.add(verticalDashes);
  patterns.gridCorners = pattern;
}

{
  const horizontalThinStripes = uv().y.mul(10).fract().step(0.8);
  const verticalThickStripes = uv().x.mul(10).add(0.8).fract().step(0.4);

  const verticalThinStripes = uv().x.mul(10).fract().step(0.8);
  const horizontalThickStripes = uv().y.mul(10).add(0.8).fract().step(0.4);

  const horizontalDashes = horizontalThinStripes.mul(verticalThickStripes);
  const verticalDashes = verticalThinStripes.mul(horizontalThickStripes);

  const pattern = horizontalDashes.add(verticalDashes);
  patterns.gridCrosses = pattern;
}

{
  const pattern = uv().x.sub(0.5).abs();
  patterns.verticalGradientMirrored = pattern;
}

{
  const verticalCenterGradient = uv().x.sub(0.5).abs();
  const horizontalCenterGradient = uv().y.sub(0.5).abs();

  const pattern = min(verticalCenterGradient, horizontalCenterGradient);
  patterns.crossGradient = pattern;
}

{
  const verticalCenterGradient = uv().x.sub(0.5).abs();
  const horizontalCenterGradient = uv().y.sub(0.5).abs();

  const pattern = max(verticalCenterGradient, horizontalCenterGradient);
  patterns.squareGradient = pattern;
}

{
  const verticalCenterGradient = uv().x.sub(0.5).abs();
  const horizontalCenterGradient = uv().y.sub(0.5).abs();

  const pattern = max(
    verticalCenterGradient,
    horizontalCenterGradient,
  ).step(0.2);
  patterns.squareInverted = pattern;
}

{
  const verticalCenterGradient = uv().x.sub(0.5).abs();
  const horizontalCenterGradient = uv().y.sub(0.5).abs();

  const innerSquare = max(
    verticalCenterGradient,
    horizontalCenterGradient,
  ).step(0.2);
  const outerSquare = max(
    verticalCenterGradient,
    horizontalCenterGradient,
  ).step(0.25);

  const pattern = innerSquare.sub(outerSquare);
  patterns.squareOutline = pattern;
}

{
  const pattern = vec3(
    xor(
      uv().x.mul(10).fract().step(0.5),
      uv().y.mul(10).fract().step(0.5),
    ),
  );
  patterns.checkerboardXor = pattern;
}

{
  const pattern = vec3(
    add(uv().x.mul(10).fract().step(0.5), uv().y.mul(10).fract().step(0.5))
      .sub(1)
      .abs(),
  );
  patterns.checkerboardArithmetic = pattern;
}

{
  const pattern = vec3(checker(uv().mul(10)).oneMinus());
  patterns.checkerboardInverted = pattern;
}

{
  const pattern = uv().length();
  patterns.radialGradientCorner = pattern;
}

{
  const pattern = vec3(uv().distance(vec2(0.5)));
  patterns.radialGradientDistance = pattern;
}

{
  const pattern = vec3(uv().sub(0.5).length());
  patterns.radialGradientLength = pattern;
}

{
  const pattern = vec3(uv().sub(0.5).length().oneMinus());
  patterns.radialGradientInverted = pattern;
}

{
  const pattern = vec3(div(float(0.015), uv().sub(0.5).length()));
  patterns.radialGlow = pattern;
}

{
  const scaledX = uv().x.sub(0.5).abs().div(8);
  const scaledY = uv().y.sub(0.5).abs().div(2);
  const scaledUv = vec2(scaledX, scaledY);
  const pattern = vec3(float(0.015).div(scaledUv.length()));
  patterns.radialGlowElliptical = pattern;
}

{
  const scaledX = uv().x.sub(0.5).abs();
  const scaledY = uv().y.sub(0.5).abs();
  const pattern = vec3(float(0.0015).div(scaledX.mul(scaledY)));
  patterns.crossGlow = pattern;
}

{
  const rotate = Fn(
    ({ coordinates = uv(), rotation = PI.div(4), pivot = vec2(0.5) }) => {
      return vec2(
        cos(rotation)
          .mul(coordinates.x.sub(pivot.x))
          .add(sin(rotation).mul(coordinates.y.sub(pivot.y)))
          .add(pivot.x),
        cos(rotation)
          .mul(coordinates.y.sub(pivot.y))
          .sub(sin(rotation).mul(coordinates.x.sub(pivot.x)))
          .add(pivot.y),
      );
    },
    {
      coordinates: 'vec2',
      rotation: 'float',
      pivot: 'vec2',
      return: 'vec2',
    },
  );

  const rotatedUv = rotate(uv(), PI.div(4), vec2(0.5));
  const scaledX = rotatedUv.x.sub(0.5).abs();
  const scaledY = rotatedUv.y.sub(0.5).abs();
  const pattern = vec3(float(0.0015).div(scaledX.mul(scaledY)));
  patterns.crossGlowRotated = pattern;
}

{
  const pattern = vec3(uv().distance(vec2(0.5)).step(0.25));
  patterns.circleInverted = pattern;
}

{
  const pattern = vec3(uv().distance(vec2(0.5)).sub(0.25).abs());
  patterns.ringGradient = pattern;
}

{
  const pattern = vec3(
    uv().distance(vec2(0.5)).sub(0.25).abs().step(0.01),
  );
  patterns.ringOutlineInverted = pattern;
}

{
  const pattern = vec3(
    uv().distance(vec2(0.5)).sub(0.25).abs().step(0.01).oneMinus(),
  );
  patterns.ringOutline = pattern;
}

{
  const waveX = uv().x;
  const waveY = uv().y.add(sin(waveX.mul(30)).mul(0.1));
  const distortedUv = vec2(waveX, waveY);
  const pattern = vec3(
    distortedUv.distance(vec2(0.5)).sub(0.25).abs().step(0.01).oneMinus(),
  );
  patterns.ringOutlineWavy = pattern;
}

{
  const rippleX = uv().x.add(sin(uv().y.mul(30)).mul(0.1));
  const rippleY = uv().y.add(sin(uv().x.mul(30)).mul(0.1));
  const distortedUv = vec2(rippleX, rippleY);
  const pattern = vec3(
    distortedUv.distance(vec2(0.5)).sub(0.25).abs().step(0.01).oneMinus(),
  );
  patterns.ringOutlineRippled = pattern;
}

{
  const rippleX = uv().x.add(sin(uv().y.mul(100)).mul(0.1));
  const rippleY = uv().y.add(sin(uv().x.mul(100)).mul(0.1));
  const distortedUv = vec2(rippleX, rippleY);
  const pattern = vec3(
    distortedUv.distance(vec2(0.5)).sub(0.25).abs().step(0.01).oneMinus(),
  );
  patterns.ringOutlineRippledDense = pattern;
}

{
  const pattern = vec3(atan(uv().x, uv().y));
  patterns.angularGradientCorner = pattern;
}

{
  const centeredUv = uv().sub(0.5);
  const pattern = vec3(atan(centeredUv.x, centeredUv.y));
  patterns.angularGradientCentered = pattern;
}

{
  const polarUv = uv().sub(0.5);
  const angle = atan(polarUv.x, polarUv.y);
  const pattern = vec3(angle.remap(PI.negate(), PI, 0, 1));
  patterns.angularGradientRemapped = pattern;
}

{
  const polarUv = uv().sub(0.5);
  const angle = atan(polarUv.x, polarUv.y);
  const pattern = vec3(angle.remap(PI.negate(), PI, 0, 1).mul(20).fract());
  patterns.angularGradientRepeated = pattern;
}

{
  const polarUv = uv().sub(0.5);
  const angle = atan(polarUv.x, polarUv.y);
  const pattern = vec3(angle.remap(PI.negate(), PI, 0, 1).mul(100).sin());
  patterns.angularGradientSinusoidal = pattern;
}

{
  const polarUv = uv().sub(0.5);
  const angle = atan(polarUv.x, polarUv.y);
  const sinusoid = angle.remap(PI.negate(), PI, 0, 1).mul(100).sin();
  const radius = float(0.25).add(sinusoid.mul(0.02));
  const pattern = vec3(
    uv().distance(vec2(0.5)).sub(radius).abs().step(0.01).oneMinus(),
  );
  patterns.ringOutlineAngularSinusoidal = pattern;
}

{
  const perlinUV = uv().mul(10);
  const perlinNoise = mx_noise_float(perlinUV);
  const pattern = vec3(perlinNoise);
  patterns.noisePerlin = pattern;
}

{
  const perlinUV = uv().mul(10);
  const perlinNoise = mx_noise_float(perlinUV);
  const pattern = vec3(perlinNoise.step(0));
  patterns.noisePerlinThresholded = pattern;
}

{
  const perlinUV = uv().mul(10);
  const perlinNoise = mx_noise_float(perlinUV);
  const pattern = vec3(perlinNoise.mul(20).sin());
  patterns.noisePerlinSinusoidal = pattern;
}

{
  const perlinUV = uv().mul(10);
  const perlinNoise = mx_noise_float(perlinUV);
  const pattern = vec3(
    mix(vec3(0), vec3(uv(), 1), perlinNoise.mul(20).sin().step(0.9)),
  );
  patterns.noisePerlinContoursColored = pattern;
}

{
  const pattern = vec3(uv().x.mul(10).floor().div(10));
  patterns.verticalGradientStepped = pattern;
}

{
  const subdivisions = 10;
  const gridUv = uv().mul(subdivisions).floor().div(subdivisions);
  const pattern = vec3(gridUv.x.mul(gridUv.y));
  patterns.gridGradient = pattern;
}

{
  const pseudoRandomFunction = Fn(
    ({ coordinates = uv() }) => {
      return dot(coordinates, vec2(100, 4440)).sin().mul(43758.5).fract();
    },
    {
      coordinates: 'vec2',
      return: 'float',
    },
  );

  const pattern = vec3(pseudoRandomFunction());
  patterns.noiseWhite = pattern;
}

{
  const pseudoRandomFunction = Fn(
    ({ coordinates = uv() }) => {
      return dot(coordinates, vec2(100, 4440)).sin().mul(43758.5).fract();
    },
    {
      coordinates: 'vec2',
      return: 'float',
    },
  );

  const subdivision = 10;
  const gridX = uv().x.mul(subdivision).floor().div(subdivision);
  const gridY = uv()
    .y.add(uv().x.div(2))
    .mul(subdivision)
    .floor()
    .div(subdivision);
  const pattern = vec3(pseudoRandomFunction(vec2(gridX, gridY)));
  patterns.noiseGridSkewed = pattern;
}

{
  const subdivision = 10;
  const gridUv = uv().mul(subdivision).floor();
  const random = hash(gridUv.x.add(gridUv.y.mul(subdivision)));
  const pattern = vec3(random);
  patterns.noiseGridHash = pattern;
}

{
  const subdivision = 10;
  const gridUv = uv().mul(subdivision).floor();
  const random = rand(gridUv);
  const pattern = vec3(random);
  patterns.noiseGridRandom = pattern;
}

{
  const perlinUV = uv().mul(5);
  const perlinNoise = mx_noise_float(perlinUV);
  const pattern = vec3(perlinNoise.mul(5).add(time).fract().step(0.8));
  patterns.noisePerlinContoursAnimated = pattern;
}

{
  const palette = Fn(
    ([t, a, b, c, d]) => {
      return a.add(b.mul(cos(mul(6.283185, c.mul(t).add(d)))));
    },
    {
      t: 'float',
      a: 'vec3',
      b: 'vec3',
      c: 'vec3',
      d: 'vec3',
      return: 'vec3',
    },
  );

  const worleyUV = uv().mul(10);
  const worleyNoise = mx_worley_noise_float(vec3(worleyUV, time)).pow(2);
  const pattern = palette(
    worleyNoise,
    vec3(0.5, 0.3, 0.4),
    vec3(0.9, 0.5, 0.4),
    vec3(1.0, 1.0, 1.0),
    vec3(0.0, 0.1, 0.2),
  );
  patterns.noiseWorleyIridescentAnimated = pattern;
}

{
  const depthUV = parallaxUV(uv(), 0.5).xy;
  const causticsInput = vec3(depthUV.mul(6), time.mul(0.3));
  const causticsNoise = mx_worley_noise_float(causticsInput).pow(6);
  const depthColor = mix(color(0x1b3956), color(0x11eeff), causticsNoise);

  const foamInput = vec3(uv().mul(5), time.mul(0.1));
  const foamNoise = mx_noise_float(foamInput);
  const foamMask = foamNoise.abs().step(0.05).oneMinus();
  const foamColor = color(0xe5f7ff);

  const lilyPadInput = uv().mul(4);
  const lilyPadNoise = mx_worley_noise_float(lilyPadInput).pow(2);
  const lilyPadMask = lilyPadNoise.step(0.2).oneMinus();
  const lilyPadColor = mix(
    color(0xd7e689),
    color(0x329a89),
    lilyPadNoise.div(0.2),
  );

  let final = mix(depthColor, foamColor, foamMask);
  final = mix(final, lilyPadColor, lilyPadMask);

  const pattern = vec3(final);
  patterns.lilyPond = pattern;
}
