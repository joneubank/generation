import Draw from '../../draw';
import { line } from '../../data';

export const options = () => ({
  // pallete: 'intimate rent discs',
  fullscreen: false,
  width: 1200,
  height: 600,
});

export const sketch = ({ context, rng, pallete, meta, canvas }) => {
  // PALLETE ONLY HACK:
  console.log(pallete);
  meta.title = pallete.name;
  document.title = pallete.name;

  const { rect } = Draw(context);
  const height = canvas.height;
  const width = canvas.width;

  const count = pallete.colors.length;

  const bannerHeight = 140;

  rect({
    x: 0,
    y: canvas.height - bannerHeight,
    width: canvas.width,
    height: canvas.height,
    fill: '#333',
  });
  context.font = 'bold 48px Helvetica';
  context.fillStyle = '#eee';
  context.fillText(pallete.name, 30, canvas.height - 55);

  const positions = line(pallete.colors.length + 1);

  pallete.colors
    .sort((a, b) => b.value().toHsv().v - a.value().toHsv().v)
    .forEach((color, index) => {
      rect({
        x: positions[index] * canvas.width,
        width: canvas.width / pallete.colors.length,
        height: canvas.height - bannerHeight,
        fill: color.value().toRgbString(),
      });
      context.font = '18px Helvetica';
      context.fillStyle = color
        .inverse()
        // .darken(33)
        // .desaturate(45)
        .toRgbString();

      context.fillText(
        `${color.value().toHex8String()}`,
        positions[index] * canvas.width + 20,
        canvas.height - bannerHeight - 60,
      );
      context.fillText(
        `${color.name}`,
        positions[index] * canvas.width + 20,
        canvas.height - bannerHeight - 35,
      );
    });
  rect({ width: canvas.width, height: 25, fill: 'rgba(0,0,0,0.15' });
};
