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

  const backgroundColor = pallete.colors[0].rgb;
  const baseColor = pallete.colors[1].rgb;
  // Uncomment a fill or add a different one to set a background. Default is transparent.
  rect({
    width: canvas.width,
    height: canvas.height,
    // fill: tinycolor('hsv(25,8%,95%)').toRgbString(),
    fill: '#191919',
    // fill: '#eee',
    // fill: backgroundColor,
  });

  // Move 0,0 to the canvas center:
  // context.translate(canvas.width / 2, canvas.height / 2);

  const draw = (width, height) => {
    // Add draw stuff here, run it at the end of the sketch method or in a repeating layout.

    const n = 235;
    const scale = 1;

    const lineStart = 0.25;

    const lengthOctaves = 4;
    const lengthStepSize = 8 / lengthOctaves;
    const lengthNoise = perlin(rng.next(), lengthOctaves);

    const angleOctaves = 4;
    const angleStepSize = 4 / angleOctaves;
    const angleNoise = perlin(rng.next(), angleOctaves);

    const alpha = 0.7;

    context.translate((width * (1 - scale)) / 2, (height * (1 - scale)) / 2);

    const minDim = (width * scale) / n / 10;
    const positionOffset = 0; //rng.next() * Math.PI * 2;

    const linePos = (i, count) => {
      const maxHeight = (height * scale) / Math.floor((count + 2) / 2);

      const x = i * width * scale;
      const y =
        (height * scale) / 2 +
        ((Math.sin(i * Math.PI * 2) * maxHeight) / 2) *
          0.4 *
          (count % 2 ? -1 : 1);
      return { x, y };
    };

    repeat(6, lineCount => {
      let noiseY = rng.next() * 8;
      line(n).forEach(i => {
        const position = i + positionOffset;

        const noiseValue =
          lengthNoise(position * lengthStepSize, noiseY) *
          Math.max(Math.abs(Math.sin(position * Math.PI)), 0.6);

        console.log(noiseValue);

        const { x, y } = linePos(i, lineCount);

        switch (true) {
          case noiseValue < lineStart:
            circle({
              x,
              y,
              radius: Math.max(
                minDim * Math.pow(((noiseValue * 1) / lineStart) * 1.8, 2),
                minDim,
              ),
              // fill: pallete.colors[0].rgb,
              // fill: baseColor,
              fill: '#ccc',
              // fill: rng
              //   .chooseOne(pallete.colors)
              //   .value()
              //   .setAlpha(alpha)
              //   .toRgbString(),
            });
            break;
          default:
            const rectWidth = (width * scale) / n;
            const rectHeight = Math.max(
              minDim * Math.pow(noiseValue * 8, 4),
              rectWidth,
            );
            context.translate(x, y);

            const angle = angleNoise(i * angleStepSize, noiseY) * Math.PI * 2;
            // const angle = 0;
            context.rotate(angle);
            rect({
              round: rectWidth / 1.9,
              x: -rectWidth / 2,
              y: -rectHeight / 2,
              width: rectWidth,
              height: rectHeight,
              // radius:
              //   (Math.min(width, height) / n / 2 - 1) *
              //   typeNoise(u * typeStepSize, v * typeStepSize),
              // // fill: pallete.colors[0].rgb,
              // stroke: baseColor,
              stroke: '#ccc',
              strokeWidth: Math.max(minDim * 1.5, 3),
              // fill: rng
              //   .chooseOne(pallete.colors)
              //   .value()
              //   .setAlpha(alpha)
              //   .toRgbString(),
            });
            context.rotate(-angle);
            context.translate(-x, -y);
          //     break;
        }
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
      width: 2048,
      height: 2048,
      // blend: 'lighten',
    }}
    draw={draw}
  />
);
