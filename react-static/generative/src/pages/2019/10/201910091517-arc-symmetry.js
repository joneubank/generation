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

const draw = ({ context, pallete, rng, canvas }) => {
  const { rect, circle, path } = Draw(context);
  const layout = Layout(context);
  const sym = Symmetry(context);

  // Uncomment a fill or add a different one to set a background. Default is transparent.
  rect({
    width: canvas.width,
    height: canvas.height,
    // fill: tinycolor('hsv(25,8%,95%)').toRgbString(),
    fill: '#191919',
    // fill: '#eee',
    // fill: rng
    //   .chooseOne(pallete.colors)
    //   .value()
    //   .lighten(20)
    //   .toRgbString(),
  });

  const arcs = 17;
  const count = 9;
  const spread = 0.5;
  const distance = 400;
  const segments = 10;
  const radius = 1;
  const jitter = 0.75;
  const size = 100;
  const drawChance = 1;

  // Move 0,0 to the canvas center:
  context.translate(canvas.width / 2, canvas.height / 2);

  const draw = seed => () => {
    const rand = Random(seed);

    const fuzzyCircle = (xOff, yOff, radius, segments, jitter) => {
      const L = line(segments);

      // Add draw stuff here, run it at the end of the sketch method or in a repeating layout.
      const circlePoints = L.map(i => {
        const rads = i * 2 * Math.PI;
        const x = radius * Math.sin(rads) + xOff;
        const y = radius * Math.cos(rads) + yOff;
        return {
          x: rand.fuzzy(x, radius * jitter),
          y: rand.fuzzy(y, radius * jitter),
        };
      });

      path({
        path: _.initial(circlePoints),
        strokeWidth: 19,
        stroke: rand
          .chooseOne(pallete.colors)
          .value()
          .toRgbString(),
        close: true,
      });
    };

    repeat(count, () => {
      // Reducing count by chance
      if (!rand.bool(drawChance)) return;

      const r = (radius * size) / 2;
      const xOff = rand.fuzzy(distance, distance * spread);
      const yOff = rand.fuzzy(distance, distance * spread);
      fuzzyCircle(xOff, yOff, rand.fuzzy(r, r * jitter), segments, jitter);
    });
  };

  // context.globalCompositeOperation = 'exclusion';
  sym.arc(draw(rng.next()), arcs);

  // draw(canvas.width, canvas.height);
  // layout.grid(4, 4, draw);
  // layout.grid(3, 3, draw);
  // layout.grid(2, 2, draw);
  // layout.grid(1, 1, draw);
};

export default () => (
  <Sketch
    options={{
      // title: '',
      // pallete: null,
      // fullscreen: true,
      width: 2048,
      height: 2048,
      blend: 'difference',
    }}
    draw={draw}
  />
);
