import { repeat } from '../utils';
import Vec2, { polarToVec2 } from '../data/Vec2';

export const rankCount = rank => 12 * rank + 6;

// export const makeTricell = ({ fill: null, borders: [null, null, null] };

function Tricell({ n, symmetry = 1 } = {}) {
  this.n = n;
  this.cells = [];

  repeat(n, rank => {
    const rankCells = [];
    repeat(rankCount(rank), i => {
      rankCells.push({});
    });
    this.cells.push(rankCells);
  });

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

  this.paths = function(scale) {
    const output = [];
    repeat(this.n, rank => {
      repeat(rankCount(rank), i => {
        output.push(triPath(rank, i, scale));
      });
    });

    return output;
  };
}

export default Tricell;
