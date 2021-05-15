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

  const {
    particleCount,
    particleSteps,
    particleStepScale,
    particleSpawnScale,
    windScale,
    windForce,
    sections,
    sectionRotation,
  } = params;

  // Uncomment a fill or add a different one to set a background. Default is transparent.
  rect({
    width: canvas.width,
    height: canvas.height,
    fill: '#eee',
    fill: '#191919',
  });

  // Move 0,0 to the canvas center:
  // context.translate(canvas.width / 2, canvas.height / 2);
  const forceRotation = rng.float(0, Math.PI * 2);
  const sectionAngle = rng.float(0, Math.PI * 2);

  const draw = (width, height) => {
    // Add draw stuff here, run it at the end of the sketch method or in a repeating layout.
    const minDim = Math.min(width, height);
    const maxDim = Math.min(width, height);

    const spawnDiff = maxDim * particleSpawnScale - maxDim;
    const randomSpawnPos = () => rng.float(-spawnDiff, maxDim + spawnDiff);

    const gravity = Vec2(0, 1);
    const xWave = RandomWave(rng, { layers: 10 });
    const yWave = RandomWave(rng, { layers: 10 });
    const wind = (xy) => {
      const windPos = xy.scale((1 / Math.PI / 2 / maxDim) * windScale);
      return Vec2(windForce, 0).scale(
        xWave.at(windPos.x) + yWave.at(windPos.y),
      );
    };
    const particles = array(0, particleCount).map((i) =>
      Vec2(randomSpawnPos(), randomSpawnPos()),
    );

    const applyField = (xy) => {
      const mod = gravity
        .add(wind(xy))
        .scale(particleStepScale)
        .rotate(forceRotation);

      const sectionXy = xy.rotate(sectionAngle);

      const xSection = Math.floor((sectionXy.x / maxDim) * sections);
      const ySection = Math.floor((sectionXy.y / maxDim) * sections);

      return xy.add(mod.rotate(sectionRotation * (xSection + ySection)));
    };

    particles.forEach((particle) => {
      const points = [particle];
      var pos = particle;
      repeat(particleSteps, (i) => {
        pos = applyField(pos);
        points.push(pos);
      });

      path({
        points,
        stroke: tinycolor(rng.chooseOne(nicePallete))
          .setAlpha(0.3)
          .toRgbString(),
        strokeWidth: rng.int(3, 11),
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
      width: 4096,
      height: 4096,
      // blend: 'lighten',
    }}
    draw={draw}
    params={{
      particleCount: 2000,
      particleSteps: 100,
      particleStepScale: 8,
      particleSpawnScale: 1.2,
      windScale: 2,
      windForce: 1,
      sections: 5,
      sectionRotation: 0,
    }}
    controls={[
      { key: 'particleCount', type: 'range', min: 100, max: 15000, step: 50 },
      { key: 'particleSteps', type: 'range', min: 10, max: 1000, step: 10 },
      { key: 'windScale', type: 'range', min: 0, max: 30, step: 0.2 },
      { key: 'windForce', type: 'range', min: 0, max: 30, step: 1 },
      { key: 'sections', type: 'range', min: 1, max: 30, step: 1 },
      { key: 'sectionRotation', type: 'range', min: 0, max: 6.2, step: 0.1 },
    ]}
  />
);
