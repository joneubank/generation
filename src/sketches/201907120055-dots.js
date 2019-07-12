export const options = () => ({
  // title: 'department fishes',
  pallete: null,
  fullscreen: true,
  width: null,
  height: null,
});

const gridSize = 17;
const gridScale = 1;
const radius = 25;
const strokeWidth = 10;
const strokeChance = 0.69;

const randColor = () =>
  rng
    .chooseOne(pallete.colors)
    .value()
    .toRgbString();

export const sketch = ({ context, rng, pallete, meta, canvas }) => {
  const drawDot = (x, y, fillColor, lineColor, hasLine) => {
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI, false);
    context.fillStyle = rng
      .chooseOne(pallete.colors)
      .value()
      .toRgbString();
    context.fill();
    if (rng.bool(strokeChance)) {
      context.lineWidth = strokeWidth;
      context.strokeStyle = rng
        .chooseOne(pallete.colors)
        .value()
        .toRgbString();
      context.stroke();
    }
  };

  const background = rng.color();
  context.fillStyle = background.value().toRgbString();
  context.fillRect(0, 0, canvas.width, canvas.height);

  rng.shuffle([...Array(gridSize * gridSize).keys()]).forEach(i => {
    const x = i % gridSize;
    const y = Math.floor(i / gridSize);
    const dim = Math.max(canvas.width, canvas.height);

    const centerx =
      (x * dim * gridScale) / (gridSize - 1) +
      (canvas.width - dim * gridScale) / 2;
    const centery =
      (y * dim * gridScale) / (gridSize - 1) +
      (canvas.height - dim * gridScale) / 2;

    drawDot(centerx, centery, randColor, randColor, rng.bool(strokeChance));
  });
};
