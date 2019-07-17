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

  context.translate(canvas.width / 2, canvas.height / 2);
  // circle({ x: 0, y: 0, radius: 2, fill: 'red' });

  // a spirograph line is a combination of multiple spinners

  // function Spinner(r, phase, period, update = time => {}) {
  //   this.phase = phase;
  //   this.r = r;
  //   this.period = period;

  //   this.update = function(time) {
  //     update(time, this);
  //     this.phase += (time / period) * Math.PI * 2;
  //     return this.vector();
  //   };

  //   this.vector = () => polarToVec2(this.phase, this.r);
  // }

  const basePeriod = 100;

  const cosDivisor = rng.int(1, 5) * basePeriod;
  const sinDivisor = rng.int(1, 5) * basePeriod;
  const bigRad = rng.int(200, 400);

  const spinners = [
    // new Spinner(
    //   200,
    //   0,
    //   rng.int(2, 5) * cosDivisor,
    //   (time, spinner) =>
    //     (spinner.r = (bigRad / 2) * Math.cos(spinner.phase / cosDivisor)),
    // ),
    new Spinner(100, 0, rng.int(2, 5) * basePeriod * 3),
    new Spinner(rng.int(100, 250), 0, rng.int(2, 5) * basePeriod * 2),
    new Spinner(rng.int(50, 150) / 2, 0, rng.int(2, 5) * basePeriod),
    new Spinner(rng.int(50, 150) / 2, 0, rng.int(2, 5) * basePeriod),
    // new Spinner(25, Math.PI / 2, (rng.int(1, 3) * basePeriod) / 2),
    // new Spinner(
    //   100,
    //   (rng.int(1, 8) * Math.PI) / 2,
    //   rng.int(2, 5) * sinDivisor,
    //   (time, spinner) =>
    //     (spinner.r = (bigRad / 1) * Math.sin(spinner.phase / sinDivisor)),
    // ),
    // new Spinner(30, 0, 1000),
  ];

  const steps = 120000;
  const timeStep = 1;
  const drawPath = [];

  repeat(steps, i => {
    spinners.forEach(s => s.update(timeStep));
    const nextPoint = spinners.reduce(
      (output, s) => output.add(s.vector()),
      Vec2(0, 0),
    );
    drawPath.push(nextPoint);
  });

  path({ path: drawPath, stroke: '#333', strokeWidth: 2, close: false });
};
