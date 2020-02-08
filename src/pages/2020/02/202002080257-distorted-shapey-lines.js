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
import Random, { distributions } from '../../../random';

const draw = ({ context, pallete, rng, canvas, params }) => {
  const { rect, circle, path } = Draw(context);
  const layout = Layout(context);
  const sym = Symmetry(context);

  const {
    lines,
    steps,
    shapeMin,
    shapeMax,
    shapeMinAngle,
    gradientStepsMin,
    gradientStepsMax,
    gradientColorsMin,
    gradientColorsMax,
    shapeScale,
    outline,
    lineMinAngle,
    lineMaxAngle,
    minLayers,
    maxLayers,
  } = params;

  // Uncomment a fill or add a different one to set a background. Default is transparent.
  rect({
    width: canvas.width,
    height: canvas.height,
    fill: '#eee',
    // fill: '#191919',
    fill: pallete.colors[0].rgb(),
  });

  // Move 0,0 to the canvas center:
  context.translate(canvas.width / 2, canvas.height / 2);

  const colors = array(0, rng.int(gradientColorsMin, gradientColorsMax)).map(
    i =>
      pallete
        .next()
        .value()
        .toRgbString(),
  );
  const gradient = tinygradient([
    colors[0],
    ...array(0, rng.int(gradientStepsMin - 1, gradientStepsMax - 1)).map(i =>
      rng.chooseOne(colors),
    ),
    colors[0],
  ]);

  const draw = (width, height) => {
    context.rotate(rng.next() * Math.PI * 2);
    // Add draw stuff here, run it at the end of the sketch method or in a repeating layout.
    let angle = 0;
    const shapeRadius = (Math.min(width, height) / 2) * shapeScale;
    const shapePoints = rng.int(shapeMin, shapeMax);

    const shapeAngles = array(0, shapePoints).map(i => {
      const output = angle;

      const maxAngle = (Math.PI * 2 - angle) / (shapePoints - i - 1);

      // angle = ((Math.PI * 2) / shapePoints) * i;
      angle += rng.float(shapeMinAngle, maxAngle);

      return output;
    });
    console.log(shapeAngles);

    const shape = array(0, shapePoints).map(i => {
      return polarToVec2(shapeAngles[i], shapeRadius);
    });

    const shapePointAtRads = rads => {
      const useRads = rads % (Math.PI * 2);

      const floorAngle = shapeAngles
        .filter(angle => angle <= useRads)
        .slice(-1)[0];

      const segment = shapeAngles.indexOf(floorAngle);
      const nextSegment = segment === shapePoints - 1 ? 0 : segment + 1;
      console.log('segments', segment, nextSegment);

      const root = shape[segment];
      const target = shape[nextSegment];

      const dx = target.x - root.x;
      const dy = target.y - root.y;

      const nextAngle =
        segment === shapePoints - 1 ? Math.PI * 2 : shapeAngles[nextSegment];

      const ratio =
        (useRads - shapeAngles[segment]) / (nextAngle - shapeAngles[segment]);
      console.log('ratio', useRads, shapeAngles[segment], nextAngle, ratio);

      return Vec2(dx * ratio, dy * ratio).add(root);
    };

    if (outline) {
      path({
        points: shape,
        stroke: pallete.next().rgb(),
        strokeWidth: 3,
        close: true,
      });
    }

    const segmentLines = Math.floor(lines / shapePoints);
    // repeat(shapePoints, segment => {
    //   repeat(segmentLines, i => {
    //     // We neeed the point at i/segmentLines between shapePoints[segment] and shapePoints[segment+1]
    //     // Note: due to circular nature of this we need to check for the last loop
    //     const ratio = i / segmentLines;
    //     const root = shape[segment];
    //     const nextSegment = segment === shapePoints - 1 ? 0 : segment + 1;
    //     const target = shape[nextSegment];

    //     const dx = target.x - root.x;
    //     const dy = target.y - root.y;

    //     const start = Vec2(dx * ratio, dy * ratio).add(root);
    //     const end = start.scale(-1);

    //   });
    // });
    const jumpAngle = rng.float(lineMinAngle, lineMaxAngle);
    const shuffledLines = rng.shuffle(array(0, lines));

    const wave = RandomWave(rng);

    const distortAmount = rng.int(2, 20);
    const distort = point => {
      return point.add(
        Vec2(
          // (wave.at((point.y * 2 * Math.PI) / height) * width) / distortAmount,
          0,
          (wave.at((point.x * 2 * Math.PI) / width) * height) / distortAmount,
        ),
      );
    };

    repeat(lines, x => {
      const i = shuffledLines[x];
      const rads = (i * Math.PI * 2) / lines;
      const start = shapePointAtRads(rads);
      const end = shapePointAtRads(rads + jumpAngle);

      const dx = end.x - start.x;
      const dy = end.y - start.y;
      const points = array(0, steps + 1).map(step => {
        const ratio = step / steps;
        return distort(
          Vec2(dx, dy)
            .scale(ratio)
            .add(start),
        );
      });

      path({
        // points: [start, end],
        points,
        stroke: gradient.rgbAt(rads / Math.PI / 2),
        strokeWidth: 3,
      });
    });
  };

  repeat(rng.int(minLayers, maxLayers), i => draw(canvas.width, canvas.height));
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
      lines: 300,
      steps: 200,
      shapeMin: 3,
      shapeMax: 13,
      gradientStepsMin: 5,
      gradientStepsMax: 12,
      gradientColorsMin: 3,
      gradientColorsMax: 3,
      shapeScale: 0.95,
      shapeMinAngle: (Math.PI * 2) / 8,
      lineMinAngle: 0.45 * Math.PI * 2,
      lineMaxAngle: 0.55 * Math.PI * 2,
      minLayers: 1,
      maxLayers: 1,

      outline: false,
    }}
  />
);
