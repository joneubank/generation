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
  const height = canvas.height;
  const width = canvas.width;

  const count = pallete.colors.length;

  pallete.colors
    .sort((a, b) => b.value().toHsv().v - a.value().toHsv().v)
    .forEach((color, index) => {
      context.fillStyle = color.value().toRgbString();
      context.fillRect(0, (height * index) / count, width, height / count);

      context.font = '24px Helvetica';
      context.fillStyle = color
        .inverse()
        // .darken(33)
        // .desaturate(45)

        .toRgbString();
      context.fillText(
        `${color.name} ${color.value().toHex8String()}`,
        20,
        (height * (index + 1)) / count - 25,
      );

      if (index === 0) {
        context.font = 'bold 48px Helvetica';
        context.fillStyle = color
          .value()
          .darken(33)
          .toRgbString();
        context.fillText(pallete.name, 50, 80);
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
