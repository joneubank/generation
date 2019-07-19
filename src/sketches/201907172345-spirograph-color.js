import Draw from '../draw';
import Vec2, { polarToVec2 } from '../data/Vec2';
import Spinner from '../data/Spinner';
import { repeat } from '../utils';
import { tinycolor } from '@thebespokepixel/es-tinycolor';

/* This is extremely slow because of the bad method used for coloring a line in segments
Run at your own risk! */

export const options = () => ({
  // title: 'upset seat hotel',
  // pallete: 'far network tomatoes',
  // fullscreen: true,
  width: 2000,
  height: 2000,
});

export const sketch = ({ context, rng, pallete, meta, canvas }) => {
  const { rect, circle, path, colorPath } = Draw(context);

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
  const sinDivisor = (rng.int(1, 5) * basePeriod) / 4;
  const bigRad = 600;

  const innerRadius = rng.int(1, 19) * 20;
  const innerPeriod = rng.int(2, 9) * basePeriod;

  const spinners = [
    // new Spinner(200, rng.float(0, Math.PI * 2), 1000),
    // new Spinner(innerRadius, rng.float(0, Math.PI * 2), innerPeriod),
    // new Spinner(rng.int(150, 250), 0, rng.int(2, 7) * basePeriod),
    new Spinner(rng.int(150, 350) / 2, 0, rng.int(2, 5) * basePeriod),
    new Spinner(
      25,
      rng.float(0, Math.PI * 2),
      (rng.int(1, 3) * basePeriod) / 2,
    ),
    // new Spinner(
    //   200,
    //   0,
    //   rng.int(2, 5) * cosDivisor,
    //   (time, spinner) =>
    //     (spinner.r = (bigRad / 1) * Math.cos(spinner.phase / cosDivisor)),
    // ),
    new Spinner(
      100,
      (rng.int(1, 8) * Math.PI) / 2,
      rng.int(2, 5) * sinDivisor,
      (time, spinner) =>
        (spinner.r = (bigRad / 1) * Math.sin(spinner.phase / sinDivisor)),
    ),
    // new Spinner(30, 0, 1000),
  ];

  const steps = 50000;
  const timeStep = 1;
  const drawPath = [];
  const color = rng.chooseOne(pallete.colors).value();

  repeat(steps, i => {
    spinners.forEach(s => s.update(timeStep));
    const nextPoint = spinners.reduce(
      (output, s) => output.add(s.vector()),
      Vec2(0, 0),
    );
    drawPath.push({
      ...nextPoint.obj,
      strokeWidth: 3,
      stroke: tinycolor({
        ...color.toHsv(),
        v: Math.max((i / steps) * 100, 1.01),
      })
        // .setAlpha(1)
        .toRgbString(),
    });
  });

  colorPath({ path: drawPath, close: false, stroke: '#333', strokeWidth: 2 });
  // path({ path: drawPath, close: false, stroke: '#333', strokeWidth: 2 });
};
