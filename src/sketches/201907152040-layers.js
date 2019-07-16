import Draw from '../draw';

export const options = () => ({
  // title: '',
  // pallete: 'intimate rent discs',
  // fullscreen: true,
  // width: null,
  // height: null,
});

const opacity = 0.4;
// const count = 10;
const minShift = 150;
const maxShift = 200;

export const sketch = ({ context, rng, pallete, meta, canvas }) => {
  const { rect, circle, path } = Draw(context);

  rect({
    x: 0,
    y: 0,
    width: canvas.width,
    height: canvas.height,
    fill: '#fff',
  });

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
};
