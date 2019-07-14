import Draw from '../draw';
import { grid } from '../data';

export const options = () => ({
  // title: 'lung',
  pallete: null,
  fullscreen: true,
  width: null,
  height: null,
});

const gridSize = 7;
const gridScale = 0.69;
const radius = 50;

const showChanceL2 = 0.85;
const jitterRange = 0.3;
const minJitter = 1.3;
const darkened = 3;
const darknessJitter = 0;

const randColor = () =>
  rng
    .chooseOne(pallete.colors)
    .value()
    .toRgbString();

export const sketch = ({ context, rng, pallete, meta, canvas }) => {
  const { circle } = Draw(context);

  const background = pallete.colors[0];
  console.log(background);
  context.fillStyle = background.value().toRgbString();
  context.fillRect(0, 0, canvas.width, canvas.height);

  const G = grid(gridSize, gridSize);
  const gw = canvas.width * gridScale;
  const gh = canvas.height * gridScale;

  // Layer 2
  context.translate((canvas.width - gw) / 2, (canvas.height - gh) / 2);

  const color2 = pallete.colors[1];
  G.forEach(({ u, v }) => {
    circle({
      x: u * gw,
      y: v * gh,
      fill: color2.value().toRgbString(),
      radius,
    });
  });

  const color3 = pallete.colors[0];
  G.forEach(({ u, v }) => {
    if (rng.bool(showChanceL2)) {
      const centerDistance = Math.sqrt(
        (0.5 - u) * (0.5 - u) + (0.5 - v) * (0.5 - v),
      );
      circle({
        x: rng.jitter(u * gw, (gw / gridSize) * jitterRange * (minJitter - v)),
        y: rng.jitter(v * gh, (gh / gridSize) * jitterRange * (minJitter - v)),
        fill: color3
          .value()
          .darken(rng.jitter(darkened, darknessJitter))
          .toRgbString(),
        radius: radius + 1,
      });
    }
  });

  console.log(color2);
};
