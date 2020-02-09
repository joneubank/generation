import React from 'react';
import tinygradient from 'tinygradient';
import { tinycolor } from '@thebespokepixel/es-tinycolor';
import _ from 'lodash';
import * as tumult from 'tumult';

import Sketch from '../../../components/Sketch';
import Draw from '../../../draw';
import Layout from '../../../draw/layouts';
import Symmetry from '../../../draw/symmetry';
import RandomWave from '../../../data/RandomWave';
import { line, grid } from '../../../data';
import Vec2, { polarToVec2 } from '../../../data/Vec2';
import { repeat, clamp, array } from '../../../utils';
import Random from '../../../random';

const primes = [
  2,
  3,
  5,
  7,
  11,
  13,
  17,
  19,
  23,
  29,
  31,
  37,
  41,
  43,
  47,
  53,
  59,
  61,
  67,
  71,
  73,
  79,
  83,
  89,
  97,
  101,
  103,
  107,
  109,
  113,
  127,
  131,
  137,
  139,
  149,
  151,
  157,
  163,
  167,
  173,
  179,
  181,
  191,
  193,
  197,
  199,
  211,
  223,
  227,
  229,
  233,
  239,
  241,
  251,
  257,
  263,
  269,
  271,
  277,
  281,
  283,
  293,
  307,
  311,
  313,
  317,
  331,
  337,
  347,
  349,
  353,
  359,
  367,
  373,
  379,
  383,
  389,
  397,
];

const isPrime = n => {
  if (primes.includes(n)) {
    return true;
  }
  for (let i = 2; i < Math.sqrt(n); i++) {
    if (n % i === 0) {
      return false;
    }
  }
  primes.push(n);
  return true;
};

const primeFactors = n => {
  const factors = [];
  let reduced = n;
  for (let i = 2; i <= reduced; i++) {
    if (!isPrime(i)) {
      continue;
    }
    while (reduced % i === 0) {
      reduced = reduced / i;
      factors.push(i);
    }
  }
  return factors;
};

let fibonacci = [1, 1];
const fib = n => {
  while (n >= fibonacci.length) {
    const fs = fibonacci.slice(-2);
    fibonacci.push(fs[0] + fs[1]);
  }
  return fibonacci[n];
};

const draw = ({ context, pallete, rng, canvas, params }) => {
  const { rect, circle, path } = Draw(context);
  const layout = Layout(context);
  const sym = Symmetry(context);

  const { steps, dotRadius, scale } = params;

  // Uncomment a fill or add a different one to set a background. Default is transparent.
  rect({
    width: canvas.width,
    height: canvas.height,
    // fill: '#eee',
    fill: '#191919',
  });

  // Move 0,0 to the canvas center:
  context.translate(canvas.width / 2, canvas.height / 2);
  context.rotate(rng.next() * Math.PI * 2);

  const gradient = tinygradient([
    {
      color: tinycolor({
        h: pallete
          .next()
          .value()
          .toHsv().h,
        s: 200,
        v: 150,
      }).toRgbString(),
      pos: 0,
    },
    {
      color: tinycolor({
        h: pallete
          .next()
          .value()
          .toHsv().h,
        s: 200,
        v: 150,
      }).toRgbString(),
      pos: 16 / 144,
    },
    {
      color: tinycolor({
        h: pallete
          .next()
          .value()
          .toHsv().h,
        s: 200,
        v: 150,
      }).toRgbString(),
      pos: 49 / 144,
    },
    {
      color: tinycolor({
        h: pallete
          .next()
          .value()
          .toHsv().h,
        s: 200,
        v: 150,
      }).toRgbString(),
      pos: 100 / 144,
    },
    {
      color: tinycolor({
        h: pallete
          .next()
          .value()
          .toHsv().h,
        s: 200,
        v: 150,
      }).toRgbString(),
      pos: 1,
    },
  ]);

  const fList = [];
  const draw = (width, height) => {
    // Add draw stuff here, run it at the end of the sketch method or in a repeating layout.
    repeat(steps, i => {
      if (i === 1) return;
      const factors = primeFactors(i).length;
      fList.push(factors);
      if (factors > 0) {
        const radius = dotRadius * factors;
        const point = polarToVec2(i, Math.sqrt(i * dotRadius) * scale);
        circle({
          ...point.obj,
          radius,
          // fill: tinycolor({
          //   h: (i * 360) / steps,
          //   s: 200,
          //   v: rng.fuzzy(150, 100),
          // })
          fill: gradient
            .rgbAt(clamp((factors * factors) / 144))
            .setAlpha(0.7)
            .toRgbString(),
        });
      }
    });
    console.log('flist', Math.max(fList), fList);
  };

  draw(canvas.width, canvas.height);
  // layout.grid(4, 4, draw);
};

export default () => (
  <Sketch
    options={{
      // title: '',
      // pallete: null,
      // fullscreen: true,
      width: 2048,
      height: 2048,
      // blend: 'lighten',
    }}
    draw={draw}
    params={{
      steps: 8000,
      dotRadius: 3,
      scale: 10,
    }}
  />
);
