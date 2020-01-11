import Draw from '../draw';
import { repeat } from '../utils';

export const options = () => ({
  // title: '',
  // pallete: 'intimate rent discs',
  // fullscreen: true,
  width: 1080,
  height: 1080,
});

const opacity = 0.2;
const minShift = 200;
const maxShift = 300;

// Original settings, more vertical style bars
// const opacity = 0.5;
// const minShift = 25;
// const maxShift = 150;

// Multiple passes goes crazy, use low opacity (<0.2) and bigger shifts (>300)
const passes = 1;

export const sketch = ({ context, rng, pallete, meta, canvas }) => {
  const { rect, circle, path } = Draw(context);

  rect({
    x: 0,
    y: 0,
    width: canvas.width,
    height: canvas.height,
    fill: '#fff',
  });

  repeat(passes, i => {
    let topMax = 0;
    let bottomMax = 0;
    while (topMax < canvas.width || bottomMax < canvas.width) {
      const topMin = topMax - rng.int(minShift, maxShift);
      const bottomMin = bottomMax - rng.int(minShift, maxShift);
      topMax = topMax + rng.int(-minShift, maxShift);
      bottomMax = bottomMax + rng.int(-minShift, maxShift);
      path({
        path: [
          { x: topMin, y: 0 },
          { x: topMax, y: 0 },
          { x: bottomMax, y: canvas.height },
          { x: bottomMin, y: canvas.height },
        ],
        close: true,
        fill: rng
          .chooseOne(pallete.colors)
          .value()
          .setAlpha(opacity)
          .toRgbString(),
      });

      // bottomLast = canvas.width + 1;
    }
  });
};
