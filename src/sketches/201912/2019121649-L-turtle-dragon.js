import { tinycolor } from '@thebespokepixel/es-tinycolor';
import tinygradient from 'tinygradient';

import { repeat } from '../../utils';
import Draw from '../../draw';
import Layout from '../../draw/layouts';
import Symmetry from '../../draw/symmetry';
import { line } from '../../data';
import { initial } from 'lodash';
import Random from '../../random';

const rule = (initial, output) => ({
  initial,
  output,
});
const grammar = ({
  initial = 'F',
  rules = [{ initial: 'F', output: 'F[F]+F' }],
} = {}) => {
  let current = Array.from(initial);
  const next = () => {
    let output = [];
    current.forEach(symbol => {
      const rule = rules.find(r => r.initial === symbol);
      if (rule) {
        output = output.concat(Array.from(rule.output));
      } else {
        output.push(symbol);
      }
    });
    current = output;
    return get();
  };
  const iterate = iterations => {
    repeat(iterations, next);
    return get();
  };
  const get = () => current;
  return {
    next,
    iterate,
    get,
  };
};

export const options = () => ({
  // title: '',
  // pallete: null,
  // fullscreen: true,
  // blend: 'difference',
  width: 2048,
  height: 2048,
});

const iters = 2;
const repeats = Random().int(2, 5);
const g = grammar({
  initial: 'FX',
  rules: [rule('X', 'X+YF+'), rule('Y', '−FX−Y')],
});
const data = g.iterate(iters);
console.log(data);
console.log(`L system length: ${data.length}`);

export const sketch = ({ context, rng, pallete, meta, canvas }) => {
  const { rect, circle, path } = Draw(context);
  const layout = Layout(context);
  const sym = Symmetry(context);

  // Uncomment a fill or add a different one to set a background. Default is transparent.
  rect({
    width: canvas.width,
    height: canvas.height,
    // fill: tinycolor('hsv(25,8%,95%)').toRgbString(),
    // fill: '#191919',
    fill: '#eee',
    // fill: pallete
    //   .next()
    //   .value()
    //   .lighten(20)
    //   .toRgbString(),
  });

  // Move 0,0 to the canvas center:
  // context.translate(650, canvas.height - 45);
  context.translate(canvas.width / 2, canvas.height / 2);

  const gradient = tinygradient([
    pallete.colors[0].value().toRgbString(),
    pallete.colors[1].value().toRgbString(),
    pallete.colors[2].value().toRgbString(),
  ]);

  // const grad = gradient.rgb(data.filter(i => i === 'F').length);

  const draw = seed => () => {
    const rand = Random(seed);

    const transformStack = [];

    const stroke = pallete.colors[0].value().toRgbString();
    const strokeWidth = 5;
    const segmentLength = 75;
    const rotateAngle = (90 / 180) * Math.PI;
    const maxBranchAngle = 30;
    const branchAngle =
      (rng.int(-maxBranchAngle, maxBranchAngle) / 180) * Math.PI;
    const bigAngle = (360 / repeats / 180) * Math.PI;
    const littleAngle = (rng.int(-15, 15) / 180) * Math.PI;

    let color = 0;

    data.forEach(symbol => {
      switch (symbol) {
        case 'A':
        case 'F':
          path({
            path: [
              { x: 0, y: 0 },
              { x: 0, y: -segmentLength },
            ],
            strokeWidth: strokeWidth,
            stroke: '#191919', //grad[color],
          });
          color++;
          context.translate(0, -segmentLength);
          break;
        case '+':
          context.rotate(-rotateAngle);
          break;
        case '-':
          context.rotate(rotateAngle);
          break;
        case '^':
          context.rotate(-littleAngle);
          break;
        case 'v':
          context.rotate(littleAngle);
          break;
        case '[':
          transformStack.push(context.getTransform());
          context.rotate(branchAngle);
          color++;
          break;
        case ']':
          context.setTransform(transformStack.pop());
          color--;
          break;
        case '!':
          context.rotate(bigAngle);
          break;
        default:
          // console.log(`Unhandled grammar symbol: ${symbol}`);
          break;
      }
    });
  };

  // context.globalCompositeOperation = 'exclusion';
  // sym.arc(draw(rng.next()), 3);

  draw(rng.next())();
  // context.resetTransform();
  // context.translate(canvas.width - 650, canvas.height - 45);
  // context.scale(-1, 1);
  // draw(rng.next())();
  // layout.grid(4, 4, draw);
  // layout.grid(3, 3, draw);
  // layout.grid(2, 2, draw);
  // layout.grid(1, 1, draw);
};
