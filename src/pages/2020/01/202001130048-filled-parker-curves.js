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
  const bg = pallete.colors[0].value().toRgbString();
  rect({
    width: canvas.width,
    height: canvas.height,
    fill: '#191919',
    fill: pallete.colors[0].value().toRgbString(),
    fill: '#eee',
    fill: bg,
  });

  // Move 0,0 to the canvas center:
  context.translate(canvas.width / 2, canvas.height / 2);
  const draw = (width, height) => {
    const xWave = RandomWave(rng, { layers: 1 });
    const yWave = RandomWave(rng, { layers: 1 });
    const xWave2 = RandomWave(rng, { layers: 1 });
    const yWave2 = RandomWave(rng, { layers: 1 });
    const xFreq = xWave.freqs[0];
    const yFreq = yWave.freqs[0];
    const loopMultiple = 1;
    // const loops =
    //   xFreq > yFreq
    //     ? Math.ceil(xFreq / yFreq) * loopMultiple
    //     : Math.ceil(yFreq / xFreq) * loopMultiple;
    const loops = 0.717;
    const steps = 400;

    const fill = 0.9;
    const curveRadius = (Math.min(width, height) * fill) / 2;
    // Add draw stuff here, run it at the end of the sketch method or in a repeating layout.
    const curve1 = array(0, steps).map(i =>
      Vec2(
        xWave.at((i / steps) * loops) * curveRadius,
        yWave.at((i / steps) * loops) * curveRadius,
      ),
    );
    const curve2 = array(0, steps).map(i =>
      Vec2(
        xWave2.at((i / steps) * loops) * curveRadius,
        yWave2.at((i / steps) * loops) * curveRadius,
      ),
    );
    // path({
    //   path: curve,
    //   strokeWidth: 13,
    //   stroke: pallete.colors
    //     .slice(1)
    //     [color].value()
    //     .darken(rng.fuzzy(0, 20))
    //     .toRgbString(),
    //   stroke: '#eee',
    // });

    const gradient = tinygradient([
      // { color: '#eee', pos: 0 },
      { color: bg, pos: 0 },
      { color: pallete.colors[1].value().toRgbString(), pos: 0.5 },
      // { color: pallete.colors[2].value().toRgbString(), pos: 1 },
      { color: bg, pos: 1 },
      // { color: pallete.colors[3].value().toRgbString(), pos: 1 },
    ]);

    const stroke = rng
      .chooseOne(pallete.colors.slice(1, 4))
      .value()
      .lighten(rng.fuzzy(10, 10))
      .toRgbString();
    repeat(steps - 1, step => {
      path({
        path: [curve1[step - (step % 2)], curve2[step + 1 - ((step + 1) % 2)]],
        strokeWidth: 13,
        stroke: '#191919',
        stroke: gradient.rgbAt(step / steps),
        // stroke: rng
        //   .chooseOne(pallete.colors.slice(0, 3))
        //   .value()
        //   .lighten(rng.fuzzy(10, 10))
        //   .toRgbString(),
        // stroke,
      });
    });
  };

  draw(canvas.width, canvas.height);
  // layout.grid(3, 3, draw);
};

export default () => (
  <Sketch
    options={{
      // title: '',
      // pallete: null,
      // fullscreen: true,
      width: 2048,
      height: 2048,
      // blend: 'darken',
    }}
    draw={draw}
  />
);
