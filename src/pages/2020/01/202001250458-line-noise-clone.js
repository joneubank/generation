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
import { perlin } from '../../../data/noise';

const draw = ({ context, pallete, rng, canvas, params }) => {
  const { rect, circle, path } = Draw(context);
  const layout = Layout(context);
  const sym = Symmetry(context);

  const {
    imageScale,
    lines,
    lineFill,
    pointDensity,
    pointsPerLine,
    secondScale,
  } = params;

  // Uncomment a fill or add a different one to set a background. Default is transparent.
  rect({
    width: canvas.width,
    height: canvas.height,
    fill: pallete.random().value().toRgbString(),
    fill: '#eee',
    fill: '#191919',
  });

  // Move 0,0 to the canvas center:
  context.translate(canvas.width / 2, canvas.height / 2);

  const drawLines = (
    width,
    height,
    distortion = (point) => point,
    scale = 1,
  ) => {
    const stroke = pallete.next().value().toRgbString();
    // Add draw stuff here, run it at the end of the sketch method or in a repeating layout.
    const minDim = Math.min(width, height);
    const shapeHeight = minDim * imageScale;
    const radius = shapeHeight / 2;
    // const stroke = '#191919';
    // const stroke = '#eee';
    const strokeWidth = (shapeHeight / lines) * lineFill;
    repeat(lines, (i) => {
      // context.rotate(0.025);
      const lineY = i / lines;

      const absY = lineY >= 0.5 ? lineY - 0.5 : Math.abs(0.5 - lineY);
      const lineX = absY * Math.tan(Math.acos(absY / 0.5)) * 2;
      const lineLength = 2 * lineX;
      const linePoints = Math.ceil((pointsPerLine * lineLength) / 2); //Math.ceil(lineLength * shapeHeight * pointDensity);
      const points = array(0, linePoints + 1)
        .map((p) => {
          return Vec2(
            (-lineX + ((p * 2) / (linePoints + 1)) * lineX) / 2,
            lineY,
          );
        })
        .map((point) =>
          distortion(point)
            .scale(shapeHeight)
            .add(Vec2(0, -radius))
            .scale(scale),
        );
      path({
        points,
        stroke,
        strokeWidth,
      });
    });
  };

  const draw = (width, height) => {
    const randomDistort = (point) => point.add(Vec2(0, rng.float(-0.01, 0)));
    const defaultDistort = (point) => point;

    context.rotate(rng.float(0, Math.PI * 2));
    context.save();
    drawLines(width, height);
    context.restore();

    repeat(1, () => {
      const noise = perlin(rng.next(), 4);
      const noiseDistort = function (point) {
        const push = noise(point.x + 1, point.y + 1) - 0.5;
        return point.add({ x: 0, y: push });
      };
      context.save();
      context.rotate(rng.float(-0.2, 0.2));
      // drawLines(width, height, randomDistort);
      drawLines(width, height, noiseDistort, secondScale);
      context.restore();
    });

    // context.save();
    // context.rotate(rng.float(-0.2, 0.2));
    // drawLines(width, height, randomDistort);
    // context.
  };
  draw(canvas.width, canvas.height);
  // layout.grid(3, 3, draw);
};

export default () => (
  <Sketch
    options={{
      // title: '',
      // pallete: null,
      // fullscreen: true,
      width: 6 * 300,
      height: 6 * 300,
      // blend: 'difference',
    }}
    draw={draw}
    params={{
      imageScale: 0.85,
      lines: 105,
      lineFill: 0.35,
      pointDensity: 0.025,
      pointsPerLine: 200,
      secondScale: 1,
    }}
  />
);
