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
import { line, grid, circleSegments } from '../../../data';
import Vec2, { polarToVec2 } from '../../../data/Vec2';
import { repeat, clamp, array } from '../../../utils';
import Random from '../../../random';

const draw = ({ context, pallete, rng, canvas, params }) => {
  const { rect, circle, path } = Draw(context);
  const layout = Layout(context);
  const sym = Symmetry(context);

  const {
    steps,
    radiusScale,
    outerCurveScale,
    outerCurveLoops,
    outerCurveOrder,
    strokeWidth,
    shapeLoops,
  } = params;

  // Uncomment a fill or add a different one to set a background. Default is transparent.
  rect({
    width: canvas.width,
    height: canvas.height,
    fill: '#eee',
    // fill: '#191919',
    fill: pallete
      .next()
      .value()
      .toRgbString(),
  });

  // Move 0,0 to the canvas center:
  context.translate(canvas.width / 2, canvas.height / 2);

  const draw = (width, height) => {
    const circleRadius = (Math.min(width, height) / 2) * radiusScale;
    const curveRadius = (Math.min(width, height) / 2) * outerCurveScale;
    // Add draw stuff here, run it at the end of the sketch method or in a repeating layout.
    const circlePoints = circleSegments(steps).map(point => ({
      x: point.u * circleRadius,
      y: point.v * circleRadius,
    }));

    // path({ points: circlePoints, strokeWidth, stroke: '#191919' });

    const curve = ParkerCurve(rng, { order: outerCurveOrder });
    const curvePoints = array(0, steps).map(i =>
      curve.at((i * outerCurveLoops) / steps).scale(curveRadius),
    );
    // path({ points: curvePoints, strokeWidth, stroke: '#191919' });

    const colors = array(0, rng.int(2, 5)).map(i =>
      pallete
        .next()
        .value()
        .toRgbString(),
    );
    const gradient = tinygradient(
      array(0, rng.int(5, 7)).map(i => rng.chooseOne(colors)),
    );
    repeat(steps, step => {
      const stroke = gradient.rgbAt(step / steps);
      const shapeStep = (step * shapeLoops) % (steps - 1);
      path({
        points: [circlePoints[shapeStep], curvePoints[step]],
        strokeWidth,
        stroke,
      });
    });
  };

  draw(canvas.width, canvas.height);
  // layout.grid(2, 2, draw);
  pallete.colors.forEach(console.log);
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
      steps: 3000,
      strokeWidth: 1,
      radiusScale: 0.5,
      shapeLoops: 2,
      outerCurveScale: 0.95,
      outerCurveLoops: 2,
      outerCurveOrder: 2,
    }}
  />
);
