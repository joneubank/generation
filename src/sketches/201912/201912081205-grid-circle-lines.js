import { tinycolor } from '@thebespokepixel/es-tinycolor';
import tinygradient from 'tinygradient';

import Draw from '../../draw';
import Layout from '../../draw/layouts';
import Symmetry from '../../draw/symmetry';
import { grid } from '../../data';

export const options = () => ({
  // title: '',
  // pallete: null,
  // fullscreen: true,
  width: 2048,
  height: 2048,
  // blend: 'difference',
});

export const sketch = ({ context, rng, pallete, meta, canvas }) => {
  const { rect, circle, path } = Draw(context);
  const layout = Layout(context);
  const sym = Symmetry(context);

  // Uncomment a fill or add a different one to set a background. Default is transparent.
  const backgroundColor = pallete.colors[0];
  const baseColor = pallete.colors[1];
  const topColor = pallete.colors[2];
  const gradient = tinygradient([
    baseColor.value().toRgbString(),
    topColor.value().toRgbString(),
  ]);
  rect({
    width: canvas.width,
    height: canvas.height,
    // fill: tinycolor('hsv(25,8%,95%)').toRgbString(),
    // fill: '#191919',
    // fill: '#eee',

    fill: backgroundColor.value().toRgbString(),
  });

  // Move 0,0 to the canvas center:

  const draw = (width, height) => {
    //image dimensions
    const scale = 0.85;
    const minDim = Math.min(canvas.width, canvas.height);
    const imgWidth = minDim * scale;
    const lineWidth = rng.int(3, 20);
    const gapWidth = lineWidth;
    const layerWidth = lineWidth + gapWidth;

    context.translate(
      (canvas.width - imgWidth) / 2,
      (canvas.height - imgWidth) / 2,
    );

    let repeat = false;
    let count = 0;
    do {
      repeat = false;
      count++;
      // const size = 4;
      // const layers = 4;
      const size = rng.int(5, 17);
      const layers = rng.int(3, 14);
      const blockWidth = imgWidth / (size + 2);
      const gridWidth = imgWidth - 2 * blockWidth;

      const innerRadius =
        gridWidth / 2 / (size - 1) - layerWidth * (layers - 1);
      if (innerRadius < 2 * lineWidth) {
        repeat = true;
        continue;
      }

      const layerColors = gradient.rgb(layers);

      const pointOrigin = point => ({
        x: blockWidth + point.u * gridWidth,
        y: blockWidth + point.v * gridWidth,
      });
      const positionOffset = (position, layer) => {
        const output = {};
        switch (position) {
          case 0:
            output.x = 0;
            output.y = innerRadius + layer * layerWidth;
            break;
          case 1:
            output.x = 0;
            output.y = -(innerRadius + layer * layerWidth);
            break;
          case 2:
            output.x = innerRadius + layer * layerWidth;
            output.y = 0;
            break;
          case 3:
            output.x = -(innerRadius + layer * layerWidth);
            output.y = 0;
            break;
        }
        return output;
      };
      const directionTravel = direction => {
        const output = {};
        switch (direction) {
          case 0:
            output.x = 2 * ((layers - 1) * layerWidth + innerRadius);
            output.y = 0;
            break;
          case 1:
            output.x = -2 * ((layers - 1) * layerWidth + innerRadius);
            output.y = 0;
            break;
          case 2:
            output.x = 0;
            output.y = 2 * ((layers - 1) * layerWidth + innerRadius);
            break;
          case 3:
            output.x = 0;
            output.y = -2 * ((layers - 1) * layerWidth + innerRadius);
            break;
        }
        return output;
      };

      const drawCircle = (layer, point) => {
        const origin = pointOrigin(point);
        circle({
          ...origin,
          radius: innerRadius + layerWidth * layer,
          stroke: layerColors[layer].toRgbString(),
          strokeWidth: lineWidth,
        });
      };

      const drawLine = (layer, point, direction, position) => {
        const origin = pointOrigin(point);
        const offset = positionOffset(position, layer);
        const travel = directionTravel(direction);
        const start = { x: origin.x + offset.x, y: origin.y + offset.y };
        const end = { x: start.x + travel.x, y: start.y + travel.y };

        path({
          path: [start, end],
          stroke: layerColors[layer].toRgbString(),
          strokeWidth: lineWidth,
        });
      };

      const data = grid(size, size).map(point => {
        const circlesToDraw = rng.choose(
          [...Array(layers).keys()],
          rng.int(1, layers),
        );

        const linesToDraw = [...Array(rng.int(1, layers)).keys()].map(i => {
          const direction = rng.int(0, 3);
          const positionBase = direction < 2 ? 0 : 2;
          const position = rng.bool(0.5) ? positionBase + 1 : positionBase;
          const layer = rng.int(1, layers) - 1;
          return { direction, position, layer };
        });
        return {
          ...point,
          circlesToDraw,
          linesToDraw,
        };
      });

      data.forEach(point => {
        point.circlesToDraw.forEach(layer => {
          drawCircle(layer, point);
        });
      });
      data.forEach(point => {
        point.linesToDraw.forEach(line => {
          drawLine(line.layer, point, line.direction, line.position);
        });
      });
    } while (repeat && count < 500);
  };

  draw(canvas.width, canvas.height);
  // layout.grid(4, 4, draw);
};
