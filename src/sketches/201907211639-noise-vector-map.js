import { tinycolor } from '@thebespokepixel/es-tinycolor';
import * as tumult from 'tumult';

import Draw from '../draw';
import Layout from '../draw/layouts';

import { grid } from '../data';
import Vec2, { polarToVec2 } from '../data/Vec2';

const SQRT2 = Math.sqrt(1 / 2);

export const options = () => ({
  // title: '',
  // pallete: null,
  // fullscreen: true,
  width: 2048,
  height: 2048,
});

const normalizeNoise = (noise, octaves) => (x, y) =>
  Math.min(
    1,
    Math.max(0, (noise.octavate(octaves, x, y) + SQRT2) / (2 * SQRT2)),
  );

const transformNoise = noise => (x, y) => noise(x, y); //Math.sin(noise(x, y));

export const sketch = ({ context, rng, pallete, meta, canvas }) => {
  const { rect, circle, path } = Draw(context);
  const layout = Layout(context);

  // Uncomment a fill or add a different one to set a background. Default is transparent.
  rect({
    width: canvas.width,
    height: canvas.height,
    // fill: tinycolor('hsv(25,8%,95%)').toRgbString(),
    fill: '#191919',
    // fill: '#eee',
  });

  // Move 0,0 to the canvas center:
  // context.translate(canvas.width / 2, canvas.height / 2);

  const draw = (width, height) => {
    const n = 89;
    const scale = 0.9;

    const octaves = 3;
    const stepSize = 4 / octaves;
    const angleNoise = transformNoise(
      normalizeNoise(new tumult.Simplex2(rng.next()), octaves),
    );
    const strengthNoise = normalizeNoise(
      new tumult.Simplex2(rng.next()),
      octaves,
    );

    const strengthFactor = (width * scale) / n / 2;
    const minStrength = (width * scale) / n / 6;

    const points = grid(n, n);
    const xAdjust = (width - width * scale) / 2;
    const yAdjust = (height - height * scale) / 2;

    points.forEach(({ u, v }) => {
      const root = Vec2(
        u * width * scale + xAdjust,
        v * height * scale + yAdjust,
      );
      const target = polarToVec2(
        angleNoise(u * stepSize, v * stepSize) * Math.PI * 2,
        strengthFactor * strengthNoise(u * stepSize, v * stepSize) +
          minStrength,
      ).add(root);
      path({ path: [root, target], strokWidth: 3, stroke: '#eee' });
      // circle({
      //   x: u * width * scale + xAdjust,
      //   y: v * height * scale + yAdjust,
      //   radius:
      //     baseRadius *
      //     Math.max(
      //       0,
      //       1 + simplex2.octavate(octaves, u * stepSize, v * stepSize),
      //     ),
      //   fill: '#777',
      // });
    });

    // Add draw stuff here, run it at the end of the sketch method or in a repeating layout.
  };

  draw(canvas.width, canvas.height);
  // layout.grid(4, 4, draw);
};
