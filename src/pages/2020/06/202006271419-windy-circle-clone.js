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
  const { rect, circle, path } = Draw(context);
  const layout = Layout(context);

  const prand = Random(pallete.colors[0].rgb());
  const nicePalleteSaved = _.clone(
    prand.shuffle(prand.chooseOne(t1000).map((i) => i)),
  );

  const {
    layers,
    steps,
    circlePoints,
    radiusRatio,
    strokeWidthRatio,
    pointStepSize,
    opacity,
    noiseAngleOctaves,
    noiseAngleSensitivity,
    noiseMagnitudeOctaves,
    noiseMagnitudeSensitivity,
    colored,
  } = params;

  // Uncomment a fill or add a different one to set a background. Default is transparent.
  rect({
    width: canvas.width,
    height: canvas.height,
    // fill: nicePallete.pop(),
    fill: colored ? nicePalleteSaved.pop() : '#eee',
    fill: '#191919',
    fill: '#eee',
  });

  // Move 0,0 to the canvas center:
  context.translate(canvas.width / 2, canvas.height / 2);

  // const color = tinycolor('#222').setAlpha(opacity).toRgbString(0);

  const draw = (width, height) => {
    const nicePallete = prand.shuffle(_.clone(nicePalleteSaved));
    repeat(layers, (layer) => {
      const color = tinycolor(colored ? nicePallete.pop() : '#222')
        .setAlpha(opacity)
        .toRgbString(0);
      // Add draw stuff here, run it at the end of the sketch method or in a repeating layout.
      const minDim = Math.min(width, height);
      const maxDim = Math.min(width, height);
      const dim = minDim;

      const initialRadius = radiusRatio * dim;

      const noiseAngle = perlin(rng.next(), noiseAngleOctaves);
      const noiseMagnitude = perlin(rng.next(), noiseMagnitudeOctaves);

      const movePoint = (point, step) => {
        // random walk
        if (false) {
          const x = rng.fuzzy(0, 1) * pointStepSize;
          const y = rng.fuzzy(0, 1) * pointStepSize;
          const output = point.add(Vec2(x, y));
          return output.normalize();
        }
        // Noise version
        if (true) {
          const noisePoint = point.add(Vec2(5, 5));
          const angle =
            noiseAngle(noisePoint.x, noisePoint.y) *
            Math.PI *
            2 *
            noiseAngleSensitivity;
          const magnitude =
            (noiseMagnitude(noisePoint.x, noisePoint.y) + 0.5) *
            noiseMagnitudeSensitivity;
          return point.add(point.normalize().rotate(angle).scale(magnitude));
        }
        // return output;
      };

      let points = array(0, circlePoints).map((i) =>
        Vec2(1, 0).rotate((Math.PI * 2 * i) / circlePoints),
      );
      path({
        points: points.map((point) => point.scale(initialRadius)),
        strokeWidth: dim * strokeWidthRatio,
        stroke: nicePallete[4],
        stroke: '#eee',
        stroke: '#222',
        stroke: color,
        close: true,
      });
      repeat(steps, (step) => {
        points = points.map((point) => movePoint(point, step));
        path({
          points: points.map((point) => point.scale(initialRadius)),
          strokeWidth: dim * strokeWidthRatio,
          stroke: nicePallete[4],
          stroke: '#eee',
          stroke: '#222',
          stroke: color,
          close: true,
        });
      });
    });
  };

  draw(canvas.width, canvas.height);
  // layout.grid(5, 5, draw, { fitAll: true });
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
      layers: 3,
      steps: 200,
      pointStepSize: 0.5,
      circlePoints: 700,
      radiusRatio: 0.25,
      strokeWidthRatio: 1.5 / 1000,
      opacity: 0.6,
      noiseAngleOctaves: 3,
      noiseAngleSensitivity: 0.5,
      noiseMagnitudeOctaves: 3,
      noiseMagnitudeSensitivity: 0.015,
      colored: true,
    }}
  />
);
