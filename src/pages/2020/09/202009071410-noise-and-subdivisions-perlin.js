import React from 'react';
import tinygradient from 'tinygradient';
import { tinycolor } from '@thebespokepixel/es-tinycolor';
import _, { filter, flatten, sum } from 'lodash';
import * as tumult from 'tumult';

import Sketch from '../../../components/Sketch';
import Draw from '../../../draw';
import Layout from '../../../draw/layouts';
import RandomWave from '../../../data/RandomWave';
import { line, grid } from '../../../data';
import Vec2, { polarToVec2 } from '../../../data/Vec2';
import { repeat, clamp, array, range } from '../../../utils';
import Random from '../../../random';
import { simplex, perlin } from '../../../data/noise';

import { default as t1000 } from 'nice-color-palettes/1000';

const draw = ({ context, pallete, rng, canvas, params }) => {
  const { rect, circle, path } = Draw(context);
  const layout = Layout(context);

  const prand = Random(pallete.colors[0].rgb());
  const nicePallete = prand.chooseOne(t1000).map((i) => i);

  const { levels, divFactor, divideChance, colorFuzz } = params;

  const gradient = tinygradient(pallete.colors.map((c) => c.rgb()));

  const p3 = perlin(rng.next(), 3);
  const p6 = perlin(rng.next(), 6);
  const p9 = perlin(rng.next(), 9);
  const c3 = 1;
  const c6 = 1;
  const c9 = 1;

  const colorNoise = (x, y) => {
    return (c3 + p3(x, y) + c6 * p6(x, y) + c9 * p9(x, y)) / (c3 + c6 + c9);
  };

  // Uncomment a fill or add a different one to set a background. Default is transparent.
  rect({
    width: canvas.width,
    height: canvas.height,
    fill: '#eee',
    // fill: '#191919',
  });

  // Move 0,0 to the canvas center:
  context.translate(canvas.width / 2, canvas.height / 2);

  // draw a square, centered at a point. convenient instead of calculating the rect position repeatedly
  const drawSquare = (center, size, fill, stroke, strokeWidth) => {
    rect({
      width: size,
      height: size,
      x: center.x - size / 2,
      y: center.y - size / 2,
      fill,
      stroke,
      strokeWidth,
    });
  };

  /**
   *
   * @param {[Vec2]} squares Center point of existing squares
   * @param {Number} size Size of Existing swares
   * @param {(Vec2)=>Boolean} test Method to determine if a square should be divided
   *
   * @returns {[Vec2]} List of centers of new squares
   */
  const divideSquares = (squares, size, test = () => true) => {
    return flatten(
      squares.map((square) => {
        // find the square centers for the subdivided level
        // there will be divFactor^2 output Vec2

        const outSize = size / divFactor; // new width
        const halfStepSize = outSize / 2; // half-width of output squares

        const halfStepPositions = range(-1 * (divFactor - 1), divFactor - 1, 2);
        // const stepSize = size / divFactor;

        return flatten(
          halfStepPositions.map((i) => {
            return halfStepPositions.map((j) =>
              square.add(Vec2(i * halfStepSize, j * halfStepSize)),
            );
          }),
        );
      }),
    ).filter(test);
  };

  const divideByChance = (chance, level) => (xy) =>
    level < 3 || rng.bool(chance);

  const innerDraw = (width, height) => {
    // Add draw stuff here, run it at the end of the sketch method or in a repeating layout.
    const minDim = Math.min(width, height);
    const maxDim = Math.min(width, height);

    const divideByRadius = (level) => (xy) => {
      if (level < 3) {
        return true;
      }

      const radius = xy.magnitude();
      const diff = (maxDim - radius) / maxDim;
      const chance = 1 - Math.pow(diff, 2) * divideChance;
      return rng.bool(chance);
    };

    const colorAtPoint = (xy) => {
      const normalPoint = xy.add(Vec2(maxDim / 2, maxDim / 2));
      const value = colorNoise(normalPoint.x / maxDim, normalPoint.y / maxDim);
      return gradient.rgbAt(clamp(rng.fuzzy(value, colorFuzz)));
    };

    const squares = [[Vec2(0, 0)]];
    repeat(levels, (level) => {
      const size = maxDim / Math.pow(divFactor, level);
      if (level) {
        squares.push(
          divideSquares(
            squares[level - 1],
            size * divFactor,
            divideByChance(divideChance, level),
          ),
        );
      }
      if (squares[level]) {
        squares[level].forEach((square) => {
          drawSquare(
            square,
            size,
            // rng
            //   .chooseOne(pallete.colors)
            //   .value()
            //   .darken(rng.fuzzy(0, 5))
            //   .toRgbString(),
            colorAtPoint(square).toRgbString(),
          );
        });
      }
    });
  };

  innerDraw(canvas.width, canvas.height);
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
      debounce: 50,

      levels: 2,
      divFactor: 2,
      divideChance: 0.5,
      colorFuzz: 0.05,
    }}
    controls={[
      { key: 'levels', type: 'range', min: 1, max: 8, step: 1 },
      { key: 'divFactor', type: 'range', min: 2, max: 5, step: 1 },
      { key: 'divideChance', type: 'range', min: 0, max: 3, step: 0.05 },
      { key: 'colorFuzz', type: 'range', min: 0, max: 0.5, step: 0.01 },
    ]}
  />
);
