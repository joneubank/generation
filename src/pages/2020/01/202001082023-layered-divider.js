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
import Vec2 from '../../../data/Vec2';
import { repeat, clamp, array } from '../../../utils';
import Random from '../../../random';

const draw = ({ context, pallete, rng, canvas }) => {
  const { rect, circle, path } = Draw(context);
  const layout = Layout(context);
  const sym = Symmetry(context);

  // Uncomment a fill or add a different one to set a background. Default is transparent.

  // const foreground = '#369920';
  const foreground = pallete.colors[0]
    .value()
    .darken(10)
    .toRgbString();
  const background = pallete.colors[0]
    .value()
    .lighten(10)
    .toRgbString();
  rect({
    width: canvas.width,
    height: canvas.height,
    // fill: tinycolor('hsv(25,8%,95%)').toRgbString(),
    // fill: '#eee',
    // fill: '#191919',
    fill: background,
  });

  // Move 0,0 to the canvas center:
  // context.translate(canvas.width / 2, canvas.height / 2);

  const draw = (width, height) => {
    // Add draw stuff here, run it at the end of the sketch method or in a repeating layout.

    const steps = 2500;
    const layers = 8;
    const maxFreq = 10;
    const maxHeight = canvas.height / 2 / 3.5;
    const lines = 8;
    const lineGap = 40;

    repeat(lines, lineIndex => {
      // const baseY =
      //   (canvas.height / lines) * lineIndex + canvas.height / lines / 2;
      const baseY = canvas.height / 2 + lineGap * lineIndex;
      const heights = RandomWave(rng, { steps, layers, maxFreq });
      const positions = line(steps);

      const wavePath = [
        { x: canvas.width, y: canvas.height },
        { x: 0, y: canvas.height },
        ...positions.map((pos, index) =>
          Vec2(
            pos * canvas.width,
            heights.at(index / steps) * maxHeight + baseY,
          ),
        ),
      ];

      const fill =
        lineIndex === lines - 1
          ? foreground
          : rng
              .chooseOne(pallete.colors)
              .value()
              .darken(rng.fuzzy(0, 5))
              .toRgbString();

      path({
        points: wavePath,
        close: true,
        // strokeWidth: 5,
        fill: pallete
          .next()
          .value()
          .toRgbString(),
        // fill,
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
      blend: 'lighten',
    }}
    draw={draw}
  />
);
