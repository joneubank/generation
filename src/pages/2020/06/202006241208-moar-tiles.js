import React from 'react';
import tinygradient from 'tinygradient';
import { tinycolor } from '@thebespokepixel/es-tinycolor';
import _ from 'lodash';
import * as tumult from 'tumult';

import Sketch from '../../../components/Sketch';
import Draw from '../../../draw';
import Layout from '../../../draw/layouts';
import Symmetry from '../../../draw/symmetry';
import RandomWave from '../../../data/RandomWave';
import { line, grid } from '../../../data';
import Vec2, { polarToVec2 } from '../../../data/Vec2';
import { repeat, clamp, array } from '../../../utils';
import Random from '../../../random';

import { default as t1000 } from 'nice-color-palettes/1000';

const draw = ({ context, pallete, rng, canvas, params }) => {
  const { rect, circle, path } = Draw(context);
  const sym = Symmetry(context);

  const { scale, rows, colorFuzzy, colorCount, blockFill } = params;
  const layout = Layout(context);

  const prand = Random(pallete.colors[0].rgb());
  const nicePallete = rng.choose(
    prand.chooseOne(t1000).map((i) => i),
    colorCount,
  );
  // Uncomment a fill or add a different one to set a background. Default is transparent.
  rect({
    width: canvas.width,
    height: canvas.height,
    // fill: '#191919',
    fill: '#eee',
    fill: rng.chooseOne(nicePallete),
  });

  // Move 0,0 to the canvas center:
  context.translate(canvas.width / 2, canvas.height / 2);

  const draw = (width, height) => {
    // Add draw stuff here, run it at the end of the sketch method or in a repeating layout.
    const SHAPE_QUARTER = 'quarterCircle';
    const SHAPE_SEMI = 'semiCircle';
    const SHAPE_DIAGONAL = 'diagonal';
    const SHAPE_CIRCLE = 'circle';
    const SHAPE_CHECKER = 'checker';
    const shapeOptions = [
      SHAPE_QUARTER,
      SHAPE_SEMI,
      SHAPE_DIAGONAL,
      SHAPE_CIRCLE,
      // SHAPE_QUARTER,
    ];
    // const frontShapes = rng.choose(
    //   shapeOptions,
    //   rng.int(1, shapeOptions.length),
    // );
    const frontShapes = shapeOptions;

    const drawBlock = (pos) => {
      const blockWidth = ((width * scale) / (rows - 1)) * 1.002 * blockFill;
      const topLeft = pos.add(Vec2(-0.5, -0.5).scale(blockWidth));
      const topRight = pos.add(Vec2(0.5, -0.5).scale(blockWidth));
      const bottomRight = pos.add(Vec2(0.5, 0.5).scale(blockWidth));
      const bottomLeft = pos.add(Vec2(-0.5, 0.5).scale(blockWidth));
      const points = [topLeft, topRight, bottomRight, bottomLeft];

      const backColor = tinycolor(rng.chooseOne(nicePallete))
        .darken(rng.fuzzy(colorFuzzy, colorFuzzy))
        .lighten(rng.fuzzy(colorFuzzy, colorFuzzy))
        .toRgbString();
      const frontColor = tinycolor(rng.chooseOne(nicePallete))
        .darken(rng.fuzzy(colorFuzzy, colorFuzzy))
        .lighten(rng.fuzzy(colorFuzzy, colorFuzzy))
        .toRgbString();

      // back path
      path({
        points,
        close: true,
        fill: backColor,
        // stroke: backColor,
        // strokeWidth: 1,
      });

      // const frontShapes = [SHAPE_QUARTER, SHAPE_SEMI];
      const frontShape = rng.chooseOne(frontShapes);
      // const frontShape = SHAPE_QUARTER;

      switch (frontShape) {
        case SHAPE_QUARTER:
          const quarterConfigs = [
            {
              start: 0,
              x: pos.x - blockWidth / 2,
              y: pos.y - blockWidth / 2,
            },
            {
              start: 0.25,
              x: pos.x + blockWidth / 2,
              y: pos.y - blockWidth / 2,
            },
            {
              start: 0.5,
              x: pos.x + blockWidth / 2,
              y: pos.y + blockWidth / 2,
            },
            {
              start: 0.75,
              x: pos.x - blockWidth / 2,
              y: pos.y + blockWidth / 2,
            },
          ];
          const quarterConfig = rng.chooseOne(quarterConfigs);
          circle({
            radius: blockWidth,
            fill: frontColor,
            arc: 0.25,
            useOrigin: true,
            ...quarterConfig,
          });
          break;
        case SHAPE_SEMI:
          const semiConfigs = [
            { x: pos.x, y: pos.y - (blockWidth * 1.002) / 2, start: 0 },
            { x: pos.x, y: pos.y + (blockWidth * 1.002) / 2, start: 0.5 },
            { x: pos.x - (blockWidth * 1.002) / 2, y: pos.y, start: 0.75 },
            { x: pos.x + (blockWidth * 1.002) / 2, y: pos.y, start: 0.25 },
          ];
          const semiConfig = rng.chooseOne(semiConfigs);
          circle({
            radius: blockWidth / 2,
            fill: frontColor,
            arc: 0.5,
            ...semiConfig,
          });
          break;
        case SHAPE_DIAGONAL:
          const diagPoints = rng.choose(points, 3);
          path({
            points: diagPoints,
            close: true,
            fill: frontColor,
          });
          break;
        case SHAPE_CIRCLE:
          circle({ ...pos.obj, radius: blockWidth / 2, fill: frontColor });
          break;
        case SHAPE_CHECKER:
          break;
      }
    };

    const imageWidth = width * scale;
    const topLeft = Vec2(-imageWidth / 2, -imageWidth / 2);
    // const points = grid(rows, rows);
    const points = grid(rows, rows);
    // const points = grid(rows + 1, rows + 1);
    points.forEach(({ u, v }) => {
      const pos = Vec2(u, v)
        .scale(width * scale)
        .add(topLeft);
      drawBlock(pos);
    });
  };

  draw(canvas.width, canvas.height);
  // layout.grid(4, 4, draw);
};

export default () => (
  <Sketch
    options={{
      // title: '',
      // pallete: null,
      // fullscreen: true,
      width: 2048,
      height: 2048,
      // blend: 'lighten',
    }}
    draw={draw}
    params={{
      scale: 1,
      rows: 21,
      colorFuzzy: 5,
      colorCount: 3,
      blockFill: 1,
    }}
  />
);
