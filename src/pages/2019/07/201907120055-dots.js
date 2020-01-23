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

const draw = ({ context, pallete, rng, canvas }) => {
  const gridSize = 35;
  const gridScale = 1;
  const radius = 25;
  const strokeWidth = 10;
  const strokeChance = 0.69;

  const randColor = () =>
    rng
      .chooseOne(pallete.colors)
      .value()
      .toRgbString();
  const drawDot = (x, y, fillColor, lineColor, hasLine) => {
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI, false);
    context.fillStyle = rng
      .chooseOne(pallete.colors)
      .value()
      .toRgbString();
    context.fill();
    if (rng.bool(strokeChance)) {
      context.lineWidth = strokeWidth;
      context.strokeStyle = rng
        .chooseOne(pallete.colors)
        .value()
        .toRgbString();
      context.stroke();
    }
  };

  const background = pallete.next();
  context.fillStyle = background.value().toRgbString();
  context.fillRect(0, 0, canvas.width, canvas.height);

  rng.shuffle([...Array(gridSize * gridSize).keys()]).forEach(i => {
    const x = i % gridSize;
    const y = Math.floor(i / gridSize);
    const dim = Math.max(canvas.width, canvas.height);

    const centerx =
      (x * dim * gridScale) / (gridSize - 1) +
      (canvas.width - dim * gridScale) / 2;
    const centery =
      (y * dim * gridScale) / (gridSize - 1) +
      (canvas.height - dim * gridScale) / 2;

    drawDot(centerx, centery, randColor, randColor, rng.bool(strokeChance));
  });
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
