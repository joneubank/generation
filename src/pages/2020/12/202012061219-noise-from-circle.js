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
import { repeat, sequence, clamp, array } from '../../../utils';
import Random from '../../../random';
import { simplex, perlin } from '../../../data/noise';

import { default as t1000 } from 'nice-color-palettes/1000';

const draw = ({ context, pallete, rng, canvas, params }) => {
  const { rect, circle, path } = Draw(context);
  const layout = Layout(context);

  const prand = Random(pallete.colors[0].rgb());
  const nicePallete = prand.chooseOne(t1000).map((i) => i);

  const { steps, lines, startRadiusRatio, noiseAmp } = params;

  // Uncomment a fill or add a different one to set a background. Default is transparent.
  rect({
    width: canvas.width,
    height: canvas.height,
    fill: '#eee',
    // fill: '#191919',
  });

  // Move 0,0 to the canvas center:
  context.translate(canvas.width / 2, canvas.height / 2);

  const draw = (width, height) => {
    // Add draw stuff here, run it at the end of the sketch method or in a repeating layout.
    const minDim = Math.min(width, height);
    const maxDim = Math.min(width, height);

    const noiseAngle = perlin(rng.next(), 4);
    const noiseMagnitude = perlin(rng.next(), 4);

    repeat(lines, (line) => {
      const startRads = (line / lines) * Math.PI * 2;
      // const start = Vec2(1, 0)
      //   .rotate(startRads)
      //   .scale((maxDim / 2) * startRadiusRatio);

      const points = sequence(steps, (step) => {
        const noiseX = Math.sin((step / steps) * Math.PI * 2) + 3;
        const noiseY = Math.sin((line / lines) * Math.PI * 2) + 3;
        const pos = Vec2(1, 0)
          .rotate(startRads)
          .scale(
            (maxDim / 2) * startRadiusRatio +
              ((step / steps) * (1 - startRadiusRatio) * maxDim) / 2,
          );
        const normal = pos.normalize();
        const noise = Vec2(noiseMagnitude(noiseX, noiseY), 0)
          .rotate(noiseAngle(noiseX, noiseY) * Math.PI * 2)
          .scale(noiseAmp);
        return pos.add(noise);
      });

      path({
        points: points,
        stroke: 'black',
        strokeWidth: 2,
        // x: start.x,
        // y: start.y,
        // radius: 5,
        // fill: 'black',
      });
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
      debounce: 250,
      steps: 100,
      lines: 200,

      startRadiusRatio: 0.1,
      noiseAmp: 1,
    }}
    controls={[
      { key: 'steps', type: 'range', min: 100, max: 1000, step: 100 },
      { key: 'lines', type: 'range', min: 100, max: 1000, step: 10 },
      {
        key: 'startRadiusRatio',
        type: 'range',
        min: 0,
        max: 1,
        step: 0.01,
      },
      { key: 'noiseAmp', type: 'range', min: 0, max: 100, step: 1 },
    ]}
  />
);
