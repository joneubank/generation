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

  let backgroundColor = pallete.next();

  const colorCount = rng.int(3, 6);
  const colors = [...Array(colorCount).keys()].map(() => pallete.next());
  rect({
    // x: -width / 2,
    // y: -height / 2,
    width: canvas.width + 2,
    height: canvas.height + 2,
    // fill: tinycolor('hsv(25,8%,95%)').toRgbString(),
    // fill: '#191919',
    // fill: '#eee',

    fill: backgroundColor.value().toRgbString(),
  });
  const draw = (width, height) => {
    const dim = Math.min(width, height) * 1;

    // context.translate(width / 2, height / 2);
    const layers = rng.int(2, Math.max(colorCount - 1, 3));
    const usedColors = rng.choose(colors, layers);
    const radius = (dim / 2) * rng.float(0.55, 0.95, x => x * x);

    const fuzziness = 0;

    repeat(layers, layer => {
      const strokes = rng.int(20, 60);
      repeat(strokes, () => {
        const startAngle = rng.float(0, 2 * Math.PI);
        const endAngle = startAngle + rng.float(0.2, 0.8) * 2 * Math.PI;
        const arcLength = 0.5 + rng.float(-0.15, 0.15);
        const start = Vec2(rng.fuzzy(radius, radius * fuzziness), 0).rotate(
          startAngle,
        );
        const end = Vec2(rng.fuzzy(radius, radius * fuzziness), 0).rotate(
          endAngle,
        );
        path({
          path: [start, end],
          strokeWidth: 3, //dim * 0.01,
          stroke: usedColors[layer].value().toRgbString(),
        });
      });
    });
  };

  // draw(canvas.width, canvas.height);
  const layout = Layout(context);
  layout.grid(9, 9, draw, { fitAll: false });
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
