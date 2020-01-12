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
  const gridSize = 55;
  const gridScale = 0.75;
  const radius = 13;
  const strokeWidth = 5;
  const strokeChance = 0.3;
  const sizeJitter = 0.5;
  const positionJitter = 0.25;
  const strokeJitter = 0.5;

  const randColor = () =>
    rng
      .chooseOne(pallete.colors)
      .value()
      .toRgbString();
  const drawDot = (x, y, fillColor, lineColor, hasLine) => {
    context.beginPath();
    context.arc(
      x,
      y,
      rng.fuzzy(radius, radius * sizeJitter),
      0,
      2 * Math.PI,
      false,
    );
    context.fillStyle = rng
      .chooseOne(pallete.colors.slice(0, 3))
      .value()
      .toRgbString();
    context.fill();
    if (rng.bool(strokeChance)) {
      context.lineWidth = rng.fuzzy(strokeWidth, strokeWidth * strokeJitter);
      context.strokeStyle = rng
        .chooseOne(pallete.colors)
        .value()
        .toRgbString();
      context.stroke();
    }
  };

  // const background = rng.color();
  const background = pallete.colors[0];
  context.fillStyle = background.value().toRgbString();
  context.fillRect(0, 0, canvas.width, canvas.height);

  rng.shuffle([...Array(gridSize * gridSize).keys()]).forEach(i => {
    const x = i % gridSize;
    const y = Math.floor(i / gridSize);
    const dim = Math.max(canvas.width, canvas.height);

    const gapSize = (dim * gridScale) / (gridSize - 1);

    const centerx = x * gapSize + (canvas.width - dim * gridScale) / 2;
    const centery = y * gapSize + (canvas.height - dim * gridScale) / 2;

    drawDot(
      rng.fuzzy(centerx, gapSize * positionJitter),
      rng.fuzzy(centery, gapSize * positionJitter),
      randColor,
      randColor,
      rng.bool(strokeChance),
    );
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
