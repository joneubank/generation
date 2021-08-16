import Random from '../../random';
import { array } from '../../utils';

/**
 * Trochet tiling
 *
 * 0: left to bottom
 * 1: left to top
 * 2: left to right (optional)
 *
 * Generate a grid with each tile assigned
 * Identify all unique paths within the grid and
 *  make them discoverable by tile (return path ID) and
 *  by path (return list of tiles, unordered)
 *  */

// entry, orientation, {nextEntry, nextXMod, nextYMod}
const entryOrientationData = [
  // entry 0 (left)
  [
    {
      // orientation 0 (left to bottom)
      nextEntry: 1, // bottom becomes top
      xMod: 0,
      yMod: 1,
      pathPos: 0,
    },

    {
      // orientation 1 (left to top)
      nextEntry: 3, // top becomes bottom
      xMod: 0,
      yMod: -1,
      pathPos: 0,
    },

    {
      // orientation 2 (left to right)
      nextEntry: 0, // right becomes left
      xMod: 1,
      yMod: 0,
      pathPos: 0,
    },
  ],
  // entry 1 (top)
  [
    {
      // orientation 0 (top to right)
      nextEntry: 0, // right becomes left
      xMod: 1,
      yMod: 0,
      pathPos: 1,
    },

    {
      // orientation 1 (top to left)
      nextEntry: 2, // left becomes righy
      xMod: -1,
      yMod: 0,
      pathPos: 0,
    },

    {
      // orientation 2 (top to bottom)
      nextEntry: 1, // bottom becomes top
      xMod: 0,
      yMod: 1,
      pathPos: 1,
    },
  ],
  // entry 2 (right)
  [
    {
      // orientation 0 (right to top)
      nextEntry: 3, // top becomes bottom
      xMod: 0,
      yMod: -1,
      pathPos: 1,
    },

    {
      // orientation 1 (right to bottom)
      nextEntry: 1, // bottom becomes top
      xMod: 0,
      yMod: 1,
      pathPos: 1,
    },
    {
      // orientation 2 (right to left)
      nextEntry: 2, // left becomes right
      xMod: -1,
      yMod: 0,
      pathPos: 0,
    },
  ],
  // entry 3 (bottom)

  [
    {
      // orientation 0 (bottom to left)
      nextEntry: 2, // left becomes right
      xMod: -1,
      yMod: 0,
      pathPos: 0,
    },

    {
      // orientation 1 (bottom to right)
      nextEntry: 0, // right becomes left
      xMod: 1,
      yMod: 0,
      pathPos: 1,
    },

    {
      // orientation 2 (bottom to top)
      nextEntry: 3, // top becomes bottom
      xMod: 0,
      yMod: -1,
      pathPos: 1,
    },
  ],
];

class Tile {
  constructor({ x, y, orientation, path }) {
    this.x = x;
    this.y = y;
    this.orientation = orientation;
    this.path = path || [null, null];
  }
}

export default class TrochetTiles {
  constructor({ width, height, allowCross = false }, rng = new Random()) {
    this.width = width;
    this.height = height;
    this.allowCross = allowCross;

    const tileMax = this.allowCross ? 2 : 1;

    this.tiles = array(0, width).map((x) =>
      array(0, height).map(
        (y) => new Tile({ x, y, orientation: rng.int(0, tileMax) }),
      ),
    );

    this.paths = this.findPaths();
  }

  findPaths() {
    const paths = [];

    let path = 0;
    let maxPath = 0;

    // 0-left, 1-top, 2-right, 3-bottom
    let nextEntry = 0;
    let nextX = 0;
    let nextY = 0;

    // returns false if path alrady assigned to the provided tile coords
    // otherwise this has side-effects, updating the nextXYZ variables defined above.
    const addTileToPath = (tiles, entry, x, y) => {
      const tile = tiles[x][y];
      let output = true;
      const orientation = tile.orientation;

      const tileData = entryOrientationData[entry][orientation];
      // check if path already assigned
      if (tile.path[tileData.pathPos] !== null) {
        output = false;
        path = tile.path[tileData.pathPos];
      }
      tile.path[tileData.pathPos] = path;

      nextEntry = tileData.nextEntry;
      nextX += tileData.xMod;
      nextY += tileData.yMod;

      return output;
    };

    this.tiles.forEach((columnData, x) =>
      this.tiles[x].forEach((tileData, y) => {
        // map paths for this tile entering from all directions
        const self = this;
        [0, 1, 2, 3].forEach((entry) => {
          path = ++maxPath;

          nextX = x;
          nextY = y;
          nextEntry = entry;
          // do this once, because after the first two loops this is gauranteed to return false;
          addTileToPath(self.tiles, nextEntry, nextX, nextY);
          do {
            // break if we are left with coordinates outside of our grid
            if (
              nextX < 0 ||
              nextX >= self.width ||
              nextY < 0 ||
              nextY >= self.height
            ) {
              break;
            }
          } while (addTileToPath(self.tiles, nextEntry, nextX, nextY));
        });
      }),
    );

    return paths;
  }
}
