import Draw from '../draw';
import { segment } from '../data';
import { gradient } from '../colors';
import { repeat } from '../utils';
import { tinycolor } from '@thebespokepixel/es-tinycolor';
export const options = () => ({
  // title: 'intelligent importances',
  pallete: 'troubled trend skill',
  // fullscreen: true,
  width: 1500,
  height: 1500,
});

const boundingScale = 0.05;
const linesPerShape = 250;
const shapeCount = 8;

export const sketch = ({ context, rng, pallete, meta, canvas }) => {
  const { rect, circle, path } = Draw(context);

  //Background
  rect({
    width: canvas.width,
    height: canvas.height,
    fill: tinycolor('hsv(0,0%,90%)').toRgbString(),
  });

  // Setup lines

  const xBound = canvas.width * boundingScale;
  const yBound = canvas.width * boundingScale;

  const boundedPoint = () => ({
    x: rng.int(xBound, canvas.width - xBound),
    y: rng.int(yBound, canvas.height - yBound),
  });

  const lineShape = () => {
    const p1 = boundedPoint();
    const p2 = boundedPoint();
    const p3 = boundedPoint();
    const p4 = boundedPoint();

    // path({
    //   path: [p1, p2],
    //   strokeWidth: 3,
    //   stroke: pallete.colors[0].value().toRgbString(),
    // });
    // path({
    //   path: [p3, p4],
    //   strokeWidth: 3,
    //   stroke: pallete.colors[1].value().toRgbString(),
    // });

    const l1 = segment({ start: p1, end: p2, steps: linesPerShape });
    const l2 = segment({ start: p3, end: p4, steps: linesPerShape });
    const chosen = rng.choose(pallete.colors, 2);
    const colors = gradient(
      chosen[0].value(),
      chosen[1].value(),
      linesPerShape,
    );
    for (let i = 0; i < linesPerShape; i++) {
      path({
        path: [l1[i], l2[i]],
        strokeWidth: 1,
        stroke: colors[i].setAlpha(0.6).toRgbString(),
      });
    }
  };

  repeat(shapeCount, i => lineShape());
};
