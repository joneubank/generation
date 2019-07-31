export const grid = (x, y) =>
  [...Array(x * y).keys()].map(i => ({
    u: (i % x) / (x - 1),
    v: Math.floor(i / x) / (y - 1),
  }));

export const line = steps => [...Array(steps).keys()].map(i => i / (steps - 1));

export const circleSegments = steps =>
  [...Array(steps).keys()].map(i => ({
    u: Math.cos((i / (steps - 1)) * 2 * Math.PI),
    v: Math.sin((i / (steps - 1)) * 2 * Math.PI),
  }));

export const segment = ({ start, end, steps }) =>
  line(steps).map(i => ({
    x: start.x * i + end.x * (1 - i),
    y: start.y * i + end.y * (1 - i),
  }));
