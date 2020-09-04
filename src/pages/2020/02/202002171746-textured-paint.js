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
import Watercolor from '../../../draw/brushes/watercolor';

const draw = ({ context, pallete, rng, canvas, params }) => {
  const { rect, circle, path } = Draw(context);
  const layout = Layout(context);
  const sym = Symmetry(context);

  const { steps, scale } = params;

  const brush = new Watercolor(rng.next(), { context, canvas });

  // Uncomment a fill or add a different one to set a background. Default is transparent.
  rect({
    width: canvas.width,
    height: canvas.height,
    fill: '#fff',
    // fill: '#191919',
  });

  // Move 0,0 to the canvas center:
  // context.translate(canvas.width / 2, canvas.height / 2);

  const draw = (width, height) => {
    const gap = Math.min(width, height) - Math.min(width, height) * scale;
    const left = gap;
    const right = width - gap;
    const top = gap;
    const bottom = height - gap;

    const strokeWidth = 200;
    context.save();
    // const points = array(5, 20).map(i =>
    //   polarToVec2(i, ((i / 20) * width) / 2),
    // );
    // const points = [
    //   Vec2(rng.int(-width / 2, width) / 2, rng.int(-height / 2, height / 2)),
    //   Vec2(rng.int(-width / 2, width) / 2, rng.int(-height / 2, height / 2)),
    //   Vec2(rng.int(-width / 2, width) / 2, rng.int(-height / 2, height / 2)),
    //   Vec2(rng.int(-width / 2, width) / 2, rng.int(-height / 2, height / 2)),
    //   Vec2(rng.int(-width / 2, width) / 2, rng.int(-height / 2, height / 2)),
    //   Vec2(rng.int(-width / 2, width) / 2, rng.int(-height / 2, height / 2)),
    // ];
    brush.stroke({
      points: [Vec2(left, height / 2 - gap), Vec2(right, height / 2 - gap / 2)],
      color: pallete.next().value(),
      width: strokeWidth,
      // showLine: true,
    });
    brush.stroke({
      points: [Vec2(width / 2 + gap / 2, top), Vec2(width / 2 + gap, bottom)],
      color: pallete.next().value(),
      width: strokeWidth,
      // showLine: true,
    });
    brush.stroke({
      points: [Vec2(width / 2 - gap, top), Vec2(width / 2 - gap / 2, bottom)],
      color: pallete.next().value(),
      width: strokeWidth,
      // showLine: true,
    });

    brush.stroke({
      points: [Vec2(left, height / 2 + gap / 2), Vec2(right, height / 2 + gap)],
      color: pallete.next().value(),
      width: strokeWidth,
      // showLine: true,
    });

    brush.fill({
      points: [Vec2(gap / 2, gap / 2), Vec2(width, gap), Vec2(gap, height)],
      color: pallete.next().value(),
    });

    context.restore();
  };

  draw(canvas.width, canvas.height);
  // repeat(2, () => draw(canvas.width, canvas.height));
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
      steps: 1000,
      scale: 0.8,
    }}
  />
);
