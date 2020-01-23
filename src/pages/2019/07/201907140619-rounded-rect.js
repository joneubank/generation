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
  const cornerRadius = 30;
  const rectWidth = 800;
  const rectHeight = 1200;

  const { rect } = Draw(context);

  rect({
    width: canvas.width,
    height: canvas.height,
    fill: pallete.colors[1]
      .value()
      .desaturate(25)
      .lighten(20)
      .toRgbString(),
  });

  context.translate(
    (canvas.width - rectWidth) / 2,
    (canvas.height - rectHeight) / 2,
  );

  // const c1 = '#000';
  const c1 = pallete.colors[0].value().toRgbString();

  rect({
    width: rectWidth,
    height: rectHeight,
    fill: pallete.colors[1].value().toRgbString(),
    stroke: c1,
    strokeWidth: 10,
    round: 50,
    corners: {
      // topLeft: 10,
      topRight: 700,
    },
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
