import Draw from '../draw';
import Vec2, { polarToVec2 } from '../data/Vec2';
import Spinner from '../data/Spinner';
import { repeat } from '../utils';

export const options = () => ({
  // title: '',
  // pallete: null,
  // fullscreen: true,
  width: 1200,
  height: 1200,
});

export const sketch = ({ context, rng, pallete, meta, canvas }) => {
  const { rect, circle, path } = Draw(context);

  rect({
    x: 0,
    y: 0,
    width: canvas.width,
    height: canvas.height,
    fill: '#eee',
  });

  const spiralRate = 3000;

  context.translate(canvas.width / 2, canvas.height / 2);

  const basePeriod = 100;
  const r1 = rng.int(150, 350);
  const r2 = rng.int(150, 350);
  const r3 = rng.int(150, 350);
  const r4 = rng.int(150, 350);

  const spinners = [
    // new Spinner(1, 0, rng.int(2, 5) * basePeriod, (time, spinner) => {
    //   spinner.r = (spinner.age * canvas.width) / spiralRate;
    // }),
    new Spinner(r1, 0, rng.int(2, 6) * basePeriod),
    // new Spinner(r2, rng.float(0, Math.PI), rng.int(2, 6) * basePeriod),
    new Spinner(r3, 0, rng.int(2, 6) * basePeriod),
    new Spinner(r4, 0, rng.int(2, 6) * basePeriod),
  ];

  const steps = 15000;
  const timeStep = 1;
  const drawPath = [];

  const pathPoint = () =>
    spinners.reduce((output, s) => output.add(s.vector()), Vec2(0, 0));

  // drawPath.push(pathPoint());

  let age = 0;
  repeat(steps, i => {
    age += timeStep;
    spinners.forEach(s => s.update(timeStep));
    const nextPoint = pathPoint();
    drawPath.push(nextPoint.scale(age / spiralRate));
  });

  path({ path: drawPath, stroke: '#333', strokeWidth: 5, close: false });
};
