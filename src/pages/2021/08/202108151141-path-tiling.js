import React from 'react';
import tinygradient from 'tinygradient';
import { tinycolor } from '@thebespokepixel/es-tinycolor';
import _ from 'lodash';
import * as tumult from 'tumult';

import Sketch from '../../../components/Sketch';
import Draw from '../../../draw';
import Layout from '../../../draw/layouts';
import RandomWave from '../../../data/RandomWave';
import { line, grid } from '../../../data';
import Vec2, { polarToVec2 } from '../../../data/Vec2';
import { repeat, clamp, array } from '../../../utils';
import Random from '../../../random';
import { simplex, perlin } from '../../../data/noise';

import TrochetTiles from '../../../data/trochet';

import { default as t1000 } from 'nice-color-palettes/1000';

const draw = ({ context, pallete, rng, canvas, params }) => {
  const { rect, circle, path, arc } = Draw(context);
  const layout = Layout(context);

  const prand = Random(pallete.colors[0].rgb());
  const nicePallete = prand.chooseOne(t1000).map((i) => i);

  const {
    gridWidth,
    imageFill,
    useStroke,
    strokeFill,
    hideCrosses,
    allowCrosses,
    hideHorizontalChance,
    colorFuzz,
  } = params;

  // Uncomment a fill or add a different one to set a background. Default is transparent.
  rect({
    width: canvas.width,
    height: canvas.height,
    fill: '#eee',
    // fill: '#191919',
  });

  // Move 0,0 to the canvas center:
  // context.translate(canvas.width / 2, canvas.height / 2);

  const draw = (width, height) => {
    // Add draw stuff here, run it at the end of the sketch method or in a repeating layout.
    const minDim = Math.min(width, height);
    const maxDim = Math.max(width, height);

    const imageDim = minDim * imageFill;

    context.translate((width - imageDim) / 2, (height - imageDim) / 2);

    const gridHeight = gridWidth;
    const tileWidth = Math.ceil(imageDim / gridWidth);
    const tileHeight = Math.ceil(imageDim / gridHeight);
    const tileRadius = useStroke ? (tileWidth * 2) / 4 : tileWidth;

    rng.push('trochet generation');
    const tileSet = new TrochetTiles(
      { width: gridWidth, height: gridHeight, allowCross: allowCrosses },
      rng,
    );
    rng.pop();

    const gridPoints = grid(gridWidth, gridHeight);

    const colorFuzzyRange = colorFuzz;
    function fuzzyColor(color) {
      return tinycolor(color)
        .darken(rng.fuzzy(0, colorFuzzyRange))
        .lighten(rng.fuzzy(0, colorFuzzyRange))
        .toRgbString();
    }

    const pathColors = {};
    const getPathColor = (path) => {
      if (pathColors[path]) {
        return pathColors[path];
      }
      const color = fuzzyColor(rng.chooseOne(nicePallete));
      pathColors[path] = color;

      return color;
    };

    function drawTile(tile, x, y) {
      context.lineCap = 'round';
      // 3 cell types based on connection orientation (no terminations)
      // Cross, left to bottom, left to top

      // Each has two lines that can be draw in either order, creating 6 total tile types

      let pathA = () => {};
      let pathB = () => {};

      switch (tile.orientation) {
        // switch (1) {
        case 0:
          //Left to Bottom
          pathA = () => {
            circle({
              radius: tileRadius,
              useOrigin: !useStroke,
              arc: 0.25,
              start: 0.75,
              x: x * tileWidth,
              y: (y + 1) * tileWidth,

              fill: !useStroke ? getPathColor(tile.path[0]) : null,
              stroke: useStroke ? getPathColor(tile.path[0]) : null,
              strokeWidth: useStroke ? strokeFill * tileWidth : null,
            });
          };

          pathB = () => {
            circle({
              radius: tileRadius,
              useOrigin: !useStroke,
              arc: 0.25,
              start: 0.25,
              x: (x + 1) * tileWidth,
              y: y * tileWidth,

              fill: !useStroke ? getPathColor(tile.path[1]) : null,
              stroke: useStroke ? getPathColor(tile.path[1]) : null,
              strokeWidth: useStroke ? strokeFill * tileWidth : null,
            });
          };

          break;
        case 1:
          // Left to Top

          const colorA =
            nicePallete[(gridWidth * 2 + x + y) % nicePallete.length];
          const colorB =
            nicePallete[(gridWidth * 2 + x + y + 1) % nicePallete.length];

          pathA = () => {
            circle({
              radius: tileRadius,
              useOrigin: !useStroke,
              arc: 0.25,
              start: 0,
              x: x * tileWidth,
              y: y * tileWidth,

              fill: !useStroke ? getPathColor(tile.path[0]) : null,
              stroke: useStroke ? getPathColor(tile.path[0]) : null,
              strokeWidth: useStroke ? strokeFill * tileWidth : null,
            });
          };
          pathB = () => {
            circle({
              radius: tileRadius,
              useOrigin: !useStroke,
              arc: 0.25,
              start: 0.5,
              x: (x + 1) * tileWidth,
              y: (y + 1) * tileWidth,

              fill: !useStroke ? getPathColor(tile.path[1]) : null,

              stroke: useStroke ? getPathColor(tile.path[1]) : null,
              strokeWidth: useStroke ? strokeFill * tileWidth : null,
            });
          };

          break;
        case 2:
          //Cross

          // pathA = () => {
          //   circle({
          //     radius: tileRadius,
          //     useOrigin: !useStroke,
          //     arc: 0.25,
          //     start: 0.75,
          //     x: x * tileWidth,
          //     y: (y + 1) * tileWidth,

          //     fill: !useStroke ? getPathColor(tile.path[0]) : null,
          //     stroke: useStroke ? getPathColor(tile.path[0]) : null,
          //     strokeWidth: useStroke ? strokeFill * tileWidth : null,
          //   });
          // };
          const hideHorizontal = hideCrosses && rng.bool(hideHorizontalChance);
          const hideVertical = hideCrosses && !hideHorizontal;

          pathA = () => {
            !hideHorizontal &&
              path({
                points: [
                  Vec2(x * tileWidth, (y + 0.5) * tileWidth),
                  Vec2((x + 1) * tileWidth, (y + 0.5) * tileWidth),
                ],
                stroke: useStroke ? getPathColor(tile.path[0]) : null,
                strokeWidth: useStroke ? strokeFill * tileWidth : null,
              });
          };

          pathB = () => {
            !hideVertical &&
              path({
                points: [
                  Vec2((x + 0.5) * tileWidth, y * tileWidth),
                  Vec2((x + 0.5) * tileWidth, (y + 1) * tileWidth),
                ],
                stroke: useStroke ? getPathColor(tile.path[1]) : null,
                strokeWidth: useStroke ? strokeFill * tileWidth : null,
              });
          };
          break;
      }

      const paths = [pathA, pathB];
      rng.shuffle(paths).forEach((path) => path());
    }

    repeat(gridWidth, (x) => {
      repeat(gridHeight, (y) => {
        drawTile(tileSet.tiles[x][y], x, y);
        // rect({
        //   x: x * tileWidth,
        //   y: y * tileHeight,
        //   width: tileWidth + 1,
        //   height: tileHeight + 1,
        //   fill: tinycolor(rng.chooseOne(nicePallete))
        //     .darken(rng.fuzzy(0, colorFuzzyRange))
        //     .lighten(rng.fuzzy(0, colorFuzzyRange))
        //     .toRgbString(),
        // });
      });
    });
  };

  draw(canvas.width, canvas.height);
  // layout.grid(4, 4, draw, {fitAll:true});
};

