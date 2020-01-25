import React from 'react';
import tinygradient from 'tinygradient';
import { tinycolor } from '@thebespokepixel/es-tinycolor';
import _ from 'lodash';

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
    ringWidth,
    fillRatio,
    pointDensity,
    noiseStrength,
    expansionFactor,
    originGap,
    circleCount,
  } = params;
  const circles = circleCount || rng.int(2, 5);

  // Uncomment a fill or add a different one to set a background. Default is transparent.
  rect({
    width: canvas.width,
    height: canvas.height,
    fill: '#eee',
    fill: '#191919',
  });

  // Move 0,0 to the canvas center:
  context.translate(canvas.width / 2, canvas.height / 2);

  const strokeWidth = ringWidth * fillRatio;
  const innerRadius = ringWidth - strokeWidth / 2;
  const maxRadius = Math.sqrt(
    window.innerWidth * window.innerWidth +
      window.innerHeight * window.innerHeight,
  );

  const rings = origin => {
    const stroke = rng
      .chooseOne(pallete.colors)
      .value()
      .toRgbString();
    // Add draw stuff here, run it at the end of the sketch method or in a repeating layout.
    let radius = innerRadius;
    const noise = perlin(rng.next(), 4);
    // const stroke = '#eee';
    while (radius < maxRadius) {
      const steps = Math.floor(radius * pointDensity + 10);
      const points = array(0, steps + 1)
        .map(i =>
          Vec2(
            Math.cos((i * Math.PI * 2) / steps),
            Math.sin((i * Math.PI * 2) / steps),
          ),
        )
        .map(point => {
          const noisePoint = point.scale(0.5).add({ x: 0.5, y: 0.5 });
          const push = noise(noisePoint.x, noisePoint.y) * noiseStrength;
          return point
            .scale(push * radius + expansionFactor * radius)
            .add(origin);
        });
      path({
        points,
        strokeWidth,
        stroke,
      });
      radius += params.ringWidth;
    }
  };

  const draw = (width, height) => {
    const arcOffset = rng.float(0, Math.PI * 2);
    array(0, circles).forEach(i => {
      //   const arc = (i * Math.PI * 2) / circles + arcOffset;
      //   rings(Vec2(Math.sin(arc), Math.cos(arc)).scale(originGap));
      rings(
        Vec2(rng.int(-originGap, originGap), rng.int(-originGap, originGap)),
      );
    });
    // rings(Vec2(-originGap, 0));
    // rings(Vec2(0, 0));
    // rings(Vec2(originGap, 0));
  };

  draw(canvas.width, canvas.height);
  // layout.grid(2, 2, draw);
};

export default () => (
  <Sketch
    options={{
      // title: '',
      // pallete: null,
      // fullscreen: true,
      width: 2048,
      height: 2048,
      blend: 'difference',
    }}
    draw={draw}
    params={{
      ringWidth: 85,
      fillRatio: 0.35,
      pointDensity: 0.5,
      noiseStrength: 1,
      expansionFactor: 0.4,
      originGap: 200,
      circleCount: 0,
    }}
  />
);
