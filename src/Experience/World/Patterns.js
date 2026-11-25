import {
  acos,
  add,
  atan,
  checker,
  cos,
  div,
  float,
  Fn,
  HALF_PI,
  hash,
  Loop,
  mul,
  mx_noise_float,
  mx_noise_vec3,
  mx_worley_noise_float,
  PI,
  rand,
  sin,
  time,
  uv,
  vec2,
  vec3,
  xor,
} from 'three/tsl';

// export const pattern = vec3(uv(), 1);

// export const pattern = vec3(uv().x);

// export const pattern = vec3(uv().x.mul(10).fract());

// export const pattern = vec3(
//   xor(
//     uv().x.mul(10).fract().step(0.5),
//     uv().y.mul(10).fract().step(0.5),
//   ),
// );

// export const pattern = vec3(
//   add(
//     uv().x.mul(10).fract().step(0.5),
//     uv().y.mul(10).fract().step(0.5),
//   )
//     .sub(1)
//     .abs(),
// );

// export const pattern = vec3(
//   checker(uv().mul(10)).oneMinus(),
// );

// export const pattern = vec3(
//   uv().distance(vec2(0.5)),
// );

// export const pattern = vec3(
//   uv().sub(0.5).length(),
// );

// const polarUv = uv().sub(0.5);
// const angle = atan(polarUv.x, polarUv.y);
// export const pattern = vec3(
//   angle.remap(PI.negate(), PI, 0, 1),
// );

// const subdivision = 10;
// const gridUv = uv().mul(subdivision).floor();
// const random = hash(
//   gridUv.x.add(gridUv.y.mul(subdivision)),
// );
// export const pattern = vec3(random);

// const subdivision = 10;
// const gridUv = uv().mul(subdivision).floor();
// const random = rand(gridUv);
// export const pattern = vec3(random);

// const perlinUV = uv().mul(5);
// const perlinNoise = mx_noise_float(perlinUV);
// export const pattern = vec3(
//   perlinNoise.mul(5).add(time).fract().step(0.8),
// );

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
export const pattern = palette(
  worleyNoise,
  vec3(0.5, 0.3, 0.4),
  vec3(0.9, 0.5, 0.4),
  vec3(1.0, 1.0, 1.0),
  vec3(0.0, 0.1, 0.2),
);
