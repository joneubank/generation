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
    rotations,
    steps,
    blobsMin,
    blobsMax,
    spiralRadiusMax,
    spiralRadiusMin,
    spiralOriginOffsetMax,
    pathRadius,
  } = params;

  const blobs = rng.int(blobsMin, blobsMax);
  const lengthOctaves = 4;
  const lengthStepSize = 4 / lengthOctaves;
  const lengthNoise = perlin(rng.next(), lengthOctaves);

  const originWave = RandomWave(rng, { layers: 8 });

  // Uncomment a fill or add a different one to set a background. Default is transparent.
  rect({
    width: canvas.width,
    height: canvas.height,
    fill: '#191919',
    fill: '#eee',
  });

  // Move 0,0 to the canvas center:
  // context.translate(canvas.width / 2, canvas.height / 2);
  // context.rotate(rng.float(0, Math.PI * 2));
  // context.translate(0, canvas.height / 2);

  const makeWheel = () => {
    return {
      multiple: 2,
      size: 100,
    };
  };
  const wheels = array(0, 1).map(makeWheel);
  const spiralOrigin = (ratio) => {
    const multiples = [2];
    // const wheels.forEach
    const output = Vec2(0, 1)
      .rotate(ratio * Math.PI * 2)
      .scale(pathRadius);
    return output;
  };
  const draw = (width, height) => {
    const CENTER = Vec2(width / 2, height / 2);

    const offset = rng.float(0, Math.PI * 2);

    // Add draw stuff here, run it at the end of the sketch method or in a repeating layout.
    const points = array(0, steps).map((step) => {
      const ratio = step / steps;
      const noisePos = Vec2(2, 0)
        .rotate(rotations * ratio * Math.PI * 2)
        .add(Vec2(2, 2));
      const noiseFactor = lengthNoise(noisePos.x, noisePos.y) * 2;
      const radius =
        Math.pow(Math.sin(ratio * Math.PI * blobs + offset), 2) *
          (spiralRadiusMax - spiralRadiusMin) *
          noiseFactor +
        spiralRadiusMin;

      const spiralOriginOffset = Vec2(
        0,
        originWave.at(Math.PI * 2 * ratio),
      ).scale(spiralOriginOffsetMax * Math.sin(ratio * Math.PI * 2));

      const originBase = spiralOrigin(ratio).add(CENTER);
      // const originBase = Vec2(width * ratio, height / 2);
      const origin = originBase.add(spiralOriginOffset);

      return Vec2(0, 1)
        .rotate(rotations * Math.PI * 2 * ratio)
        .scale(radius)
        .add(origin);
    });

    path({
      points,
      stroke: '#000',
      stroke: pallete.next().value().setAlpha(0.7).toRgbString(),
      strokeWidth: 3,
      close: true,
    });
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
      rotations: 1000,
      blobsMin: 13,
      blobsMax: 20,
      steps: 50000,
      spiralRadiusMax: 320,
      spiralRadiusMin: 75,
      spiralOriginOffsetMax: 0,
      pathRadius: 600,
    }}
  />
);
