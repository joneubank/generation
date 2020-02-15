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
  context.rotate(Math.PI / 4);

  const draw = (width, height) => {
    const layers = shapeLayers;
    const maxFreq = shapeMaxFreq;

    const angleNoise1 = perlin(rng.next(), perlinOctaves);
    const angleNoise2 = perlin(rng.next(), perlinOctaves);
    const angleNoise3 = perlin(rng.next(), perlinOctaves);
    const angleDensity = perlinAngleDensity;

    repeat(lines, i => {
      const scale = (Math.min(width, height) / 2) * shapeScale;
      // circle({
      //   ...start.obj,
      //   radius: 5,
      //   fill: tinycolor('#191919')
      //     .setAlpha(0.05)
      //     .toRgbString(),
      // });

      const rads = rng.float(0, Math.PI * 2) * shapeArc;
      const start = Vec2(rng.next() - 0.5, 0).scale(scale * 2);

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

      const color = rng
        .chooseOne(pallete.colors.slice(-2))
        .value()
        .darken(rng.fuzzy(0, 10))
        // .setAlpha(0.75)
        .toRgbString();
      drawLine(Vec2(stepSize, 0), color, angleNoise1);
      drawLine(Vec2(-stepSize, 0), color, angleNoise2);
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
      steps: 180,
      lines: 500,
      shapeScale: 1.35,
      stepSize: 10,
      shapeLayers: 5,
      shapeArc: 0.1,
      shapeMaxFreq: 10,
      perlinOctaves: 8,
      perlinAngleDensity: 4,
      strokeWidth: 5,
    }}
  />
);
