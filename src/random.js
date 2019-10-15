import * as srng from 'seed-random';
import Color, { hashColor } from './colors';
import Pallete from './colors/palletes';
import { getNoun, getAdjective } from './words';

export const distributions = {
  uniform: () => x => x,
  power: n => x => {
    if (n >= 0) {
      return Math.pow(x, n);
    } else {
      return 1 - 1 / Math.pow(x, -n);
    }
  },
  // normal: ({ mean = 0.5, variance = 1 } = {}) => x => mean,
  sin: (phase = 0, period = 1) => x =>
    (Math.sin(x * Math.PI * 2 * period + phase) + 1) / 2,
  cos: (phase = 0, period = 1) => x =>
    (Math.cos(x * Math.PI * 2 * period + phase) + 1) / 2,
};

const Random = (seed, context) => {
  let _context = context;
  let _seed = seed || Math.random();
  let rng = srng(_seed);
  let count = 0;
  const stack = [];

  const next = (dist = x => x) => {
    count += 1;
    return dist(rng());
  };

  // solo manipulations
  const fuzzy = (num, range) => num + next() * range * 2 - range;

  // list manipulations
  const chooseOne = items => {
    return items[int(0, items.length - 1)];
  };
  const choose = (items, count = 1) => {
    const length = items.length;
    const options = [...Array(length).keys()];
    const choices = [];
    for (let i = 0; i < count; i++) {
      choices.push(options.splice(int(0, options.length - 1), 1)[0]);
    }
    return choices.map(choice => items[choice]);
  };

  const shuffle = items => {
    const output = items.map(i => i);

    let currentIndex = items.length;
    let temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(next() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = output[currentIndex];
      output[currentIndex] = output[randomIndex];
      output[randomIndex] = temporaryValue;
    }

    return output;
  };

  // primitive type randoms
  const bool = (chance = 0.5) => (next() < chance ? true : false);
  const int = (min = 0, max = 100) =>
    Math.floor(next() * (max - min + 1)) + min;
  const float = (min = 0, max = 1, dist = distributions.uniform()) =>
    next(dist) * (max - min) + min;

  // color type randoms
  const color = ({
    h = { min: 0, max: 360 },
    s = { min: 0, max: 1 },
    v = { min: 0, max: 1 },
  } = {}) => {
    let found = false;
    const maxIters = 500;
    let candidate;
    let iters = 0;
    while (!found && iters < maxIters) {
      iters += 1;
      candidate = Color(colorLabel());
      const hsv = candidate.value().toHsv();
      if (
        hsv.h >= h.min &&
        hsv.h <= h.max &&
        hsv.s >= s.min &&
        hsv.s <= s.max &&
        hsv.v >= v.min &&
        hsv.v <= v.max
      ) {
        found = true;
      }
    }
    return candidate;
  };

  const pallete = (options = {}) => Pallete(palleteLabel());

  /* Words */
  const noun = ({ plural = 0.5, double = 0.5 } = {}) => {
    const isDouble = bool(double);
    const isPlural = bool(plural);

    return `${isDouble ? `${getNoun(next())} ` : ''}${getNoun(next(), {
      plural: isPlural,
    })}`;
  };

  const adjective = (options = {}) => {
    return getAdjective(next());
  };

  const label = ({ plural = 0.5, double = 0.5, modifier = 0.5 } = {}) => {
    const hasAdjective = bool(modifier);
    return `${hasAdjective ? `${adjective()} ` : ''}${noun({
      plural,
      double,
    })}`.toLowerCase();
  };

  const colorLabel = () => label({ plural: 0.75, double: 0.3, modifier: 0.75 });
  const palleteLabel = () =>
    label({ plural: 0.3, double: 0.75, modifier: 0.75 });

  /* Frames */

  const push = ({ seed, context }) => {
    const nextSeed = seed === undefined ? next() : seed;
    stack.push({ count, rng, _context, _seed });
    rng = srng(nextSeed);
    count = 0;
    _seed = nextSeed;
    _context = context ? context : nextSeed;
  };

  const pop = seed => {
    if (stack.length > 0) {
      const data = stack.pop();
      rng = data.rng;
      count = data.count;
      _context = data._context;
      _seed = data._seed;
    }
  };

  const getUses = () => count;
  const getContext = () => _context;
  const getSeed = () => _seed;
  const getRng = () => rng;
  const describe = () => ({ count, context: _context, seed: _seed });

  return {
    next,

    getUses,
    getContext,
    getSeed,
    getRng,
    describe,

    push,
    pop,

    bool,
    int,
    float,

    color,
    pallete,

    fuzzy,

    choose,
    chooseOne,
    shuffle,

    noun,
    adjective,
    label,
    colorLabel,
    palleteLabel,
  };
};

export default Random;
