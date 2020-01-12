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
import Vec2 from '../../../data/Vec2';
import { repeat, clamp, array } from '../../../utils';
import Random from '../../../random';

const draw = ({ context, pallete, rng, canvas }) => {
  const { rect, circle, path } = Draw(context);

  let backgroundColor = pallete.next();
  // .darken(100);

  const colorCount = 1; //rng.int(1, 4);
  const colors = [...Array(colorCount).keys()].map(() => pallete.next());
  const draw = (width, height) => {
    const tempC = backgroundColor;
    backgroundColor = colors[0];
    colors[0] = tempC;
    rect({
      x: -width / 2,
      y: -height / 2,
      width: width,
      height: height,
      // fill: tinycolor('hsv(25,8%,95%)').toRgbString(),
      // fill: '#191919',
      // fill: '#eee',

      fill: backgroundColor.value().toRgbString(),
    });
    // context.translate(width / 2, height / 2);
    const layers = rng.int(colorCount, colorCount * 2);

    const innerRadius = rng.int(height * 0.025, height * 0.05);
    const innerGap = 25;

    const outerRadius = ((width - innerRadius - innerGap) / 2) * 0.95;

    const layerHalfWidth =
      ((outerRadius - innerRadius - innerGap) * 0.8) / layers;

    const tailStrokeWidth = rng.int(height * 0.003, height * 0.01);
    const tailStrokes = Math.floor((layerHalfWidth * 1.5) / tailStrokeWidth);
    const handStrokeWidth = tailStrokeWidth * 1.25;

    const layerOuterWidth = layer => outerRadius - layerHalfWidth * layer;

    //draw gradients
    const gradients = colors.map(color =>
      tinygradient([
        color.value().toRgbString(),
        backgroundColor.value().toRgbString(),
        // '#eee',
      ]).rgb(tailStrokes),
    );
    let tempAngle = rng.float(0, 1);
    const layerAngles = [...Array(layers).keys()].map(
      layer => tempAngle + rng.float(-0.25, 0.25),
      //   {
      //   tempAngle = tempAngle - rng.float(-0.25, 0.25);
      //   return tempAngle;
      // });
    );
    repeat(layers, layer => {
      repeat(tailStrokes, i => {
        const start = layerAngles[layer];
        const arcLength = 0.5 + rng.float(-0.15, 0.15);
        circle({
          radius: layerOuterWidth(layer) - i * tailStrokeWidth + i,
          stroke: gradients[layer % colorCount][i].toRgbString(),
          strokeWidth: tailStrokeWidth,
          start,
          arc: arcLength,
        });
      });
    });

    // draw 'hands'
    repeat(layers, i => {
      const angle = layerAngles[i];
      const outterEnd = Vec2(
        layerOuterWidth(i) + tailStrokeWidth / 2,
        0,
      ).rotate(angle * 2 * Math.PI);
      const innerEnd = Vec2(innerRadius + innerGap, 0).rotate(
        angle * 2 * Math.PI,
      );
      path({
        path: [innerEnd, outterEnd],
        strokeWidth: handStrokeWidth,
        stroke: colors[i % colorCount].value().toRgbString(),
        cap: 'none',
      });
    });
    //draw center circle
    circle({
      x: 0,
      y: 0,
      radius: innerRadius,
      fill: colors[0].value().toRgbString(),
    });
  };

  // draw(canvas.width, canvas.height);
  const layout = Layout(context);
  layout.grid(3, 3, draw, { fitAll: false });
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
  />
);
