import * as srng from 'seed-random';
import Color, { hashColor } from './colors';
import Pallete from './colors/palletes';
import { getNoun, getAdjective } from './words';

const Random = (seed, context) => {
  let _context = context;
  let _seed = seed || Math.random();
  let rng = srng(_seed);
  let count = 0;
  const stack = [];

  const next = () => {
    count += 1;
    return rng();
  };

  const chooseOne = items => {
    return items[int(0, items.length - 1)];
  };
  const choose = (items, count = 1) => {
    const length = items.length;
    const options = [...Array(length).keys()];
    const choices = [];
    for (let i = 0; i < count; i++) {
      choices.push(options.splice(int(0, options.length - 1), 1));
    }
    return choices.map(choice => items.choice);
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

  const bool = (chance = 0.5) => (next() < chance ? true : false);
  const int = (min = 0, max = 100) =>
    Math.floor(next() * (max - min + 1)) + min;

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

    color,
    pallete,

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
