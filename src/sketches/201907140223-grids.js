import { grid } from '../data';
import Draw from '../draw';
import { tinycolor } from '@thebespokepixel/es-tinycolor';

export const options = () => ({
  title: null,
  pallete: null,
  fullscreen: true,
  width: null,
  height: null,
});

const gridX = 32;
const gridY = 24;
const darken = 5;
const saturate = 2;

export const sketch = ({ context, rng, pallete, meta, canvas }) => {
  const { rect } = Draw(context);

  rect({
    x: 0,
    y: 0,
    width: canvas.width,
    height: canvas.height,
    // fill: tinycolor('hsv(70,5%,94%)').toRgbString(),
    fill: pallete.colors[2].value().toRgbString(),
  });

  const blockWidth = canvas.width / (gridX - 1);
  const blockHeight = canvas.height / (gridY - 1);

  const G = grid(gridX, gridY);

  G.forEach(({ u, v }) => {
    //we're evenly dividing not making a list of objects... we might need a couple versions of the grid data method

    const option = rng.int(0, pallete.colors.length);
    const choice = option < 2 ? option : 2;
    if (u !== 1 && v !== 1) {
      const c = pallete.colors[choice]
        .value()
        .darken(rng.int(-darken, darken))
        .saturate(rng.int(-saturate, saturate))
        .toRgbString();
      console.log(c);
      rect({
        x: u * canvas.width,
        y: v * canvas.height,
        width: blockWidth + 1,
        height: blockHeight + 1,
        fill: c,
      });
    }
  });
};
