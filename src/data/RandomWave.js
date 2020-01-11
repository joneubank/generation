import { repeat, range } from '../utils';
import Random from '../random';
import Vec2, { polarToVec2 } from '../data/Vec2';

// This will return an array of ints ranging from min to max (-1 to 1 default)
const RandomWave = (
  rng = Random(),
  { steps = 100, layers = 8, min = -1, max = 1, maxFreq = 5 } = {},
) => {
  const freqs = range(1, layers + 1).map(i => rng.next() * maxFreq);
  const offset = rng.int(0, steps);
  console.log(freqs);
  return range(0, steps).map(i =>
    freqs.reduce(
      (pos, freq) =>
        pos + Math.sin(((i + offset) * Math.PI * 2 * freq) / steps) / layers,
      0,
    ),
  );
};

export default RandomWave;
