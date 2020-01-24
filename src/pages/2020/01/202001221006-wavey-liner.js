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

let xWave;
let yWave;
let loopTime;
let points = [];
let lastPoint;

const clear = ({ rng, canvas, params, pallete, context }) => {
  lastPoint = 0;
  points = [];
  loopTime = 0;
};

const reset = ({ rng, canvas, params, pallete, context }) => {
  const { rect, circle, path } = Draw(context);

  context.resetTransform();

  rect({
    width: canvas.width,
    height: canvas.height,
    fill: pallete.colors[0].value().toRgbString(),
    fill: '#191919',
    fill: '#eee',
  });

  // Move 0,0 to the canvas center:
  context.translate(canvas.width / 2, canvas.height / 2);
};

const draw = ({ context, pallete, rng, canvas, params }) => {
  clear({ rng, canvas, params, pallete, context });
  reset({ rng, canvas, params, pallete, context });

  const { rect, circle, path } = Draw(context);
  const layout = Layout(context);
  const sym = Symmetry(context);

  const { steps } = params;

  xWave = RandomWave(rng, { layers: 2 });
  yWave = RandomWave(rng, { layers: 2 });
};

const loop = ({ speed, time, context, pallete, rng, canvas, params }) => {
  reset({ rng, canvas, params, pallete, context });

  const { rect, circle, path } = Draw(context);
  while (points.length <= params.length) {
    loopTime += (speed * params.speed) / 2500000;
    const moment = loopTime * Math.PI * 2;
    const point = Vec2(xWave.at(moment), yWave.at(moment)).scale(
      (Math.max(canvas.width, canvas.height) / 2) * params.scale,
    );
    points.unshift(point);
  }
  path({
    strokeWidth: 20,
    // x: rng.int(0, canvas.width),
    // y: rng.int(0, canvas.height),
    path: points,
    stroke: '#eee',
    stroke: pallete.colors[0].value().toRgbString(),
    // cap: 'none',
  });
  points = points.slice(0, params.length);
};

export default () => (
  <Sketch
    options={{
      // title: '',
      // pallete: null,
      fullscreen: true,
      // width: 2048,
      // height: 2048,
      // blend: 'difference',
    }}
    draw={draw}
    loop={loop}
    params={{
      scale: 0.5,
      speed: 100,
      length: 200,
    }}
  />
);
