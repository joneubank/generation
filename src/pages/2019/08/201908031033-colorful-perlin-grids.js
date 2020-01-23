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

const draw = ({ context, pallete, rng, canvas }) => {
  const { rect, circle, path } = Draw(context);
  const layout = Layout(context);

  // Uncomment a fill or add a different one to set a background. Default is transparent.
  rect({
    width: canvas.width,
    height: canvas.height,
    // fill: tinycolor('hsv(25,8%,95%)').toRgbString(),
    fill: '#191919',
    // fill: '#eee',
    // fill: rng.chooseOne(pallete.colors).rgb(),
  });

  // Move 0,0 to the canvas center:
  // context.translate(canvas.width / 2, canvas.height / 2);

  const draw = (width, height) => {
    // Add draw stuff here, run it at the end of the sketch method or in a repeating layout.

    const n = 89;
    const scale = 0.95;

    const octaves = 3;
    const stepSize = 5 / octaves;
    const noise1 = perlin(rng.next(), octaves);
    const noise2 = perlin(rng.next(), octaves);

    const points = grid(n, n);

    const radiusScale = 1.4;

    context.translate((width * (1 - scale)) / 2, (height * (1 - scale)) / 2);
    const baseHue = rng.int(0, 360);
    points.forEach(({ u, v }) => {
      const hue = baseHue + noise2(u * stepSize, v * stepSize) * 360;
      const color = tinycolor({
        h: hue > 360 ? hue - 360 : hue,
        s: 0.6,
        v: 0.7,
      }).toRgbString();
      repeat(3, i =>
        circle({
          x: u * width * scale,
          y: v * height * scale,
          radius:
            (Math.min(width, height) / n / 2 - 1) *
            noise1(u * stepSize, v * stepSize) *
            radiusScale,
          fill: color,
        }),
      );
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
      width: 2048,
      height: 2048,
      // blend: 'lighten',
    }}
    draw={draw}
  />
);
