import { tinycolor } from '@thebespokepixel/es-tinycolor';
import tinygradient from 'tinygradient';

import Draw from '../../draw';
import Layout from '../../draw/layouts';
import Symmetry from '../../draw/symmetry';

import RandomWave from '../../data/RandomWave';
import { line } from '../../data';
import Vec2 from '../../data/Vec2';
import { repeat } from '../../utils';

export const options = () => ({
  // title: '',
  // pallete: null,
  // fullscreen: true,
  width: 2048,
  height: 2048,
  blend: 'lighten',
});

export const sketch = ({ context, rng, pallete, meta, canvas }) => {
  const { rect, circle, path } = Draw(context);
  const layout = Layout(context);
  const sym = Symmetry(context);

  // Uncomment a fill or add a different one to set a background. Default is transparent.

  // const foreground = '#369920';
  const foreground = pallete.colors[0];
  const background = pallete.colors[1];
  const gradient = tinygradient(['#f00', '#0f0', '#00f']);
  rect({
    width: canvas.width,
    height: canvas.height,
    // fill: tinycolor('hsv(25,8%,95%)').toRgbString(),
    // fill: background.value().toRgbString(),
    fill: '#eee',
    fill: '#191919',
  });

  // Move 0,0 to the canvas center:
  // context.translate(canvas.width / 2, canvas.height / 2);

  const draw = (width, height) => {
    // Add draw stuff here, run it at the end of the sketch method or in a repeating layout.

    const steps = 1000;
    const layers = 30;
    const maxHeight = height / 2 / 1;
    const lines = 50;

    const lineColors = gradient.rgb(lines);

    repeat(lines, lineIndex => {
      const maxFreq = rng.float(2, 3);
      // const baseY =
      //   (canvas.height / lines) * lineIndex + canvas.height / lines / 2;
      const baseY = height / 2;
      const heights = RandomWave(rng, { steps, layers, maxFreq });
      const positions = line(steps);

      const wavePath = [
        { x: width, y: height },
        { x: 0, y: height },
        ...positions.map((pos, index) =>
          Vec2(pos * width, heights[index] * maxHeight + baseY),
        ),
      ];

      const fill = lineColors[lineIndex];

      path({
        path: wavePath,
        close: true,
        fill: fill,
      });
    });
  };

  draw(canvas.width, canvas.height);
  // layout.grid(4, 4, draw);
};
