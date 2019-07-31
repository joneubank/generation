import { tinycolor } from '@thebespokepixel/es-tinycolor';

import { simplex, perlin } from '../data/noise';
import Draw from '../draw';
import Layout from '../draw/layouts';

import { grid, line } from '../data';
import Vec2, { polarToVec2 } from '../data/Vec2';
import { repeat } from '../utils';

export const options = () => ({
  // title: '',
  // pallete: null,
  fullscreen: false,
  width: 2048,
  height: 2048,
});

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
    const vecToScreen = ({ x, y }) => {
      const xAdjust = (width - width * scale) / 2;
      const yAdjust = (height - height * scale) / 2;
      return {
        x: x * width * scale + xAdjust,
        y: y * height * scale + yAdjust,
      };
    };

    const n = 39;
    const scale = 1;

    const octaves = 8;
    const stepSize = 80 / octaves / n;
    const angleNoise = perlin(rng.next(), octaves);
    const strengthNoise = perlin(rng.next(), octaves);
    const angleDensity = 8;

    const strengthFactor = stepSize / 40;
    const minStrength = stepSize / 40;

    const renderChance = 0.5;

    const moveSteps = 100;

    const movePoint = ({ x, y }) => {
      return polarToVec2(
        angleNoise(x * stepSize, y * stepSize) * Math.PI * 2 * angleDensity,
        strengthFactor * strengthNoise(x * stepSize, y * stepSize) +
          minStrength,
      ).add(Vec2(x, y));
    };

    const points = 1500;
    // const randomPoints = line(points).forEach(point => {
    const randomPoints = grid(n, n).forEach(({ u, v }) => {
      if (!rng.bool(renderChance)) {
        return;
      }
      // repeat(points, i => {
      // const randomPoint = Vec2(rng.next(), rng.next());
      // const randomPoint = Vec2(0.5, 0.5);

      // FOR LINES
      // const randomPoint = Vec2(
      //   rng.fuzzy(point, 0.025),
      //   // Math.sin(rng.fuzzy(point, 0.025) * Math.PI * 2) / 2 + 0.5,
      //   rng.fuzzy(0.5, 0.025),
      // );

      // FOR GRID
      // const randomPoint = Vec2(rng.fuzzy(u, 0.01), rng.fuzzy(v, 0.01));
      const randomPoint = Vec2(u, v);

      const pointPath = [randomPoint];
      let lastPoint = randomPoint;
      repeat(moveSteps, i => {
        lastPoint = movePoint(lastPoint);
        pointPath.push(lastPoint);
      });

      path({
        path: pointPath
          // .map(({ x, y }) => ({
          //   x: x + rng.fuzzy(0, 0.001),
          //   y: y + rng.fuzzy(0, 0.001),
          // }))
          .map(vecToScreen),
        strokeWidth: 10,
        stroke: rng
          .chooseOne(pallete.colors)
          .value()
          .lighten(rng.fuzzy(10, 10))
          .toRgbString(),
      });
      // circle({ ...vecToScreen(randomPoint), radius: 10, fill: 'red' });
    });

    // Below section for visualizing the noise field
    const noiseFieldPoints = grid(n, n);
    noiseFieldPoints.forEach(({ u, v }) => {
      const root = Vec2(u, v);
      const target = polarToVec2(
        angleNoise(u * stepSize, v * stepSize) * Math.PI * 2 * angleDensity,
        strengthFactor * strengthNoise(u * stepSize, v * stepSize) +
          minStrength,
      ).add(root);
      // path({
      //   path: [vecToScreen(root.obj), vecToScreen(target.obj)],
      //   strokeWidth: 5,
      //   stroke: '#aaa',
      // });
      // circle({ ...vecToScreen(root.obj), radius: 5, fill: 'blue' });
    });

    // Add draw stuff here, run it at the end of the sketch method or in a repeating layout.
  };

  draw(canvas.width, canvas.height);
  // layout.grid(4, 4, draw);
};
