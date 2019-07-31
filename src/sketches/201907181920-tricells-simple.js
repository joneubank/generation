import Draw from '../draw';
import Vec2, { polarToVec2 } from '../data/Vec2';
import { repeat } from '../utils';

export const options = () => ({
  // title: '',
  // pallete: null,
  // fullscreen: true,
  width: 2048,
  height: 2048,
});

const maxSize = 1950;

export const sketch = ({ context, rng, pallete, meta, canvas }) => {
  const { rect, circle, path } = Draw(context);

  rect({ width: canvas.width, height: canvas.height, fill: '#eee' });

  context.translate(canvas.width / 2, canvas.height / 2);

  function Tricell({ n }) {
    const rankCount = rank => 12 * rank + 6;

    // first rank is 0, first cell is 0
    const triPath = (rank, index, scale = 1) => {
      const sectionCount = 2 * rank + 1;
      const section = Math.floor(index / sectionCount);
      const sectionAngle = (-Math.PI / 3) * section;

      const position = index % sectionCount;
      const inverted = !(position % 2);

      const root = polarToVec2((2 * Math.PI) / 3, rank * scale);
      const positionAdjust = Vec2(scale * Math.floor(position / 2), 0);

      return inverted
        ? [
            root,
            root.add(polarToVec2((2 * Math.PI) / 3, scale)),
            root.add(polarToVec2(Math.PI / 3, scale)),
          ].map(vec => vec.add(positionAdjust).rotate(sectionAngle))
        : [
            root,
            root.add(polarToVec2(Math.PI / 3, scale)),
            root.add(Vec2(scale, 0)),
          ].map(vec => vec.add(positionAdjust).rotate(sectionAngle));
    };

    this.n = n;

    this.paths = function(scale) {
      const output = [];
      repeat(this.n, rank => {
        repeat(rankCount(rank), i => {
          console.log(rank, i);
          output.push(triPath(rank, i, scale));
        });
      });

      return output;
    };
  }

  const n = rng.int(3, 13);
  const cell = new Tricell({ n });

  context.lineJoin = 'round';

  const rotation = rng.float(0, Math.PI / 2);

  cell.paths(maxSize / n / 2).forEach(p => {
    const c = rng
      .chooseOne(pallete.colors)
      .value()
      .darken(rng.fuzzy(15, 10))
      .toRgbString();

    const rotated = p.map(vec => vec.rotate(rotation));

    path({
      path: rotated,
      strokeWidth: 2,
      stroke: c,
      fill: c,
      close: true,
    });
  });
};
