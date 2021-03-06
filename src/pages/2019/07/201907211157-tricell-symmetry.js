import React from 'react';
import tinygradient from 'tinygradient';
import { tinycolor } from '@thebespokepixel/es-tinycolor';
import _ from 'lodash';
import * as tumult from 'tumult';

import Sketch from '../../../components/Sketch';
import Draw from '../../../draw';
import Layout from '../../../draw/layouts';
import Symmetry from '../../../draw/symmetry';
import Tricell, {
  makeCell,
  triPath,
  triIndexToAddress,
  totalCells,
} from '../../../data/Tricell';
import { line, grid } from '../../../data';
import Vec2, { polarToVec2 } from '../../../data/Vec2';
import { repeat, clamp, array } from '../../../utils';
import Random from '../../../random';

const draw = ({ context, pallete, rng, canvas }) => {
  const { rect, circle, path } = Draw(context);
  const layout = Layout(context);

  // Uncomment a fill or add a different one to set a background. Default is transparent.
  rect({
    width: canvas.width,
    height: canvas.height,
    // fill: tinycolor('hsv(25,8%,95%)').toRgbString(),
    // fill: '#191919',
    fill: '#eee',
  });

  // Move 0,0 to the canvas center:
  context.resetTransform();
  context.translate(canvas.width / 2, canvas.height / 2);

  const draw = (width, height) => {
    // Add draw stuff here, run it at the end of the sketch method or in a repeating layout.
    const n = 5;
    const scale = (width / 2 / n) * 0.95;

    // const fillRate = rank => Math.pow(1 - (1 / n) * rank, 1);
    // const fillRate = rank => Math.pow(1 - Math.sin((rank / n) * Math.PI * 3) * 0.3, 1) - 0.4;
    const fillRate = (rank, position = 0) =>
      Math.pow(1 - (1 / n) * rank, 1) *
        Math.pow(1 - (1 / (2 * rank + 1) / 3) * position, 2) +
      0.05 * (n - rank);

    const tricell = new Tricell({ n, symmetry: 6, mirror: true });

    repeat(totalCells(n), i => {
      const address = triIndexToAddress(i);
      if (rng.bool(fillRate(address.rank, address.position))) {
        tricell.setCell(
          address.rank,
          address.position,
          makeCell({
            fill: rng
              .chooseOne(pallete.colors)
              .value()
              .darken(rng.fuzzy(5, 5))
              .toRgbString(),
          }),
        );
      }
    });

    repeat(totalCells(n), i => {
      const address = triIndexToAddress(i);
      const cell = tricell.getCell(address.rank, address.position);
      const cellPath = triPath(address.rank, address.position, scale);
      path({ points: cellPath, fill: cell.fill, stroke: cell.fill });
    });
  };

  draw(canvas.width, canvas.height);
  // layout.grid(7, 7, draw, { fitAll: true });
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
