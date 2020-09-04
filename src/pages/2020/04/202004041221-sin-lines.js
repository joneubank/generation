import React from 'react';
import tinygradient from 'tinygradient';
import { tinycolor } from '@thebespokepixel/es-tinycolor';
import _ from 'lodash';
import * as tumult from 'tumult';
import * as niceColors from 'nice-color-palettes/1000';

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

  const nicePallete = Random(pallete.colors[0].rgb()).chooseOne(
    niceColors.default,
  );

  const { scale, layers, minLineGap, maxLineGap, lineAlpha } = params;

  // Uncomment a fill or add a different one to set a background. Default is transparent.
  rect({
    width: canvas.width,
    height: canvas.height,
    fill: '#eee',
    // fill: '#191919',
    fill: nicePallete[0],
  });

  const draw = (width, height) => {
    const xGap = (width - width * scale) / 2;
    const yGap = (height - height * scale) / 2;
    // rect({
    //   x: xGap,
    //   y: yGap,
    //   width: width * scale,
    //   height: height * scale,
    //   fill: nicePallete[0],
    // });
    repeat(layers, layer => {
      const lineGap = rng.int(minLineGap, maxLineGap);
      const lines = (height * scale) / lineGap;
      const xStart = xGap;
      const xEnd = width - xGap;
      const yStart = yGap;
      const yEnd = height - yGap;
      const stroke = tinycolor(nicePallete[layer + 1])
        .setAlpha(lineAlpha)
        .toRgbString();
      repeat(lines, line => {
        const y = yStart + (height * scale * line * line) / lines / lines;

        path({
          points: [Vec2(xStart, y), Vec2(xEnd, y)],
          // stroke: pallete.colors[layer]
          //   .value()
          //   .setAlpha(0.7)
          //   .toRgbString(),
          stroke,
          strokeWidth: lines * 1.4 - line,
          cap: 'none',
        });
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
    params={{
      scale: 0.8,
      layers: 3,
      minLineGap: 25,
      maxLineGap: 100,
      lineAlpha: 0.5,
    }}
  />
);
