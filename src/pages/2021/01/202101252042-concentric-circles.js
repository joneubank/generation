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
  const nicePallete = prand.chooseOne(t1000).map((i) => i);

  const { stars, centers, arclength, thickness, colorJitter } = params;

  // Uncomment a fill or add a different one to set a background. Default is transparent.
  rect({
    width: canvas.width,
    height: canvas.height,
    fill: '#eee',
    fill: '#191919',
  });

  // Move 0,0 to the canvas center:
  // context.translate(canvas.width / 2, canvas.height / 2);

  const draw = (width, height) => {
    // Add draw stuff here, run it at the end of the sketch method or in a repeating layout.
    const minDim = Math.min(width, height);
    const maxDim = Math.min(width, height);

    repeat(centers, () => {
      const center = Vec2(rng.float(0, width), rng.float(0, height));
      rng.push('star-centers');
      // const color = nicePallete.pop();
      repeat(stars / centers, () => {
        const startPoint = Vec2(
          rng.float(center.x - width, center.x + width),
          rng.float(center.y - height, center.y + height),
        );
        // const radius = center.subtract(startPoint).magnitude();
        // const startArc =
        //   Math.acos((startPoint.x - center.x) / radius) / Math.PI;
        const radius = rng.float(0, Math.sqrt(2 * maxDim * maxDim));
        const startArc = rng.float();
        const strokeWidth = rng.float(minDim / 1500, minDim / 600) * thickness;
        circle({
          x: center.x,
          y: center.y,
          radius,
          start: startArc,
          arc: radius < strokeWidth ? 1 : arclength,
          stroke: tinycolor(rng.chooseOne(nicePallete))
            .lighten(rng.float(0, colorJitter))
            .darken(rng.float(0, colorJitter))
            .toRgbString(),
          strokeWidth,
        });
      });
      rng.pop();
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
      debounce: 250,
      stars: 250,
      centers: 1,
      arclength: 0.25,
      thickness: 1,
      colorJitter: 0,
    }}
    controls={[
      { key: 'stars', type: 'range', min: 100, max: 5000, step: 20 },
      { key: 'centers', type: 'range', min: 1, max: 8, step: 1 },
      { key: 'arclength', type: 'range', min: 0, max: 1, step: 0.01 },
      { key: 'thickness', type: 'range', min: 0, max: 100, step: 1 },
      { key: 'colorJitter', type: 'range', min: 0, max: 50, step: 1 },
    ]}
  />
);
