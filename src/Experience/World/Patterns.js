import {
  add,
  atan,
  checker,
  color,
  cos,
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
} from 'three/tsl';

export const patterns = {};

{
  const pattern = vec3(0.5, 0, 1);
  patterns.purple = pattern;
}

{
  const pattern = vec3(uv(), 0);
  patterns.uvBlack = pattern;
}

{
  const pattern = vec3(uv(), 1);
  patterns.uvBlue = pattern;
}

{
  const pattern = vec3(uv().x);
  patterns.horizontalGradient = pattern;
}

{
  const pattern = vec3(uv().y);
  patterns.horizontalGradient = pattern;
}

{
  const pattern = vec3(uv().y.oneMinus());
  patterns.inverseHorizontalGradient = pattern;
}

{
  const pattern = vec3(uv().y.mul(10));
  patterns.horizontalGradientStripe = pattern;
}

{
  const pattern = vec3(uv().y.mul(10).fract());
  patterns.horizontalGradientStripes = pattern;
}

{
  const pattern = vec3(uv().y.mul(10).fract().step(0.5));
  patterns.horizontalStripes = pattern;
}

{
  const pattern = vec3(uv().y.mul(10).fract().step(0.8));
  patterns.thickerHorizontalStripes = pattern;
}

{
  const pattern = vec3(uv().x.mul(10).fract());
  patterns.verticalGradientStripes = pattern;
}

{
  const pattern = vec3(uv().x.mul(10).fract().step(0.8));
  patterns.thickVerticalStripes = pattern;
}

{
  const horizontalStripes = vec3(uv().y.mul(10).fract().step(0.8));
  const verticalStripes = vec3(uv().x.mul(10).fract().step(0.8));
  const pattern = horizontalStripes.add(verticalStripes);
  patterns.grill = pattern;
}

{
  const horizontalStripes = vec3(uv().y.mul(10).fract().step(0.8));
  const verticalStripes = vec3(uv().x.mul(10).fract().step(0.8));
  const pattern = horizontalStripes.mul(verticalStripes);
  patterns.littleSquares = pattern;
}

{
  const horizontalStripes = vec3(uv().y.mul(10).fract().step(0.8));
  const verticalStripes = vec3(uv().x.mul(10).fract().step(0.4));
  const pattern = horizontalStripes.mul(verticalStripes);
  patterns.verticalDashes = pattern;
}

{
  const horizontalThinStripes = vec3(uv().y.mul(10).fract().step(0.8));
  const horizontalThickStripes = vec3(uv().y.mul(10).fract().step(0.4));

  const verticalThinStripes = vec3(uv().x.mul(10).fract().step(0.8));
  const verticalThickStripes = vec3(uv().x.mul(10).fract().step(0.4));

  const verticalDashes = horizontalThinStripes.mul(verticalThickStripes);
  const horizontalDashes = horizontalThickStripes.mul(verticalThinStripes);

  const pattern = verticalDashes.add(horizontalDashes);
  patterns.arrowHeads = pattern;
}

{
  const horizontalThinStripes = uv().y.mul(10).fract().step(0.8);
  const verticalThickStripes = uv().x.mul(10).add(0.8).fract().step(0.4);

  const verticalThinStripes = uv().x.mul(10).fract().step(0.8);
  const horizontalThickStripes = uv().y.mul(10).add(0.8).fract().step(0.4);

  const horizontalDashes = horizontalThinStripes.mul(verticalThickStripes);
  const verticalDashes = verticalThinStripes.mul(horizontalThickStripes);

  const pattern = horizontalDashes.add(verticalDashes);
  patterns.plus = pattern;
}

{
  const pattern = uv().x.sub(0.5).pow2();
  patterns.verticalCenterGradient = pattern;
}

{
  const verticalCenterGradient = uv().x.sub(0.5).pow2();
  const horizontalCenterGradient = uv().y.sub(0.5).pow2();

  const pattern = min(verticalCenterGradient, horizontalCenterGradient);
  patterns.plusGradient = pattern;
}

{
  const verticalCenterGradient = uv().x.sub(0.5).pow2();
  const horizontalCenterGradient = uv().y.sub(0.5).pow2();

  const pattern = max(verticalCenterGradient, horizontalCenterGradient);
  patterns.crossGradient = pattern;
}

{
  const verticalCenterGradient = uv().x.sub(0.5).abs();
  const horizontalCenterGradient = uv().y.sub(0.5).abs();

  const pattern = max(
    verticalCenterGradient,
    horizontalCenterGradient,
  ).step(0.2);
  patterns.bigSquare = pattern;
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
  patterns.squareFrame = pattern;
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
  patterns.checkerboardDiamond = pattern;
}

{
  const pattern = vec3(checker(uv().mul(10)).oneMinus());
  patterns.checkerboard = pattern;
}

{
  const pattern = vec3(uv().distance(vec2(0.5)));
  patterns.radialDistance = pattern;
}

{
  const pattern = vec3(uv().sub(0.5).length());
  patterns.radialGradient = pattern;
}

{
  const polarUv = uv().sub(0.5);
  const angle = atan(polarUv.x, polarUv.y);
  const pattern = vec3(angle.remap(PI.negate(), PI, 0, 1));
  patterns.angularGradient = pattern;
}

{
  const pattern = vec3(uv().x.mul(10).floor().div(10));
  patterns.stepGradient = pattern;
}

{
  const subdivision = 10;
  const gridUv = uv().mul(subdivision).floor();
  const random = hash(gridUv.x.add(gridUv.y.mul(subdivision)));
  const pattern = vec3(random);
  patterns.randomHashGrid = pattern;
}

{
  const subdivision = 10;
  const gridUv = uv().mul(subdivision).floor();
  const random = rand(gridUv);
  const pattern = vec3(random);
  patterns.randomGrid = pattern;
}

{
  const perlinUV = uv().mul(5);
  const perlinNoise = mx_noise_float(perlinUV);
  const pattern = vec3(perlinNoise.mul(5).add(time).fract().step(0.8));
  patterns.animatedPerlinNoise = pattern;
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
  patterns.animatedWorleyPalette = pattern;
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
  patterns.waterCausticsAndLilyPads = pattern;
}
