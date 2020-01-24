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

const draw = ({ context, pallete, rng, canvas, params }) => {
  const { rect, circle, path } = Draw(context);
  const layout = Layout(context);
  const sym = Symmetry(context);

  const { steps } = params;

  // Uncomment a fill or add a different one to set a background. Default is transparent.
  rect({
    width: canvas.width,
    height: canvas.height,
    fill: '#eee',
    fill: '#000',
  });

  // Move 0,0 to the canvas center:
  // context.translate(canvas.width / 2, canvas.height / 2);

  const draw = (width, height) => {
    // Add draw stuff here, run it at the end of the sketch method or in a repeating layout.
    // reset();
  };

  draw(canvas.width, canvas.height);
  // layout.grid(4, 4, draw);
  // loop(() => {
  //   draw(canvas.width, canvas.height);
  // });
};

const loop = ({
  deltaTime,
  totalTime,
  context,
  pallete,
  rng,
  canvas,
  params,
}) => {
  const { rect, circle, path } = Draw(context);
  circle({
    radius: deltaTime || 10,
    x: rng.int(0, canvas.width),
    y: rng.int(0, canvas.height),
    fill: pallete.colors[0].value().toRgbString(),
  });
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
    loop={loop}
    params={{
      steps: 10000,
    }}
  />
);
