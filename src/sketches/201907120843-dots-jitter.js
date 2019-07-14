export const options = () => ({
  // title: 'ridiculous license mentions',
  // pallete: 'integrated quarter grants',
  fullscreen: true,
  width: null,
  height: null,
});

const gridSize = 43;
const gridScale = 0.75;
const radius = 13;
const strokeWidth = 5;
const strokeChance = 0;
const sizeJitter = 0.5;
const positionJitter = 0.25;
const strokeJitter = 0.5;

const randColor = () =>
  rng
    .chooseOne(pallete.colors)
    .value()
    .toRgbString();

export const sketch = ({ context, rng, pallete, meta, canvas }) => {
  const drawDot = (x, y, fillColor, lineColor, hasLine) => {
    context.beginPath();
    context.arc(
      x,
      y,
      rng.jitter(radius, radius * sizeJitter),
      0,
      2 * Math.PI,
      false,
    );
    context.fillStyle = rng
      .chooseOne(pallete.colors)
      .value()
      .toRgbString();
    context.fill();
    if (rng.bool(strokeChance)) {
      context.lineWidth = rng.jitter(strokeWidth, strokeWidth * strokeJitter);
      context.strokeStyle = rng
        .chooseOne(pallete.colors)
        .value()
        .toRgbString();
      context.stroke();
    }
  };

  // const background = rng.color();
  const background = rng.chooseOne(pallete.colors);
  context.fillStyle = background.value().toRgbString();
  context.fillRect(0, 0, canvas.width, canvas.height);

  rng.shuffle([...Array(gridSize * gridSize).keys()]).forEach(i => {
    const x = i % gridSize;
    const y = Math.floor(i / gridSize);
    const dim = Math.max(canvas.width, canvas.height);

    const gapSize = (dim * gridScale) / (gridSize - 1);

    const centerx = x * gapSize + (canvas.width - dim * gridScale) / 2;
    const centery = y * gapSize + (canvas.height - dim * gridScale) / 2;

    drawDot(
      rng.jitter(centerx, gapSize * positionJitter),
      rng.jitter(centery, gapSize * positionJitter),
      randColor,
      randColor,
      rng.bool(strokeChance),
    );
  });
};
