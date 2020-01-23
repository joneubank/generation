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
  const gridSize = 13;
  const gridScale = 0.69;
  const radius = 21;

  const showChanceL2 = 0.85;
  const jitterRange = 0.3;
  const minJitter = 0.15;
  const darkened = 10;
  const darknessJitter = 10;

  const randColor = () =>
    rng
      .chooseOne(pallete.colors)
      .value()
      .toRgbString();
  const { circle } = Draw(context);

  const background = pallete.colors[0];
  console.log(background);
  context.fillStyle = background.value().toRgbString();
  context.fillRect(0, 0, canvas.width, canvas.height);

  const G = grid(gridSize, gridSize);
  const gw = canvas.width * gridScale;
  const gh = canvas.height * gridScale;

  // Layer 2
  context.translate((canvas.width - gw) / 2, (canvas.height - gh) / 2);

  const color2 = pallete.colors[1];
  G.forEach(({ u, v }) => {
    circle({
      x: u * gw,
      y: v * gh,
      fill: color2.value().toRgbString(),
      radius,
    });
  });

  const color3 = pallete.colors[0];
  G.forEach(({ u, v }) => {
    if (rng.bool(showChanceL2)) {
      const centerDistance = Math.sqrt(
        (0.5 - u) * (0.5 - u) + (0.5 - v) * (0.5 - v),
      );
      circle({
        x: rng.fuzzy(
          u * gw,
          (gw / gridSize) * jitterRange * (1 + minJitter - 2 * centerDistance),
        ),
        y: rng.fuzzy(
          v * gh,
          (gh / gridSize) * jitterRange * (1 + minJitter - 2 * centerDistance),
        ),
        fill: color3
          .value()
          .darken(rng.fuzzy(darkened, darknessJitter))
          .toRgbString(),
        radius: radius + 1,
      });
    }
  });

  console.log(color2);
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
