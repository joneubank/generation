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
import ParkerCurve from '../../../data/ParkerCurve';
import { line, grid } from '../../../data';
import Vec2, { polarToVec2 } from '../../../data/Vec2';
import { repeat, clamp, array } from '../../../utils';
import Random from '../../../random';

const draw = ({ context, pallete, rng, canvas, params }) => {
  const { rect, circle, path } = Draw(context);
  const layout = Layout(context);
  const sym = Symmetry(context);

  const {
    steps,
    gridSize,
    outerCurveScale,
    outerCurveLoops,
    outerCurveOrder,
  } = params;

  // Uncomment a fill or add a different one to set a background. Default is transparent.
  rect({
    width: canvas.width,
    height: canvas.height,
    fill: '#eee',
    fill: '#000',
  });

  // Move 0,0 to the canvas center:
  context.translate(canvas.width / 2, canvas.height / 2);

  const brushWidth = 500;

  const gridWidth = gridSize;
  const gridHeight = gridSize;
  const points = grid(gridWidth, gridHeight);

  const pointRadius = (brushWidth / gridSize / 2) * 1.1;
  const brushH = pallete.next().value().toHsv().h;
  const rotation = 0.1;
  const brush = (pos, step) => {
    // const topLeft = pos.add(Vec2(-brushWidth / 2, -brushWidth / 2));
    points.forEach((point, i) => {
      const col = i % gridWidth;
      const row = Math.floor(i / gridWidth);
      const distance = Math.sqrt(
        Math.max(Math.abs(gridWidth - col), Math.abs(col - gridWidth)) *
          Math.max(Math.abs(gridWidth - col), Math.abs(col - gridWidth)) +
          Math.max(Math.abs(gridWidth - row), Math.abs(row - gridWidth)) *
            Math.max(Math.abs(gridWidth - row), Math.abs(row - gridWidth)),
      );
      const xy = Vec2(point.u * brushWidth, point.v * brushWidth)
        .add(Vec2(-brushWidth / 2, -brushWidth / 2))
        .scale(0.5 + distance / gridWidth)
        .rotate(step * rotation)
        .add(pos);
      // const fill = (col * row) / gridWidth / gridWidth;
      const fill = row / gridWidth;
      console.log(i, col, row, fill);
      circle({
        ...xy,
        fill: tinycolor({
          h: brushH,
          s: 200,
          v: fill,
        })
          .setAlpha(0.9)
          .darken(rng.fuzzy(2, 2))
          .toRgbString(),
        radius: pointRadius,
      });
    });
  };

  const draw = (width, height) => {
    // Add draw stuff here, run it at the end of the sketch method or in a repeating layout.
    const curveRadius = (Math.min(width, height) / 2) * outerCurveScale;

    const curve = ParkerCurve(rng, { order: outerCurveOrder });
    const curvePoints = array(0, steps).map((i) =>
      curve.at((i * outerCurveLoops) / steps).scale(curveRadius),
    );
    curvePoints.forEach((point, i) => {
      // circle({
      //   ...curvePoints[step],
      //   fill: '#191919',
      //   radius: 10,
      // });
      brush(point, i);
    });
    // brush(Vec2(0, 0));
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
      steps: 1000,
      gridSize: 17,
      outerCurveScale: 1.5,
      outerCurveLoops: 5,
      outerCurveOrder: 5,
    }}
  />
);
