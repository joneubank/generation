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
import Spinner from '../../../data/Spinner';
import { line, grid } from '../../../data';
import Vec2, { polarToVec2 } from '../../../data/Vec2';
import { repeat, clamp, array } from '../../../utils';
import Random from '../../../random';

const draw = ({ context, pallete, rng, canvas }) => {
  const { rect, circle, path } = Draw(context);

  rect({
    x: 0,
    y: 0,
    width: canvas.width,
    height: canvas.height,
    fill: '#eee',
  });

  const spiralRate = 3000;

  context.translate(canvas.width / 2, canvas.height / 2);

  const basePeriod = 100;
  const r1 = rng.int(150, 350);
  const r2 = rng.int(150, 350);
  const r3 = rng.int(150, 350);
  const r4 = rng.int(150, 350);

  const spinners = [
    // new Spinner(1, 0, rng.int(2, 5) * basePeriod, (time, spinner) => {
    //   spinner.r = (spinner.age * canvas.width) / spiralRate;
    // }),
    new Spinner(r1, 0, rng.int(2, 6) * basePeriod),
    // new Spinner(r2, rng.float(0, Math.PI), rng.int(2, 6) * basePeriod),
    new Spinner(r3, 0, rng.int(2, 6) * basePeriod),
    new Spinner(r4, 0, rng.int(2, 6) * basePeriod),
  ];

  const steps = 15000;
  const timeStep = 1;
  const drawPath = [];

  const pathPoint = () =>
    spinners.reduce((output, s) => output.add(s.vector()), Vec2(0, 0));

  // drawPath.push(pathPoint());

  let age = 0;
  repeat(steps, i => {
    age += timeStep;
    spinners.forEach(s => s.update(timeStep));
    const nextPoint = pathPoint();
    drawPath.push(nextPoint.scale(age / spiralRate));
  });

  path({ points: drawPath, stroke: '#333', strokeWidth: 5, close: false });
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
