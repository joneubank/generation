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
import DoublePendulum from '../../../data/physics/DoublePendulum';
import { line, grid } from '../../../data';
import Vec2 from '../../../data/Vec2';
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
    // fill: '#191919',
    fill: '#eee',
  });

  // Move 0,0 to the canvas center:
  context.translate(canvas.width / 2, canvas.height / 2);

  const draw = (width, height) => {
    const steps = 10000;
    // const color1 = pallete
    //   .next()
    //   .value()
    //   .toRgbString();
    // const color2 = pallete
    //   .next()
    //   .value()
    //   .toRgbString();

    const color = pallete.colors[0].value().toRgbString();
    const minDim = Math.min(canvas.height, canvas.width);
    const pendulum = DoublePendulum({
      x: 0,
      y: 0,
      l1: (minDim * 0.95) / 4,
      l2: (minDim * 0.95) / 4,
      a1: rng.float(0.1, Math.PI * 1.9),
      a2: rng.float(0.1, Math.PI * 1.9),
    });

    const p1 = [];
    const p2 = [];

    repeat(steps, i => {
      const pos = pendulum.next(0.01);
      p1.push(pos.p1);
      p2.push(pos.p2);
    });
    // p2.forEach((pos, i) => {
    //   circle({
    //     x: pos.x,
    //     y: pos.y,
    //     radius: 3,
    //     fill: color,
    //   });
    // });
    path({ path: p2, strokeWidth: 1, stroke: color });
  };

  draw(canvas.width, canvas.height);
  // layout.grid(3, 3, draw);
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
