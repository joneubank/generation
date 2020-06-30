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
  const nicePallete = prand.shuffle(
    _.clone(prand.chooseOne(t1000).map((i) => i)),
  );

  const {
    lines,
    lineFill,
    maxRadius,
    colored,
    verticalSkew,
    segmentLength,
    verticalOffset,
  } = params;

  // Uncomment a fill or add a different one to set a background. Default is transparent.
  rect({
    width: canvas.width,
    height: canvas.height,
    fill: '#eee',
    // fill: '#191919',
    fill: nicePallete.pop(),
  });

  const gradient = tinygradient(prand.choose(nicePallete, 3));

  // Move 0,0 to the canvas center:
  context.translate(canvas.width / 2, canvas.height / 2);

  const draw = (width, height) => {
    // Add draw stuff here, run it at the end of the sketch method or in a repeating layout.
    const minDim = Math.min(width, height);
    const maxDim = Math.min(width, height);

    const distortWave = RandomWave(rng);
    repeat(lines, (line) => {
      const ratio = 1 - line / (lines - 1);
      const radius = minDim * maxRadius * ratio;

      const yOffset =
        minDim * maxRadius -
        radius -
        (minDim * maxRadius - radius) * verticalSkew;

      const strokeWidth = (minDim * maxRadius * lineFill) / lines;

      const segments = Math.ceil((2 * Math.PI * radius) / segmentLength);

      const points = array(0, segments).map((i) => {
        const angle = (i / segments) * Math.PI * 2;
        const distortion = Vec2(0, distortWave.at(angle)).scale(
          Math.pow(Math.sin(angle / 2) * ratio, 2),
        );
        return Vec2(0, 1)
          .add(distortion)
          .rotate(angle)
          .scale(radius)
          .add(Vec2(0, yOffset + verticalOffset * minDim));
      });

      path({
        points,
        stroke: 'black',
        strokeWidth,
        close: true,
        fill: gradient.rgbAt(ratio),
      });
    });
  };

  draw(canvas.width, canvas.height);
  // layout.grid(4, 4, draw, { fitAll: true });
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
      lines: 21,
      lineFill: 0.15,
      maxRadius: 0.36,
      colored: false,
      verticalSkew: 0.5,
      segmentLength: 3,
      verticalOffset: 0.09,
    }}
  />
);
