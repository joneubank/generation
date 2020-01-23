import React from 'react';
import tinygradient from 'tinygradient';
import { tinycolor } from '@thebespokepixel/es-tinycolor';
import _ from 'lodash';
import * as tumult from 'tumult';

import Sketch from '../../../components/Sketch';
import Draw from '../../../draw';
import { gradient } from '../../../colors';
import Layout from '../../../draw/layouts';
import Symmetry from '../../../draw/symmetry';
import RandomWave from '../../../data/RandomWave';
import { line, grid, segment } from '../../../data';
import Vec2, { polarToVec2 } from '../../../data/Vec2';
import { repeat, clamp, array } from '../../../utils';
import Random from '../../../random';

const draw = ({ context, pallete, rng, canvas }) => {
  const { rect, circle, path } = Draw(context);

  const boundingScale = 0.05;
  const linesPerShape = 250;
  const shapeCount = rng.int(3, 8);

  //Background
  rect({
    width: canvas.width,
    height: canvas.height,
    fill: tinycolor('hsv(0,0%,90%)').toRgbString(),
  });

  // Setup lines

  const xBound = canvas.width * boundingScale;
  const yBound = canvas.width * boundingScale;

  const boundedPoint = () => ({
    x: rng.int(xBound, canvas.width - xBound),
    y: rng.int(yBound, canvas.height - yBound),
  });

  const lineShape = () => {
    const p1 = boundedPoint();
    const p2 = boundedPoint();
    const p3 = boundedPoint();
    const p4 = boundedPoint();

    // path({
    //   path: [p1, p2],
    //   strokeWidth: 3,
    //   stroke: pallete.colors[0].value().toRgbString(),
    // });
    // path({
    //   path: [p3, p4],
    //   strokeWidth: 3,
    //   stroke: pallete.colors[1].value().toRgbString(),
    // });

    const l1 = segment({ start: p1, end: p2, steps: linesPerShape });
    const l2 = segment({ start: p3, end: p4, steps: linesPerShape });
    const chosen = rng.choose(pallete.colors, 2);
    const colors = gradient(
      chosen[0].value(),
      chosen[1].value(),
      linesPerShape,
    );
    for (let i = 0; i < linesPerShape; i++) {
      path({
        path: [l1[i], l2[i]],
        strokeWidth: 2,
        stroke: colors[i].setAlpha(0.6).toRgbString(),
      });
    }
  };

  repeat(shapeCount, i => lineShape());
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
