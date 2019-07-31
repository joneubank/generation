import * as tumult from 'tumult';

const SQRT2 = Math.sqrt(1 / 2);

const normalizeNoise = (noise, octaves) => (x, y) => {
  try {
    return Math.min(
      1,
      Math.max(0, (noise.octavate(octaves, x, y) + SQRT2) / (2 * SQRT2)),
    );
  } catch (e) {
    return 0.5;
  }
};

export const simplex = (seed, octaves) => {
  return normalizeNoise(new tumult.Simplex2(seed), octaves);
};

export const perlin = (seed, octaves) => {
  return normalizeNoise(new tumult.Perlin2(seed), octaves);
};
