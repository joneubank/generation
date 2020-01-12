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
  const sym = Symmetry(context);

  // Uncomment a fill or add a different one to set a background. Default is transparent.
  rect({
    width: canvas.width,
    height: canvas.height,
    // fill: tinycolor('hsv(25,8%,95%)').toRgbString(),
    fill: '#191919',
    fill: '#eee',
  });

  // Move 0,0 to the canvas center:
  // context.translate(canvas.width / 2, canvas.height / 2);

  const draw = (width, height) => {
    // Add draw stuff here, run it at the end of the sketch method or in a repeating layout.

    const gradient = tinygradient([
      // pallete.colors[0].value().toRgbString(),
      pallete.colors[0].value().toRgbString(),
      pallete.colors[1].value().toRgbString(),
      pallete.colors[2].value().toRgbString(),
      // pallete
      //   .next()
      //   .value()
      //   .toRgbString(),
      // pallete
      //   .next()
      //   .value()
      //   .toRgbString(),
      // pallete
      //   .next()
      //   .value()
      //   .toRgbString(),
    ]);

    const imageScale = 0.9;
    const border = (width * (1 - imageScale)) / 2;

    const gridSize = 5; // rng.int(5, 8);
    const gridWidth = Math.floor((width - border) / gridSize);
    const gridHeight = Math.floor((height - border) / gridSize);

    const radius = 50;

    const points = grid(gridWidth, gridHeight);
    // const points = circleSegments(1000).map(({u,v})=>{});

    const octaves = 4;
    const stepSize = 1;
    const angleNoise = perlin(rng.next(), octaves);
    const strengthNoise = perlin(rng.next(), octaves);
    const colorNoise = perlin(rng.next(), octaves);
    const angleDensity = 4;
    const strengthFactor = 2;
    const colorFactor = 2;

    const movePoint = ({ x, y }) => {
      return polarToVec2(
        (angleNoise(x, y) - 0.5) * Math.PI * 2 * angleDensity,
        // 0,
        strengthFactor * (strengthNoise(x, y) - 0.5),
      ).add(Vec2(x, y));
    };

    points.forEach(({ u, v }) => {
      const radius = rng.bool(0.4)
        ? rng.bool(0.7)
          ? 0
          : 5
        : rng.bool(0.6)
        ? 3
        : 2;
      const noisedPoint = movePoint({
        x: u * 0.9 + 0.05,
        y: v * 0.9 + 0.05,
      });
      // const fillIndex = radius === 5 ? 0 : radius === 3 ? 1 : 2;
      // const fill = pallete.cdolors[fillIndex].value().toRgbString();
      const gradPoint = clamp(
        // (noisedPoint.x - u > 0 ? 1 : -1) *
        Math.sqrt(
          (noisedPoint.x - u) * (noisedPoint.x - u) +
            (noisedPoint.y - v) * (noisedPoint.y - v),
        ) *
          colorFactor +
          0.5,
      );
      circle({
        x: clamp(noisedPoint.x) * width * imageScale + border,
        y: clamp(noisedPoint.y) * (height - 2 * border) + border,
        radius,
        fill: gradient
          .rgbAt(gradPoint)
          .lighten(rng.int(0, 20))
          // .saturate(rng.int(0, 20))
          .toRgbString(),
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
      width: 1080,
      height: 1080,
      // blend: 'lighten',
    }}
    draw={draw}
  />
);
