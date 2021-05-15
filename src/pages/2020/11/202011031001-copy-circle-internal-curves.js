import React from 'react';
import tinygradient from 'tinygradient';
import { tinycolor } from '@thebespokepixel/es-tinycolor';
import _ from 'lodash';
import * as tumult from 'tumult';

import Sketch from '../../../components/Sketch';
import Draw from '../../../draw';
import Layout from '../../../draw/layouts';
import RandomWave from '../../../data/RandomWave';
import { line, grid } from '../../../data';
import Vec2, { polarToVec2 } from '../../../data/Vec2';
import { repeat, clamp, array } from '../../../utils';
import Random from '../../../random';
import { simplex, perlin } from '../../../data/noise';

import { default as t1000 } from 'nice-color-palettes/1000';

const draw = ({ context, pallete, rng, canvas, params }) => {
  const { rect, bezier, circle, path } = Draw(context);
  const layout = Layout(context);

  const prand = Random(pallete.colors[0].rgb());
  const nicePallete = prand.chooseOne(t1000).map((i) => i);

  const {
    steps,
    circleScale,
    minArc,
    maxArc,
    lines,
    strokeWidth,
    layers,
  } = params;

  // Uncomment a fill or add a different one to set a background. Default is transparent.
  rect({
    width: canvas.width,
    height: canvas.height,
    fill: '#eee',
    // fill: '#191919',
  });

  // Move 0,0 to the canvas center:
  context.translate(canvas.width / 2, canvas.height / 2);

  const draw = (width, height) => {
    // Add draw stuff here, run it at the end of the sketch method or in a repeating layout.
    const minDim = Math.min(width, height);
    const maxDim = Math.min(width, height);

    const radius = (minDim / 2) * circleScale;

    circle({
      x: 0,
      y: 0,
      radius,
      stroke: '#191919',
      strokeWidth,
    });

    repeat(layers, () => {
      const arcLengthA = rng.float(minArc, maxArc);
      const arcLengthB = rng.float(minArc, maxArc);

      const arcStartA = rng.float(0, Math.PI * 2);
      const arcStartB = rng.float(0, Math.PI * 2);

      const focusStart = Vec2(rng.float(radius * 0.2, radius * 0.7), 0).rotate(
        rng.float(0, Math.PI * 2),
      );
      const focusEnd = Vec2(rng.float(radius * 0.2, radius * 0.7), 0).rotate(
        rng.float(0, Math.PI * 2),
      );
      const focusVector = focusEnd.subtract(focusStart);

      repeat(lines, (i) => {
        const startAngle = arcStartA + arcLengthA * (i / (lines - 1));
        const endAngle =
          arcStartB + arcLengthB * ((lines - 1 - i) / (lines - 1));
        const unitVec2 = Vec2(radius, 0);
        const start = unitVec2.rotate(startAngle);
        const end = unitVec2.rotate(endAngle);
        const points = [start, end];

        const focus = focusStart.add(focusVector.scale(i / (lines - 1)));

        // path({ points, strokeWidth, stroke: '#191919' });
        bezier({
          start,
          end,
          control1: focus,
          control2: focus,
          stroke: '#191919',
          strokeWidth,
        });
      });
    });
  };

  draw(canvas.width, canvas.height);
  // layout.grid(4, 4, draw, {fitAll:true});
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
      debounce: 5,
      circleScale: 0.9,
      minArc: (Math.PI * 2) / 12,
      maxArc: (Math.PI * 2) / 2,
      lines: 25,
      strokeWidth: 3,
      layers: 1,
    }}
    controls={[
      { key: 'circleScale', type: 'range', min: 0, max: 1, step: 0.01 },
      { key: 'lines', type: 'range', min: 25, max: 100, step: 1 },
      { key: 'strokeWidth', type: 'range', min: 1, max: 13, step: 1 },
      { key: 'layers', type: 'range', min: 1, max: 5, step: 1 },
    ]}
  />
);
