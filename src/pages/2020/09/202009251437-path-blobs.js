import React from 'react';
import tinygradient from 'tinygradient';
import { tinycolor } from '@thebespokepixel/es-tinycolor';
import _ from 'lodash';
import * as tumult from 'tumult';

import Sketch from '../../../components/Sketch';
import Draw from '../../../draw';
import Layout from '../../../draw/layouts';
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

  const prand = Random(pallete.colors[0].rgb());
  const nicePallete = prand.chooseOne(t1000).map((i) => i);

  const {
    steps,
    waveComplexity,
    minRadius,
    maxRadius,
    minLoopRadius,
    maxLoopRadius,
    loopsOffset,
    loops,
    bulbs,
  } = params;

  // Uncomment a fill or add a different one to set a background. Default is transparent.
  rect({
    width: canvas.width,
    height: canvas.height,
    fill: '#eee',
    // fill: '#191919',
  });

  // Move 0,0 to the canvas center:
  context.translate(canvas.width / 2, canvas.height / 2);

  const xWave = RandomWave(rng, { layers: waveComplexity });
  const yWave = RandomWave(rng, { layers: waveComplexity });

  const draw = (width, height) => {
    // Add draw stuff here, run it at the end of the sketch method or in a repeating layout.
    const minDim = Math.min(width, height);
    const maxDim = Math.min(width, height);

    const points = [];
    repeat(steps + 1, (i) => {
      const ratio = i / steps;
      const rads = ratio * 2 * Math.PI;

      const waveSpot = Vec2(1, 0).rotate(rads);

      const loopRadius =
        ((Math.sin(rads * bulbs + loopsOffset) + 1) / 2) *
          (maxLoopRadius - minLoopRadius) +
        minLoopRadius;

      // 1 = Vec2(1, 0).scale(xWave.at(rads)).rotate(rads);
      const point = Vec2(1, 0)
        .scale(minRadius)
        .scale(
          1 +
            (((xWave.at(waveSpot.x) + yWave.at(waveSpot.y) + 2) / 4) *
              (maxRadius - minRadius)) /
              minRadius,
        )
        // .scale(1 + ((yWave.at(waveSpot.y) + 1) / 2) * (maxRadius - minRadius))
        .rotate(rads)
        .add(
          Vec2(1, 0)
            .scale(loopRadius)
            .rotate(ratio * 2 * Math.PI * loops),
        );
      points.push(point);
    });

    path({
      points,
      strokeWitdh: 5,
      stroke: '#191919',
    });
  };

  draw(canvas.width, canvas.height);
  // layout.grid(4, 4, draw, {fitAll:true});
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
      steps: 30000,
      waveComplexity: 2,
      maxRadius: 800,
      minRadius: 200,
      loops: 1000,
      loopsOffset: 0,
      minLoopRadius: 50,
      maxLoopRadius: 250,
      bulbs: 3,
    }}
    controls={[
      { key: 'steps', type: 'range', min: 1000, max: 100000, step: 10 },
      { key: 'waveComplexity', type: 'range', min: 1, max: 8, step: 1 },
      { key: 'minRadius', type: 'range', min: 1, max: 1200, step: 1 },
      { key: 'maxRadius', type: 'range', min: 1, max: 1200, step: 1 },

      { key: 'minLoopRadius', type: 'range', min: 0, max: 200, step: 1 },
      { key: 'maxLoopRadius', type: 'range', min: 0, max: 1000, step: 1 },

      {
        key: 'loopsOffset',
        type: 'range',
        min: 0,
        max: Math.PI * 2,
        step: 0.1,
      },
      { key: 'loops', type: 'range', min: 10, max: 5000, step: 1 },
      { key: 'bulbs', type: 'range', min: 1, max: 20, step: 1 },
    ]}
  />
);
