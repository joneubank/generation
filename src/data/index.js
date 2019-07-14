export const grid = (x, y) => {
  return [...Array(x * y).keys()].map(i => ({
    u: (i % x) / (x - 1),
    v: Math.floor(i / y) / (y - 1),
  }));
};

export const line = steps => {
  return [...Array(steps).keys()].map(i => i / (steps - 1));
};
