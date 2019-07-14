import Draw from '../draw';
import { points } from '../data';
export const options = () => ({
  title: null,
  pallete: 'sexual faith bikes',
  fullscreen: true,
  width: null,
  height: null,
});
const distributions = {
  uniform: () => x => x,
  power: n => x => {
    if (n >= 0) {
      return Math.pow(x, n);
    } else {
      return 1 - 1 / Math.pow(x, -n);
    }
  },
  normal: ({ mean = 0.5, variance = 1 } = {}) => x => mean,
  sin: (phase = 0, period = 1) => x =>
    (Math.sin(x * Math.PI * 2 * period + phase) + 1) / 2,
  cos: (phase = 0, period = 1) => x =>
    (Math.cos(x * Math.PI * 2 * period + phase) + 1) / 2,
};

const count = 10000;
const vPos = 0.5;
const radius = 3;
const imageScale = 1;
const distribution = distributions.sin(1 + Math.PI / 2, 0.5);

export const sketch = ({ context, rng, pallete, meta, canvas }) => {
  const { circle } = Draw(context);

  const background = pallete.colors[0].value();
  context.fillStyle = background.toRgbString();
  context.fillRect(0, 0, canvas.width, canvas.height);

  const L = points(count);
  const y = canvas.height * vPos;
  const color = pallete.colors[0].inverse();
  const color2 = pallete.colors[0].inverse().darken(20);
  const color3 = pallete.colors[0].value(0).darken(40);

  context.translate(
    (canvas.width - canvas.width * imageScale) / 2,
    (canvas.height - canvas.height * imageScale) / 2,
  );

  const xStep = canvas.width * imageScale;
  const yStep = canvas.height * imageScale;

  L.forEach(x => {
    circle({
      x: x * xStep,
      // y: rng.next(distrobutions.power(50)) * canvas.height * imageScale,
      y: rng.next(distribution) * canvas.height * imageScale,
      radius,
      fill: color.toRgbString(),
    });
  });
  L.forEach(x => {
    circle({
      x: x * xStep,
      // y: rng.next(distrobutions.power(50)) * canvas.height * imageScale,
      y: distribution(x) * canvas.height * imageScale,
      radius,
      fill: color3.toRgbString(),
    });
  });
};
