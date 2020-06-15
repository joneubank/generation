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
import { simplex, perlin } from '../../../data/noise';

import { default as t1000 } from 'nice-color-palettes/1000';

const draw = ({ context, pallete, rng, canvas, params }) => {
  const { rect, circle, path } = Draw(context);
  const layout = Layout(context);
  const sym = Symmetry(context);

  const { minRadius, maxRadius, steps } = params;
  const rotations = rng.fuzzy(0, 1);

  const prand = Random(pallete.colors[0].rgb());
  const nicePallete = prand.chooseOne(t1000).map((i) => i);

  // Uncomment a fill or add a different one to set a background. Default is transparent.
  rect({
    width: canvas.width,
    height: canvas.height,
    // fill: '#191919',
    fill: nicePallete[0],
    fill: '#eee',
  });

  // Move 0,0 to the canvas center:
  context.translate(canvas.width / 2, canvas.height / 2);

  const draw = (width, height) => {
    // Add draw stuff here, run it at the end of the sketch method or in a repeating layout.

    const typeOctaves = 2;
    const typeStepSize = 5 / typeOctaves;
    const typeNoise = perlin(rng.next(), typeOctaves);

    const lengthOctaves = 4;
    const lengthStepSize = 4 / lengthOctaves;
    const lengthNoise = perlin(rng.next(), lengthOctaves);

    const originWave = RandomWave(rng, { layers: 8 });

    const cirlceOrigin = (ratio) => {
      const start = Vec2(0, (-height * 2) / 5);
      const xShift = (((ratio + 0.2) * width) / 3) * originWave.at(ratio / 2);
      const origin = start
        .add(Vec2(0, (height * 6) / 11).scale(ratio))
        .add(Vec2(xShift, 0));

      return origin;
    };

    const color = pallete.next();
    repeat(steps + 1, (step) => {
      const twist = (step / steps) * rotations * Math.PI * 2;

      // const radius = minRadius + ((maxRadius - minRadius) * step) / steps;
      const radius =
        minRadius + (maxRadius - minRadius) * ((step * step) / steps / steps);
      const nodes = Math.ceil((2 * radius * Math.PI) / 4);

      const origin = cirlceOrigin(step / steps);

      const points = [];

      repeat(nodes, (node) => {
        const noisePos = Vec2(step / steps, 0)
          .rotate((node / nodes) * Math.PI * 2)
          .add(Vec2(1, 1));
        const noiseFactor = lengthNoise(noisePos.x, noisePos.y);

        points.push(
          Vec2(1, 0)
            .rotate((node / nodes) * Math.PI * 2 + twist)
            .scale(radius * noiseFactor)
            .add(origin),
        );
      });
      path({
        points,
        strokeWidth: 1,
        stroke: pallete.next().rgb(),
        stroke: nicePallete[4],
        stroke: '#191919',
        stroke: color.rgb(),
        close: true,
      });
    });
  };

  draw(canvas.width, canvas.height);
  // layout.grid(4, 4, draw);
};

export default () => (
  <Sketch
    options={{
      // title: '',
      // pallete: null,
      // fullscreen: true,
      width: 1600,
      height: 2400,
      // blend: 'lighten',
    }}
    draw={draw}
    params={{
      minRadius: 13,
      maxRadius: 1000,
      steps: 400,
      rotations: 0.7,
    }}
  />
);
