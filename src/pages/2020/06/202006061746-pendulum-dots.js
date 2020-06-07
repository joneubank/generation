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

  const { steps, streams } = params;

  // Uncomment a fill or add a different one to set a background. Default is transparent.
  rect({
    width: canvas.width,
    height: canvas.height,
    fill: '#eee',
    fill: '#191919',
  });

  // Move 0,0 to the canvas center:
  context.translate(canvas.width / 2, canvas.height / 2);

  const draw = (width, height) => {
    // Add draw stuff here, run it at the end of the sketch method or in a repeating layout.

    const startX = rng.int(width / 2, width) * (rng.bool() ? -1 : 1);
    const startY = rng.int(height / 2, height) * (rng.bool() ? -1 : 1);
    let emitterPos = Vec2(startX, startY).scale(0.9);
    let emitterVel = Vec2(rng.int(-20, 20), rng.int(-20, 20));
    let emitterRot = 0;
    let emitterDistance = 300;

    let rad = 5;

    const gravity = 0.0001;
    const loss = 0.997;
    const rotation = 0.05;
    const distanceLoss = 0.99985;

    const color = rng.chooseOne(pallete.colors);
    const streamColors = array(0, streams).map(() => pallete.next());
    repeat(steps, () => {
      emitterPos = emitterPos.add(emitterVel);
      emitterVel = emitterVel.add(emitterPos.scale(-1 * gravity)).scale(loss);
      emitterRot += rotation;

      // rad *= loss;
      // circle({
      //   ...emitterPos.obj,
      //   radius: rad,
      //   fill: 'white',
      // });

      repeat(streams, (stream) => {
        emitterDistance *= distanceLoss;
        const streamVec = Vec2(emitterDistance, 0);
        const angle = (stream * 2 * Math.PI) / streams + emitterRot;
        const pos = emitterPos.add(streamVec.rotate(angle));
        circle({
          ...pos,
          radius: rad,
          fill: streamColors[stream].rgb(),
        });
      });
    });
  };

  draw(canvas.width, canvas.height);
  // repeat(13, () => draw(canvas.width, canvas.height));
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
      steps: 3500,
      streams: 3,
    }}
  />
);
