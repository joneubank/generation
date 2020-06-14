import React from 'react';
import tinygradient from 'tinygradient';
import { tinycolor } from '@thebespokepixel/es-tinycolor';
import _ from 'lodash';
import * as tumult from 'tumult';

import { default as t1000 } from 'nice-color-palettes/1000';

import Sketch from '../../../components/Sketch';
import Draw from '../../../draw';
import Layout from '../../../draw/layouts';
import Symmetry from '../../../draw/symmetry';
import RandomWave from '../../../data/RandomWave';
import { line, grid } from '../../../data';
import Vec2, { polarToVec2 } from '../../../data/Vec2';
import { repeat, clamp, array } from '../../../utils';
import Random from '../../../random';

const draw = ({ context, pallete, rng, canvas, params }) => {
  const { rect, circle, path } = Draw(context);
  const layout = Layout(context);
  const sym = Symmetry(context);

  const { steps, nodes, stepSize, startRadius } = params;

  const walkDirections = [
    Vec2(0, 1),
    Vec2(1, 0),
    Vec2(1, 1),
    Vec2(0, -1),
    Vec2(-1, 0),
    Vec2(-1, -1),
    Vec2(-1, 1),
    Vec2(1, -1),
  ].map((i) => i.normalize());

  // Uncomment a fill or add a different one to set a background. Default is transparent.
  rect({
    width: canvas.width,
    height: canvas.height,
    fill: '#eee',
    fill: '#000',
  });

  // Move 0,0 to the canvas center:
  context.translate(canvas.width / 2, canvas.height / 2);

  const rand = Random(pallete.next().rgb());
  const nicePallete = rand.chooseOne(t1000).map((i) => i);
  const draw = (width, height) => {
    // Add draw stuff here, run it at the end of the sketch method or in a repeating layout.
    let points = array(0, nodes).map((i) =>
      Vec2(1, 0)
        .rotate((Math.PI * 2 * i) / nodes)
        .scale(width / 3),
    );
    // path({
    //   points,
    //   close: true,
    //   stroke: '#eee',
    //   strokeWidth: 5,
    // });
    const selection = rng.int(0, nicePallete.length - 1);
    const color = tinycolor(nicePallete[selection]).toHsv();
    nicePallete.splice(selection, 1);

    const h = color.h;
    const s = color.s;
    repeat(steps, (step) => {
      points = points.map((point) =>
        point.add(rng.chooseOne(walkDirections).scale(stepSize)),
      );
      path({
        points,
        close: true,
        stroke: tinycolor({ h, s, v: 1 - step / steps })
          .setAlpha(0.8)
          .toRgbString(),
        strokeWidth: 5,
      });
    });
    // path({
    //   points,
    //   close: true,
    //   stroke: tinycolor({ h, s, v: 100 }).toRgbString(),
    //   strokeWidth: 5,
    // });
  };

  // draw(canvas.width, canvas.height);
  layout.grid(2, 2, draw);
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
      nodes: 144,
      steps: 89,
      stepSize: 13,
      startRadius: 750,
    }}
  />
);
