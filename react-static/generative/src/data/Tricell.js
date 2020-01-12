import { repeat } from '../utils';
import Vec2, { polarToVec2 } from '../data/Vec2';

export const rankCount = rank => 12 * rank + 6;
export const totalCells = n => 6 * n * n;

export const triPath = (rank, index, scale = 1) => {
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

export const triIndexToAddress = i => {
  let n = 0;
  while (i - totalCells(n + 1) >= 0) {
    n += 1;
  }
  return { rank: n, position: i - totalCells(n) };
};
// export const makeTricell = ({ fill: null, borders: [null, null, null] };

export const makeCell = ({
  fill = null,
  borders = [
    { width: 0, stroke: null },
    { width: 0, stroke: null },
    { width: 0, stroke: null },
  ],
} = {}) => ({
  fill,
  borders,
});

/* Tricell Main Class */
function Tricell({ n, symmetry = 1, mirror = false } = {}) {
  this.n = n;
  this.symmetry = symmetry;
  // Cells should contain the content: {fill, borders:[{width, stroke}, {width, stroke}, {width, stroke}]}
  this.cells = [...Array(totalCells(n)).keys()].map(i => makeCell());

  // first rank is 0, first cell is 0
  this.setCell = function(rank, position, value = {}) {
    if (position >= rankCount(rank)) {
      return;
    }
    const index = totalCells(rank) + position;
    this.cells[index] = makeCell(value);
  };

  this.getCell = function(rank, position) {
    const availablePositions = Math.floor(rankCount(rank) / this.symmetry);
    let symmetryPosition = position;
    let symmetryCount = 0;
    while (symmetryPosition >= availablePositions) {
      symmetryPosition -= availablePositions;
      symmetryCount += 1;
    }

    const mirrorPosition =
      mirror && symmetryCount % 2
        ? availablePositions - symmetryPosition - 1
        : symmetryPosition;
    return this.cells[totalCells(rank) + mirrorPosition];
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
