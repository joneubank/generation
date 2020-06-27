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

const SQRT2 = Math.sqrt(2);

const draw = ({ context, pallete, rng, canvas }) => {
  const { rect, circle, path } = Draw(context);
  const layout = Layout(context);

  const normalizeNoise = (noise, octaves) => (x, y) =>
    Math.min(
      1,
      Math.max(0, (noise.octavate(octaves, x, y) + SQRT2) / (2 * SQRT2)),
    );

  const transformNoise = (noise) => (x, y) => noise(x, y); //Math.sin(noise(x, y));

  // Uncomment a fill or add a different one to set a background. Default is transparent.
  rect({
    width: canvas.width,
    height: canvas.height,
    // fill: tinycolor('hsv(25,8%,95%)').toRgbString(),
    fill: '#191919',
    // fill: '#eee',
  });

  // Move 0,0 to the canvas center:
  // context.translate(canvas.width / 2, canvas.height / 2);

  const draw = (width, height) => {
    const n = 55;
    const scale = 0.95;

    const octaves = 3;
    const stepSize = 12 / octaves;
    const angleNoise = transformNoise(
      normalizeNoise(new tumult.Simplex2(rng.next()), octaves),
    );
    const strengthNoise = normalizeNoise(
      new tumult.Simplex2(rng.next()),
      octaves,
    );

    const strengthFactor = (width * scale) / n / 2;
    const minStrength = (width * scale) / n / 6;

    const points = grid(n, n);
    const xAdjust = (width - width * scale) / 2;
    const yAdjust = (height - height * scale) / 2;

    points.forEach(({ u, v }) => {
      const root = Vec2(
        u * width * scale + xAdjust,
        v * height * scale + yAdjust,
      );
      const target = polarToVec2(
        angleNoise(u * stepSize, v * stepSize) * Math.PI * 2,
        strengthFactor * strengthNoise(u * stepSize, v * stepSize) +
          minStrength,
      )
        .scale(2)
        .add(root);
      path({ points: [root, target], strokWidth: 5, stroke: '#eee' });
      circle({ ...root.obj, fill: '#fff', radius: 2 });
      // circle({
      //   x: u * width * scale + xAdjust,
      //   y: v * height * scale + yAdjust,
      //   radius:
      //     baseRadius *
      //     Math.max(
      //       0,
      //       1 + simplex2.octavate(octaves, u * stepSize, v * stepSize),
      //     ),
      //   fill: '#777',
      // });
    });

    // Add draw stuff here, run it at the end of the sketch method or in a repeating layout.
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
