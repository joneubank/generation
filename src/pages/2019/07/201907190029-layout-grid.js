import React from 'react';
import tinygradient from 'tinygradient';
import { tinycolor } from '@thebespokepixel/es-tinycolor';
import _ from 'lodash';
import * as tumult from 'tumult';

import Sketch from '../../../components/Sketch';
import Draw from '../../../draw';
import Layout from '../../../draw/layouts';
import Symmetry from '../../../draw/symmetry';
import Tricell from '../../../data/Tricell';
import { line, grid } from '../../../data';
import Vec2, { polarToVec2 } from '../../../data/Vec2';
import { repeat, clamp, array } from '../../../utils';
import Random from '../../../random';

const draw = ({ context, pallete, rng, canvas }) => {
  const { rect, circle, path } = Draw(context);
  const layout = Layout(context);

  // Uncomment a fill or add a different one to set a background. Default is transparent.
  rect({
    width: canvas.width,
    height: canvas.height,
    // fill: tinycolor('hsv(25,8%,95%)').toRgbString(),
    // fill: '#191919',
    fill: '#eee',
  });

  // Move 0,0 to the canvas center:
  context.translate(canvas.width / 2, canvas.height / 2);

  // Add draw stuff here:

  const draw = (width, height) => {
    const n = rng.int(2, 5);
    const cell = new Tricell({ n });
    const maxSize = Math.min(width, height) * 0.8;

    context.lineJoin = 'round';

    repeat(3, () => {
      const pal = rng.pallete();
      const rotation = rng.float(0, Math.PI / 2);
      const gapSize = maxSize / n / 6;
      const shift = Vec2(
        rng.int(-gapSize, gapSize),
        rng.int(-gapSize, gapSize),
      );

      cell.paths(maxSize / n / 2).forEach(p => {
        const c = rng
          .chooseOne(pallete.colors)
          .value()
          .darken(rng.fuzzy(15, 10))
          .setAlpha(0.6)
          .toRgbString();

        const rotated = p.map(vec => vec.add(shift).rotate(rotation));

        path({
          points: rotated,
          strokeWidth: 40,
          // stroke: c,
          fill: c,
          close: true,
        });
      });
    });
  };

  layout.grid(4, 4, draw);
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
  />
);
