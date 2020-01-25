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

const draw = ({ context, pallete, rng, canvas }) => {
  const { rect, circle, path } = Draw(context);
  // const layout = Layout(context);
  const sym = Symmetry(context);

  // Uncomment a fill or add a different one to set a background. Default is transparent.
  rect({
    width: canvas.width,
    height: canvas.height,
    // fill: tinycolor('hsv(25,8%,95%)').toRgbString(),
    // fill: '#191919',
    // fill: '#eee',
  });

  const circleRingBackground = () => {
    const baseColor = pallete
      .next()
      .value()
      .toRgbString();
    const gradient = tinygradient([
      { color: baseColor, pos: 0 },
      { color: tinycolor('hsv(25,8%,95%)').toRgbString(), pos: 1 },
    ]);
    const baseRadius =
      Math.sqrt(
        ((canvas.height / 2) * canvas.height) / 2 +
          ((canvas.width / 2) * canvas.width) / 2,
      ) + 1;

    const layers = 7;
    const divisions = line(layers + 1);

    divisions.reverse().forEach(i => {
      const fill = gradient.rgbAt(i);
      circle({ x: 0, y: 0, fill, radius: baseRadius * i + 500 });
    });
  };

  // Move 0,0 to the canvas center:
  context.translate(canvas.width / 2, canvas.height / 2);

  const arcs = rng.int(13, 34);

  const mouthPad = rng.int(50, 100);
  const mouthLength = Math.min(canvas.width, canvas.height);
  const mouths = 1;

  const mouthColor = rng
    .chooseOne(pallete.colors)
    .value()
    .toRgbString();

  const shapeCount = 50; // rng.int(50, 75);
  const shapeEdgeBuffer = 0.1;

  const draw = seed => () => {
    const rotateAngle = 0; //rng.float(0, Math.PI / 4);
    context.rotate(rotateAngle);
    const rand = Random(seed);
    // Add draw stuff here, run it at the end of the sketch method or in a repeating layout.
    const arcRads = (2 * Math.PI) / arcs;
    // repeat(mouths, i =>
    // const i = 1;
    // path({
    //   points: [
    //     { x: mouthLength + mouthPad * i, y: mouthPad * i },
    //     { x: mouthPad * i, y: mouthPad * i },
    //     polarToVec2(arcRads, mouthLength + mouthPad * i).add({
    //       x: mouthPad * i,
    //       y: mouthPad * i,
    //     }),
    //   ],
    //   close: false,
    //   stroke: mouthColor,
    //   strokeWidth: 15,
    // });
    // );

    const drawShape = () => {
      const maxDistance = Math.min(canvas.width, canvas.height) / 1.5;
      const angle = rand.float(
        arcRads * shapeEdgeBuffer,
        arcRads * (1 - shapeEdgeBuffer),
      );
      const distance = rand.float(mouthPad, maxDistance, x => 1 - Math.sqrt(x));

      const circleShape = () => {
        const radius = Math.max(
          1,
          rand.fuzzy((80 * distance) / maxDistance, 1),
        );
        const filled = rand.bool(0.5);
        const stroked = rand.bool(0.4);
        const color = rand
          .chooseOne(pallete.colors)
          .value()
          .toRgbString();
        circle({
          ...polarToVec2(angle, distance).add({ x: 0, y: mouthPad }),
          fill: filled ? color : null,

          stroke: stroked || !filled ? color : null,
          strokeWidth: (50 * distance) / maxDistance,
          radius,
        });
      };

      const hLineShape = () => {
        const segments = rand.int(5, 9);
        const lineLength = rand.float(0.2, 0.6) * arcRads;
        path({
          points: line(segments).map(i =>
            polarToVec2(
              i * lineLength + rand.float(0.2, arcRads - lineLength) - 0.1,
              rand.fuzzy(distance, (100 * distance) / maxDistance),
            ).add({ x: 0, y: mouthPad }),
          ),
          strokeWidth: 10,
          stroke: rand
            .chooseOne(pallete.colors)
            .value()
            .toRgbString(),
        });
      };

      const vLineShape = () => {
        const segments = rand.int(5, 9);
        const lineLength = rand.float(0.2, 0.6) * arcRads;
        path({
          points: line(segments).map(i =>
            polarToVec2(
              i * lineLength + rand.float(0.2, arcRads - lineLength) - 0.1,
              rand.fuzzy(distance, (100 * distance) / maxDistance),
            ).add({ x: 0, y: mouthPad }),
          ),
          strokeWidth: 10,
          stroke: rand
            .chooseOne(pallete.colors)
            .value()
            .toRgbString(),
        });
      };

      const choice = rand.next();
      switch (true) {
        case choice < 0.3:
          hLineShape();
          break;
        default:
          circleShape();
      }
    };

    repeat(shapeCount, drawShape);
    context.rotate(-rotateAngle);
  };
  circleRingBackground();
  sym.arc(draw(rng.next()), arcs);
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
  />
);
