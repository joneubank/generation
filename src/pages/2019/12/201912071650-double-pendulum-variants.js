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
    fill: '#191919',
    // fill: '#eee',
  });

  // Move 0,0 to the canvas center:
  context.translate(canvas.width / 2, canvas.height / 2);

  const gridSize = 1;

  const draw = seed => i => {
    const rand = Random(seed);
    const steps = 1300;
    // const color1 = pallete
    //   .next()
    //   .value()
    //   .toRgbString();
    // const color2 = pallete
    //   .next()
    //   .value()
    //   .toRgbString();

    const a1 = rand.float(0.1, Math.PI * 1.9);
    const a2 = rand.float(0.1, Math.PI * 1.9);

    const minDim = Math.min(canvas.height, canvas.width);
    const pendulum = DoublePendulum({
      x: 0,
      y: 0,
      l1: (((minDim * 0.95) / 2) * 1) / 2 / gridSize,
      l2: (((minDim * 0.95) / 2) * 1) / 2 / gridSize,
      a1,
      a2,
    });
    const pendulum2 = DoublePendulum({
      x: 0,
      y: 0,
      l1: (minDim * 0.95) / 4 / gridSize,
      l2: (minDim * 0.95) / 4 / gridSize,
      a1: a1 + 0.01,
      a2: a2 + 0.01,
    });
    const pendulum3 = DoublePendulum({
      x: 0,
      y: 0,
      l1: (minDim * 0.95) / 4 / gridSize,
      l2: (minDim * 0.95) / 4 / gridSize,
      a1: a1 + 0.02,
      a2: a2 + 0.02,
    });

    const p1 = [];
    const p2 = [];
    const p3 = [];

    repeat(steps, i => {
      const pos1 = pendulum.next(0.01);
      const pos2 = pendulum2.next(0.01);
      const pos3 = pendulum3.next(0.01);
      p1.push(pos1.p2);
      p2.push(pos2.p2);
      p3.push(pos3.p2);
    });
    path({
      path: p1,
      strokeWidth: 3,
      stroke: pallete.colors[0].value().toRgbString(),
    });
    path({
      path: p2,
      strokeWidth: 3,
      stroke: pallete.colors[1].value().toRgbString(),
    });
    path({
      path: p3,
      strokeWidth: 3,
      stroke: pallete.colors[2].value().toRgbString(),
    });
  };

  // draw(rng.next())(0);
  sym.arc(draw(rng.next()), 2);
  // const symDraw = () => sym.arc(draw(rng.next()), 1);
  // layout.grid(gridSize, gridSize, symDraw);
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
