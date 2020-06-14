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
    fill: '#090909',
  });

  // Move 0,0 to the canvas center:
  context.translate(canvas.width / 2, canvas.height / 2);

  const minSplash = rng.int(2, 7);
  const maxSplash = Math.floor(minSplash * rng.float(1.2, 3));
  const splash = (pos, vel, size, color) => {
    const count = rng.int(minSplash, maxSplash);
    const rootPosFuzz = 1;
    const rootPos = pos.add(
      Vec2(rng.fuzzy(0, rootPosFuzz), rng.fuzzy(0, rootPosFuzz)),
    );
    repeat(count, (i) => {
      const distanceScale = rng.float(0.5, 10);
      const splashPos = pos.add(
        vel.scale(distanceScale).rotate(rng.fuzzy(0, Math.PI / 8)),
      );
      circle({
        ...splashPos,
        fill: color
          .clone()
          .darken(rng.int(0, 3))
          .lighten(rng.int(0, 3))
          .toRgbString(),
        radius: Math.max(
          rng.fuzzy((size / Math.max(distanceScale, 1)) * 0.8, size * 0.2),
          size * 0.1,
        ),
      });
    });
    // circle({
    //   ...rootPos,
    //   fill: color
    //     .clone()
    //     .darken(rng.int(0, 3))
    //     .lighten(rng.int(0, 3))
    //     .toRgbString(),
    //   radius: rng.fuzzy(size, size * 0.1),
    // });
  };

  const draw = (width, height) => {
    const streams = rng.int(2, 8);

    const startX = rng.int(width / 2, width) * (rng.bool() ? -1 : 1);
    const startY = rng.int(height / 2, height) * (rng.bool() ? -1 : 1);
    let emitterPos = Vec2(startX, startY).scale(0.9);
    let emitterVel = Vec2(rng.int(-20, 20), rng.int(-20, 20));
    let emitterRot = 0;
    let emitterDistance = 300;

    let rad = rng.int(5, 30);

    const gravity = 0.00005 + rng.float(0, 0.00025);
    const loss = 0.9965 + rng.float(0, 0.0015);
    const rotation = 0.01 + rng.float(0, 0.09);
    const distanceLoss = 0.9997 + rng.float(0, 0.0002);

    const color = rng.chooseOne(pallete.colors);
    // const streamColors = array(0, streams).map(() => pallete.next());
    const streamColors = array(0, streams).map(() =>
      rng
        .chooseOne(pallete.colors)
        .value()
        .darken(rng.int(0, 15))
        .lighten(rng.int(0, 15)),
    );
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
        splash(pos, emitterVel, rad, streamColors[stream]);
        // circle({
        //   ...pos,
        //   radius: rad,
        //   fill: streamColors[stream].rgb(),
        // });
      });
    });
    // splash(
    //   Vec2(0, 0),
    //   Vec2(100, 0),
    //   50,
    //   tinycolor({ h: rng.int(0, 360), s: 200, v: 100 }),
    // );
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
      steps: 1000,
      streams: 5,
    }}
  />
);
