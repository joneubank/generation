import { tinycolor } from '@thebespokepixel/es-tinycolor';

import Draw from '../draw';
import Layout from '../draw/layouts';

export const options = () => ({
  // title: '',
  // pallete: null,
  // fullscreen: true,
  // width: 2048,
  // height: 2048,
});

export const sketch = ({ context, rng, pallete, meta, canvas }) => {
  const { rect, circle, path } = Draw(context);
  const layout = Layout(context);

  // Uncomment a fill or add a different one to set a background. Default is transparent.
  rect({
    width: canvas.width,
    height: canvas.height,
    // fill: tinycolor('hsv(25,8%,95%)').toRgbString(),
    // fill: '#191919',
    // fill: '#eee',
  });

  // Move 0,0 to the canvas center:
  // context.translate(canvas.width / 2, canvas.height / 2);

  const draw = (width, height) => {
    // Add draw stuff here, run it at the end of the sketch method or in a repeating layout.
  };

  draw(canvas.width, canvas.height);
  // layout.grid(4, 4, draw);
};
