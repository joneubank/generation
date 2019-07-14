export const options = () => ({ pallete: 'heritage installations' });

export const sketch = ({ context, rng, pallete, meta, canvas }) => {
  const height = canvas.height;
  const width = canvas.width;

  const count = pallete.colors.length;

  pallete.colors
    .sort((a, b) => b.value().toHsv().v - a.value().toHsv().v)
    .forEach((color, index) => {
      context.fillStyle = color.value().toRgbString();
      context.fillRect(0, (height * index) / count, width, height / count);

      context.font = '24px Helvetica';
      context.fillStyle = color
        .inverse()
        // .darken(33)
        // .desaturate(45)

        .toRgbString();
      context.fillText(
        `${color.name} ${color.value().toHex8String()}`,
        20,
        (height * (index + 1)) / count - 25,
      );

      if (index === 0) {
        context.font = 'bold 48px Helvetica';
        context.fillStyle = color
          .value()
          .darken(33)
          .toRgbString();
        context.fillText(pallete.name, 50, 80);
      }
    });
};
