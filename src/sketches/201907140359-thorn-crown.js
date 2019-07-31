import { line } from '../data';
import Draw from '../draw';
import { tinycolor } from '@thebespokepixel/es-tinycolor';
import { initial } from 'lodash';

export const options = () => ({
  title: null,
  pallete: null,
  fullscreen: true,
  width: null,
  height: null,
});

const radius = 0.3;
const segments = 100;
const jitter = 0.2;

export const sketch = ({ context, rng, pallete, meta, canvas }) => {
  const { path, rect } = Draw(context);

  const c1 = pallete.colors[0];
  const c2 = pallete.colors[1];
  const c3 = pallete.colors[2];
  const c4 = pallete.colors.length > 3 ? pallete.colors[3] : rng.color();

  rect({
    width: canvas.width,
    height: canvas.height,
    fill: tinycolor('hsv(35,4%,95%)').toRgbString(),
  });

  const r = radius * Math.min(canvas.height, canvas.width);

  const L = line(segments);
  context.translate(canvas.width / 2, canvas.height / 2);
  // circle({
  //   radius: r,
  //   strokeWidth: 19,
  //   stroke: pallete.colors[0].value().toRgbString(),
  // });

  const controlDistance = (4 / 3) * Math.tan(Math.PI / 2 / segments);
  pallete.colors.forEach(color => {
    const circlePoints = L.map(i => {
      const rads = i * 2 * Math.PI;
      const x = r * Math.sin(rads);
      const y = r * Math.cos(rads);
      return { x: rng.fuzzy(x, r * jitter), y: rng.fuzzy(y, r * jitter) };
    });

    path({
      path: initial(circlePoints),
      strokeWidth: 19,
      stroke: color.value().toRgbString(),
      close: true,
    });
  });
};
