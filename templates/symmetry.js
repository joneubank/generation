import { tinycolor } from '@thebespokepixel/es-tinycolor';

import Random from '../../random';

import Draw from '../../draw';
// import Layout from '../../draw/layouts';
import Symmetry from '../../draw/symmetry';

export const options = () => ({
  // title: '',
  // pallete: null,
  // fullscreen: true,
  // width: 2048,
  // height: 2048,
  // blend: 'difference',
});

export const sketch = ({ context, rng, pallete, meta, canvas }) => {
  const { rect, circle, path } = Draw(context);
  // const layout = Layout(context);
  const sym = Symmetry(context);

  // Uncomment a fill or add a different one to set a background. Default is transparent.
  rect({
    width: canvas.width,
    height: canvas.height,
    // fill: tinycolor('hsv(25,8%,95%)').toRgbString(),
    // fill: '#191919',
    // fill: '#eee',
  });

  // Move 0,0 to the canvas center:
  context.translate(canvas.width / 2, canvas.height / 2);

  const arcs = 4;

  const draw = seed => () => {
    const rand = Random(seed);
    // Add draw stuff here, run it at the end of the sketch method or in a repeating layout.
  };

  sym.arc(draw(rng.next()), arcs);
};
