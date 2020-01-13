import { repeat, array } from '../utils';
import Random from '../random';
import Vec2, { polarToVec2 } from '../data/Vec2';

// This will return an array of ints ranging from min to max (-1 to 1 default)
const RandomWave = (
  rng = Random(),
  { layers = 8, min = -1, max = 1, maxFreq = 5 } = {},
) => {
  const freqs = array(1, layers + 1).map(i => rng.next() * maxFreq);
  const offset = rng.float(1, 5.5);

  const at = rads =>
    freqs.reduce(
      (pos, freq) =>
        pos + Math.sin((rads + offset) * Math.PI * 2 * freq) / layers,
      0,
    );
  return {
    at,
    freqs,
    offset,
  };
};

export default RandomWave;
