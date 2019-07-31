import { tinycolor } from '@thebespokepixel/es-tinycolor';
import * as tumult from 'tumult';

import Draw from '../draw';
import Layout from '../draw/layouts';

import { grid } from '../data';

export const options = () => ({
  // title: '',
  // pallete: null,
  // fullscreen: true,
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
    const n = 189;
    const scale = 0.9;

    const octaves = 3;
    //Library limitation is the .octavate(octaves, x, y) method has a max value for x and y that is ~10/octaves
    // we use 8/octaves just to ensure we dont bump into that limit
    const stepSize = 4 / octaves;
    const simplex2 = new tumult.Simplex2(rng.next());

    const baseRadius = (width * scale) / n / 4;

    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        console.log(simplex2.octavate(octaves, x * stepSize, y * stepSize));
      }
    }

    const points = grid(n, n);
    const xAdjust = (width - width * scale) / 2;
    const yAdjust = (height - height * scale) / 2;

    points.forEach(({ u, v }) => {
      circle({
        x: u * width * scale + xAdjust,
        y: v * height * scale + yAdjust,
        radius:
          baseRadius *
          Math.max(
            0,
            1 + simplex2.octavate(octaves, u * stepSize, v * stepSize),
          ),
        fill: '#777',
      });
    });

    // Add draw stuff here, run it at the end of the sketch method or in a repeating layout.
  };

  draw(canvas.width, canvas.height);
  // layout.grid(4, 4, draw);
};
