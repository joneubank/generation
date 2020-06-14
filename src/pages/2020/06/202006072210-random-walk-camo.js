import React from 'react';
import tinygradient from 'tinygradient';
import { tinycolor } from '@thebespokepixel/es-tinycolor';
import _ from 'lodash';
import * as tumult from 'tumult';

import { default as t1000 } from 'nice-color-palettes/1000';

import Sketch from '../../../components/Sketch';
import Draw from '../../../draw';
import Layout from '../../../draw/layouts';
import Symmetry from '../../../draw/symmetry';
import RandomWave from '../../../data/RandomWave';
import { line, grid } from '../../../data';
import Vec2, { polarToVec2 } from '../../../data/Vec2';
import { repeat, clamp, array } from '../../../utils';
import Random from '../../../random';

const draw = ({ context, pallete, rng, canvas, params }) => {
  const { rect, circle, path } = Draw(context);
  const layout = Layout(context);
  const sym = Symmetry(context);

  const { steps, walkers, stepSize } = params;

  const walkDirections = [
    Vec2(0, 1),
    Vec2(1, 0),
    Vec2(1, 1),
    Vec2(0, -1),
    Vec2(-1, 0),
    Vec2(-1, -1),
    Vec2(-1, 1),
    Vec2(1, -1),
  ].map((i) => i.normalize());

  // Uncomment a fill or add a different one to set a background. Default is transparent.
  const prng = Random(pallete.next().rgb());
  const nicePallete = prng.chooseOne(t1000);
  rect({
    width: canvas.width,
    height: canvas.height,
    fill: '#eee',
    fill: rng.chooseOne(nicePallete),
  });

  // Move 0,0 to the canvas center:
  context.translate(canvas.width / 2, canvas.height / 2);

  const draw = (width, height) => {
    // Add draw stuff here, run it at the end of the sketch method or in a repeating layout.
    repeat(walkers, (walker) => {
      const points = [];
      const start = Vec2(0, 0);
      let pos = start;
      points.push(pos);

      repeat(steps, (step) => {
        // random walk
        pos = pos.add(
          rng
            .chooseOne(walkDirections)
            // .scale(rng.fuzzy(stepSize, stepSize / 3)),
            .scale(stepSize),
        );
        points.push(pos);
      });

      path({
        points,
        stroke: tinycolor(rng.chooseOne(nicePallete))
          .setAlpha(0.9)
          .darken(rng.fuzzy(5, 5))
          .toRgbString(),
        strokeWidth: 17,
      });
    });
  };

  // draw(canvas.width, canvas.height);
  layout.grid(34, 34, draw);
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
      walkers: 1,
      steps: 1050,
      stepSize: 5,
    }}
  />
);
