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
import { line, segment, grid } from '../../../data';
import Vec2, { polarToVec2 } from '../../../data/Vec2';
import { repeat, clamp, array } from '../../../utils';
import Random from '../../../random';

const draw = ({ context, pallete, rng, canvas, params }) => {
  const { rect, circle, path } = Draw(context);
  const layout = Layout(context);
  const sym = Symmetry(context);

  const {
    steps,
    lines,
    gradientStepsMin,
    gradientStepsMax,
    gradientColorsMin,
    gradientColorsMax,
    strokeWidth,
    distortAmount,
  } = params;

  // Uncomment a fill or add a different one to set a background. Default is transparent.
  rect({
    width: canvas.width,
    height: canvas.height,
    fill: '#eee',
    // fill: pallete.next().rgb(),
    fill: '#191919',
  });

  // Move 0,0 to the canvas center:
  context.translate(canvas.width / 2, canvas.height / 2);

  const draw = (width, height) => {
    context.rotate(rng.next() * Math.PI * 2);
    const colors = array(0, rng.int(gradientColorsMin, gradientColorsMax)).map(
      i =>
        tinycolor({
          h: pallete
            .next()
            .value()
            .toHsv().h,
          s: 100,
          v: 200,
        }).toRgbString(),
    );
    // const gradient = tinygradient([
    //   colors[0],
    //   ...array(0, rng.int(gradientStepsMin - 1, gradientStepsMax - 1)).map(i =>
    //     rng.chooseOne(colors),
    //   ),
    //   colors[0],
    // ]);
    const gradient = tinygradient(colors);

    const shapePoints = [
      Vec2(-width / 3, height / 4),
      Vec2(-width / 3, -height / 4),
    ];

    const alongShape = ratio => {
      const delta = shapePoints[1].add(shapePoints[0].scale(-1));
      return shapePoints[0].add(delta.scale(ratio));
    };

    // path({ points: shapePoints, stroke: '#eee', strokeWidth: 5 });
    // path({
    //   points: shapePoints.map(point => point.scale(-1)),
    //   stroke: '#eee',
    //   strokeWidth: 5,
    // });
    const wave = RandomWave(rng);

    repeat(lines + 1, i => {
      const distort = point => {
        return point.add(
          Vec2(
            // (wave.at((point.y * 2 * Math.PI) / height) * width) / distortAmount,
            // (wave.at(i / 20 + (point.x * 2 * Math.PI) / width) * height) /
            //   distortAmount,
            0,
            (wave.at(i / 20 + (point.x * 2 * Math.PI) / width) * height) /
              distortAmount,
          ),
        );
      };
      const start = alongShape(i / lines);
      const end = Vec2(-start.x, start.y);
      const points = segment({ start, end, steps }).map(point =>
        distort(Vec2(point.x, point.y))
          .scale(3)
          .add(Vec2(rng.fuzzy(0, 20), rng.fuzzy(0, 10))),
      );
      path({
        points,
        stroke: gradient
          .rgbAt(i / lines)
          .darken(rng.fuzzy(0, 70))
          .toRgbString(),
        strokeWidth,
      });
    });

    // Add draw stuff here, run it at the end of the sketch method or in a repeating layout.
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
      lines: 400,
      steps: 300,
      gradientStepsMin: 5,
      gradientStepsMax: 12,
      gradientColorsMin: 3,
      gradientColorsMax: 4,
      strokeWidth: 5,
      distortAmount: 8,
    }}
  />
);
