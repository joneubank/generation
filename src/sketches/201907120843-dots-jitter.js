export const options = () => ({
  // title: 'lung', 
  pallete: null,
  fullscreen: true,
  width: null,
  height: null,
});

const gridSize = 21;
const gridScale = 0.9;
const radius = 13;
const strokeWidth = 9;
const strokeChance = 0.69;
const jitterRange = 0.3;

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

    const gapSize = (dim * gridScale) / (gridSize - 1);
    

    const centerx =
      x * gapSize +
      (canvas.width - dim * gridScale) / 2 +
      rng.int(0, gapSize * jitterRange);
    const centery =
      y * gapSize +
      (canvas.height - dim * gridScale) / 2 +
      rng.int(0, gapSize * jitterRange);

    drawDot(centerx, centery, randColor, randColor, rng.bool(strokeChance));
  });
};
