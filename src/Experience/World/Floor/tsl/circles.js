import { bool, float, Fn, If, int, Loop, not, uv, vec2 } from 'three/tsl';

const circle = Fn(
  ({
    coordinates = uv(),
    center = vec2(0.5),
    radius = float(0.25),
    thickness = float(0.02),
    inverted = bool(false),
    discarded = bool(true),
  }) => {
    const distanceToCenter = coordinates.distance(center);
    const lineSDF = distanceToCenter.sub(radius);
    const line = lineSDF.abs().step(thickness.div(2));

    If(not(inverted), () => {
      line.assign(line.oneMinus());
    });

    line.lessThanEqual(0).and(discarded).discard();

    return line;
  },
  {
    coordinates: 'vec2',
    center: 'vec2',
    radius: 'float',
    thickness: 'float',
    inverted: 'bool',
    discarded: 'bool',
    return: 'float',
  },
);

export const circles = Fn(
  ({
    coordinates = uv(),
    center = vec2(0.5),
    radius = float(0.25),
    thickness = float(0.02),
    inverted = bool(false),
    discarded = bool(true),
    count = int(5),
    span = float(0.1),
  }) => {
    const lines = float(0);

    Loop(
      {
        start: 0, //Default, so you can remove if you want
        end: count,
        type: 'float',
        condition: '<', //Default, so you can remove if you want
        name: 'i', //Default, so you can remove if you want
      },
      ({ i }) => {
        lines.addAssign(
          circle({
            coordinates,
            center,
            radius: radius.add(i.mul(span)),
            thickness,
            inverted: bool(false),
            discarded: bool(false),
          }),
        );
      },
    );

    If(inverted, () => {
      lines.assign(lines.oneMinus());
    });

    lines.lessThanEqual(0).and(discarded).discard();

    return lines;
  },
);
