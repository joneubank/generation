import { tinycolor } from '@thebespokepixel/es-tinycolor';

import Draw from '../draw';
import Layout from '../draw/layouts';
import { perlin } from '../data/noise';
import { grid } from '../data/index';
import { repeat } from '../utils';

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
    // fill: rng.chooseOne(pallete.colors).rgb(),
  });

  // Move 0,0 to the canvas center:
  // context.translate(canvas.width / 2, canvas.height / 2);

  const draw = (width, height) => {
    // Add draw stuff here, run it at the end of the sketch method or in a repeating layout.

    const n = 55;
    const scale = 0.9;

    const typeOctaves = 2;
    const typeStepSize = 5 / typeOctaves;
    const typeNoise = perlin(rng.next(), typeOctaves);

    const lengthOctaves = 4;
    const lengthStepSize = 4 / lengthOctaves;
    const lengthNoise = perlin(rng.next(), lengthOctaves);

    const angleOctaves = 4;
    const angleStepSize = 4 / angleOctaves;
    const angleNoise = perlin(rng.next(), angleOctaves);

    context.translate((width * (1 - scale)) / 2, (height * (1 - scale)) / 2);

    const minDim = (width * scale) / n / 10;
    grid(n, n).forEach(({ u, v }) => {
      const noiseValue = typeNoise(u * typeStepSize, v * typeStepSize);
      switch (true) {
        case noiseValue < 0.4:
          circle({
            x: u * width * scale,
            y: v * height * scale,
            radius: minDim,
            // fill: pallete.colors[0].rgb,
            fill: '#ccc',
          });
          break;
        case noiseValue < 0.5:
          circle({
            x: u * width * scale,
            y: v * height * scale,
            radius: minDim * 2,
            // fill: pallete.colors[0].rgb,
            fill: '#ccc',
          });
          break;
        default:
          const x = u * width * scale;
          const y = v * height * scale;

          const scaling = lengthNoise(u * lengthStepSize, v * lengthStepSize);
          const rectWidth = minDim * 3;
          const rectHeight = minDim * 15 * scaling + rectWidth;
          context.translate(x, y);

          const angle =
            angleNoise(u * angleStepSize, v * angleStepSize) * Math.PI * 2;
          context.rotate(angle);
          rect({
            round: rectWidth / 1.9,
            x: -rectWidth / 2,
            y: -rectHeight / 2,
            width: rectWidth,
            height: rectHeight,
            // radius:
            //   (Math.min(width, height) / n / 2 - 1) *
            //   typeNoise(u * typeStepSize, v * typeStepSize),
            // // fill: pallete.colors[0].rgb,
            stroke: '#ccc',
            strokeWidth: minDim * 1.5,
          });
          context.rotate(-angle);
          context.translate(-x, -y);
          break;
      }
    });
  };

  draw(canvas.width, canvas.height);
  // layout.grid(4, 4, draw);
};
