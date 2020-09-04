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

import { simplex, perlin } from '../../../data/noise';

const draw = ({ context, pallete, rng, canvas, params }) => {
  const { rect, circle, path } = Draw(context);
  const layout = Layout(context);
  const sym = Symmetry(context);

  const {
    steps,
    lines,
    stepSize,
    shapeLayers,
    shapeArc,
    shapeMaxFreq,
    shapeScale,
    perlinOctaves,
    perlinAngleDensity,
    strokeWidth,
  } = params;

  // Uncomment a fill or add a different one to set a background. Default is transparent.
  rect({
    width: canvas.width,
    height: canvas.height,
    fill: '#191919',
    fill: '#eee',
    fill: '#000',
  });

  // Move 0,0 to the canvas center:
  context.translate(canvas.width / 2, canvas.height / 2);
  context.rotate(rng.float(0, Math.PI * 2));
  // context.rotate(Math.PI / 4);

  const draw = (width, height) => {
    const layers = shapeLayers;
    const maxFreq = shapeMaxFreq;

    const angleNoise1 = perlin(rng.next(), perlinOctaves);
    const angleNoise2 = perlin(rng.next(), perlinOctaves);
    const angleNoise3 = perlin(rng.next(), perlinOctaves);
    const angleDensity = perlinAngleDensity;

    const circleDraw = (radius, baseColor, noise) =>
      repeat(lines, i => {
        const rads = rng.float(0, Math.PI * 2) * shapeArc;
        const start = polarToVec2(rads, radius);
        // Vec2(rng.next() - 0.5, 0).scale(scale * 2);

        // circle({
        //   ...start.obj,
        //   radius: 5,
        //   fill: tinycolor('#eee')
        //     // .setAlpha(0.05)
        //     .toRgbString(),
        // });
        const drawLine = (step, color, noise) => {
          let lastStep = start;
          const points = array(0, steps).map(i => {
            const normalized = lastStep
              .add(Vec2(width / 2, height / 2))
              .normalize()
              .add(Vec2(0.5, 0.5));
            const output = lastStep.add(
              step.rotate(
                noise(normalized.x, normalized.y) * Math.PI * 2 * angleDensity,
              ),
            );
            lastStep = output;
            return output;
          });
          path({
            points: [start, ...points],
            strokeWidth,
            stroke: color,
          });
        };

        const color = pallete.colors[baseColor]
          .value()
          .darken(rng.fuzzy(0, 30))
          // .setAlpha(0.75)
          .toRgbString();
        drawLine(Vec2(stepSize, 0), color, noise);
        // drawLine(Vec2(-stepSize, 0), color, angleNoise2);
      });

    const scale = (Math.min(width, height) / 2) * shapeScale;
    circleDraw(scale * 2.6, 2, angleNoise1);
    circleDraw(scale * 1.8, 1, angleNoise1);
    circleDraw(scale, 0, angleNoise1);
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
      steps: 130,
      lines: 500,
      shapeScale: 0.35,
      stepSize: 12,
      shapeLayers: 5,
      shapeArc: 1,
      shapeMaxFreq: 10,
      perlinOctaves: 4,
      perlinAngleDensity: 5,
      strokeWidth: 3,
    }}
  />
);
