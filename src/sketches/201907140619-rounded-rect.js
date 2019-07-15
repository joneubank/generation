import Draw from '../draw';

export const options = () => ({
  title: null,
  pallete: null,
  fullscreen: true,
  width: null,
  height: null,
});

const cornerRadius = 30;
const rectWidth = 800;
const rectHeight = 1200;

export const sketch = ({ context, rng, pallete, meta, canvas }) => {
  const { rect } = Draw(context);

  rect({
    width: canvas.width,
    height: canvas.height,
    fill: pallete.colors[1]
      .value()
      .desaturate(25)
      .lighten(20)
      .toRgbString(),
  });

  context.translate(
    (canvas.width - rectWidth) / 2,
    (canvas.height - rectHeight) / 2,
  );

  // const c1 = '#000';
  const c1 = pallete.colors[0].value().toRgbString();

  rect({
    width: rectWidth,
    height: rectHeight,
    fill: pallete.colors[1].value().toRgbString(),
    stroke: c1,
    strokeWidth: 10,
    round: 50,
    corners: {
      // topLeft: 10,
      topRight: 700,
    },
  });
};