export default () => (
  <Sketch
    options={{
      // title: '',
      // pallete: null,
      // fullscreen: true,
      width: 1024,
      height: 1024,
      // blend: 'lighten',
    }}
    draw={draw}
    params={{
      debounce: 250,

      imageFill: 0.9,

      gridWidth: 11,
      useStroke: true,
      strokeFill: 0.3,
      colorFuzz: 5,

      allowCrosses: true,
      hideCrosses: false,
      hideHorizontalChance: 0.5,
    }}
    controls={[
      { key: 'imageFill', type: 'range', min: 0, max: 1, step: 0.01 },
      { key: 'gridWidth', type: 'range', min: 3, max: 128, step: 1 },

      { type: 'header', title: 'Stroke' },
      { key: 'useStroke', type: 'boolean' },
      { key: 'strokeFill', type: 'range', min: 0, max: 1, step: 0.01 },
      { key: 'colorFuzz', type: 'range', min: 0, max: 20, step: 0.25 },

      { type: 'header', title: 'Crosses' },
      { key: 'allowCrosses', type: 'boolean' },
      { key: 'hideCrosses', type: 'boolean' },
      {
        key: 'hideHorizontalChance',
        type: 'range',
        min: 0,
        max: 1,
        step: 0.01,
      },
    ]}
  />
);
