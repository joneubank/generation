import Draw from '../../draw';
import { line } from '../../data';
import { distributions } from '../../random';
export const options = () => ({
  title: null,
  pallete: 'sexual faith bikes',
  fullscreen: true,
  width: null,
  height: null,
});

const count = 30000;
const radius = 3;
const imageScale = 1;
const distribution = distributions.power(0.2);

export const sketch = ({ context, rng, pallete, meta, canvas }) => {
  const { circle } = Draw(context);

  const background = pallete.colors[0].value();
  context.fillStyle = background.toRgbString();
  context.fillRect(0, 0, canvas.width, canvas.height);

  const L = line(count);
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
