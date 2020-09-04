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

import * as niceColors from 'nice-color-palettes';
import Watercolor from '../../../draw/brushes/watercolor';

const draw = ({ context, pallete, rng, canvas, params }) => {
  const { rect, circle, path } = Draw(context);
  const layout = Layout(context);
  const sym = Symmetry(context);

  const { steps, scale } = params;

  const nicePallete = Random(pallete.colors[0].rgb()).chooseOne(
    niceColors.default,
  );
  const brush = new Watercolor(rng.next(), { context, canvas });

  // Uncomment a fill or add a different one to set a background. Default is transparent.
  rect({
    width: canvas.width,
    height: canvas.height,
    fill: '#191919',
    fill: '#eee',
    fill: nicePallete[0],
  });

  // Move 0,0 to the canvas center:
  // context.translate(canvas.width / 2, canvas.height / 2);

  const draw = (width, height) => {
    // Add draw stuff here, run it at the end of the sketch method or in a repeating layout.

    const colors = 4;
    const minDim = Math.min(width, height);
    const sideLength = minDim * scale;
    const sectionHeight = sideLength / colors;
    const halfLength = sideLength / 2;
    repeat(colors, i => {
      const color = nicePallete[5 - i];
      const points = [
        Vec2(halfLength, halfLength),
        Vec2(-halfLength, halfLength),
        Vec2(-halfLength, halfLength - sectionHeight * (colors - i)),
        Vec2(halfLength, halfLength - sectionHeight * (colors - i)),
      ].map(point => point.add(Vec2(width / 2, height / 2)));
      repeat(1, () => brush.fill({ points, color: tinycolor(color) }));
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
      steps: 10000,
      scale: 0.7,
    }}
  />
);
