export const repeat = (count, method) => {
  for (let i = 0; i < count; i++) {
    method(i);
  }
};

export const array = (min, max) =>
  [...Array(max - min).keys()].map(i => i + min);

export const clamp = (value, { min = 0, max = 1 } = {}) =>
  Math.max(min, Math.min(max, value));