import Draw from '../draw';

export const options = () => ({
  // title: '',
  // pallete: null,
  // fullscreen: true,
  width: 2000,
  height: 2000,
});

export const sketch = ({ context, rng, pallete, meta, canvas }) => {
  const { rect, circle, path } = Draw(context);

  rect({
    x: 0,
    y: 0,
    width: canvas.width,
    height: canvas.height,
    fill: '#fff',
  });

  // a spirograph line is a combination of multiple spinners

  const spinner = () => {};
};
