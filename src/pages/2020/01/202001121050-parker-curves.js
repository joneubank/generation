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

const draw = ({ context, pallete, rng, canvas }) => {
  const { rect, circle, path } = Draw(context);
  const layout = Layout(context);
  const sym = Symmetry(context);

  // Uncomment a fill or add a different one to set a background. Default is transparent.
  rect({
    width: canvas.width,
    height: canvas.height,
    fill: '#191919',
    fill: pallete.colors[0].value().toRgbString(),
    fill: '#eee',
  });

  // Move 0,0 to the canvas center:
  context.translate(canvas.width / 2, canvas.height / 2);
  repeat(1, iter => {
    const draw = (width, height) => {
      const xWave = RandomWave(rng, { layers: 8 });
      const yWave = RandomWave(rng, { layers: 8 });
      const xFreq = xWave.freqs[0];
      const yFreq = yWave.freqs[0];
      console.log(xFreq / yFreq, yFreq / xFreq);
      const loopMultiple = 1;
      // const loops =
      //   xFreq > yFreq
      //     ? Math.ceil(xFreq / yFreq) * loopMultiple
      //     : Math.ceil(yFreq / xFreq) * loopMultiple;
      const loops = 4;
      const steps = 10000;

      const fill = 0.9;
      const curveRadius = (Math.min(width, height) * fill) / 2;
      // Add draw stuff here, run it at the end of the sketch method or in a repeating layout.
      const curve = array(0, steps).map(i =>
        Vec2(
          xWave.at((i / steps) * loops) * curveRadius,
          yWave.at((i / steps) * loops) * curveRadius,
        ),
      );
      const color = iter % 2; //(pallete.colors.length - 1);
      // path({
      //   points: curve,
      //   strokeWidth: 13,
      //   stroke: pallete.colors
      //     .slice(1)
      //     [color].value()
      //     .darken(rng.fuzzy(0, 20))
      //     .toRgbString(),
      //   stroke: '#eee',
      // });
      path({
        points: curve,
        strokeWidth: 13,
        stroke: rng
          .chooseOne(pallete.colors.slice(1, 4))
          .value()
          .lighten(rng.fuzzy(10, 10))
          .toRgbString(),
        stroke: '#000',
      });
    };

    // draw(canvas.width, canvas.height);
    layout.grid(3, 3, draw);
  });
};

export default () => (
  <Sketch
    options={{
      // title: '',
      // pallete: null,
      // fullscreen: true,
      width: 2048,
      height: 2048,
      // blend: 'difference',
    }}
    draw={draw}
  />
);
