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
  const gridX = 55;
  const gridY = 55;
  const darken = 5;
  const saturate = 2;

  const { rect } = Draw(context);

  rect({
    x: 0,
    y: 0,
    width: canvas.width,
    height: canvas.height,
    // fill: tinycolor('hsv(70,5%,94%)').toRgbString(),
    fill: pallete.colors[2].value().toRgbString(),
  });

  const blockWidth = canvas.width / (gridX - 1);
  const blockHeight = canvas.height / (gridY - 1);

  const G = grid(gridX, gridY);

  G.forEach(({ u, v }) => {
    //we're evenly dividing not making a list of objects... we might need a couple versions of the grid data method

    const option = rng.int(0, pallete.colors.length);
    const choice = option < 2 ? option : 2;
    if (u !== 1 && v !== 1) {
      const c = pallete.colors[choice]
        .value()
        .darken(rng.int(-darken, darken))
        .saturate(rng.int(-saturate, saturate))
        .toRgbString();
      console.log(c);
      rect({
        x: u * canvas.width,
        y: v * canvas.height,
        width: blockWidth + 1,
        height: blockHeight + 1,
        fill: c,
      });
    }
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
