import { tinycolor } from '@thebespokepixel/es-tinycolor';
import * as tumult from 'tumult';

import Draw from '../draw';
import Layout from '../draw/layouts';

import { grid, circleSegments, line } from '../data';
import Vec2, { polarToVec2 } from '../data/Vec2';
import { repeat } from '../utils';

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
    // fill: '#191919',
    fill: '#eee',
  });

  // Move 0,0 to the canvas center:
  context.translate(canvas.width / 2, canvas.height / 2);

  const draw = (width, height) => {
    const n = 89;
    const scale = 0.9;

    const octaves = 4;
    const stepSize = 1;
    const angleNoise = transformNoise(
      normalizeNoise(new tumult.Simplex2(rng.next()), octaves),
    );
    const strengthNoise = normalizeNoise(
      new tumult.Simplex2(rng.next()),
      octaves,
    );

    const strengthFactor = 100;
    const minStrength = 0;
    const angleDensity = 2;

    const pathSegments = 500;
    const circleRadius = 500;

    const xAdjust = (width - width * scale) / 2;
    const yAdjust = (height - height * scale) / 2;

    // const noiseyCircle = (xOff, yOff, )

    const noiseyCircle = (xOff = 0, yOff = 0) => {
      const uOff = (xOff + width / 2) / width;
      const vOff = (yOff + height / 2) / height;
      return circleSegments(pathSegments).map(({ u, v }) => {
        const root = Vec2(u * circleRadius, v * circleRadius);
        const target = polarToVec2(
          angleNoise((1.5 + u + uOff) * stepSize, (1.5 + v + vOff) * stepSize) *
            Math.PI *
            2 *
            angleDensity,
          strengthFactor *
            strengthNoise(
              (1.5 + u + uOff) * stepSize,
              (1.5 + v + vOff) * stepSize,
            ) +
            minStrength,
        )
          .add(root)
          .add(Vec2(-0.5 * strengthFactor, -0.5 * strengthFactor))
          .add(Vec2(xOff, yOff));
        return target;
      });
    };

    const movePoint = ({ x, y }) => {
      return polarToVec2(
        angleNoise(x * stepSize, y * stepSize) * Math.PI * 2 * angleDensity,
        strengthFactor * strengthNoise(x * stepSize, y * stepSize) +
          minStrength,
      ).add(Vec2(x, y));
    };

    // Simple circle draw
    //
    // const testCircle = noiseyCircle();
    // path({ path: testCircle, strokeWidth: 5, stroke: '#333', close: true });

    // Cool circle loop:
    //
    const testCircles = circleSegments(1000).map(({ u, v }) => {
      const pathRadius = 300;
      const x = u * pathRadius;
      const y = v * pathRadius;
      return noiseyCircle(x, y);
    });
    testCircles.forEach(testCircle =>
      path({ path: testCircle, strokeWidth: 1, stroke: '#333', close: true }),
    );
  };

  draw(canvas.width, canvas.height);
  // layout.grid(2, 2, draw);
};
