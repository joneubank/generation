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

import { default as t1000 } from 'nice-color-palettes/1000';

const draw = ({ context, pallete, rng, canvas, params }) => {
  const { rect, circle, path } = Draw(context);
  const layout = Layout(context);

  const prand = Random(pallete.colors[0].rgb());
  const nicePallete = prand.shuffle(
    _.clone(prand.chooseOne(t1000).map((i) => i)),
  );

  const {
    steps,
    lineFill,
    linePitch,
    lines,
    heightFill,
    waveMax,
    waveFreq,
    topFreq,
    bottomFreq,
    topPower,
    bottomPower,
    gradientSpread,
  } = params;

  const c1 = nicePallete.pop();
  const c2 = nicePallete.pop();
  const c3 = nicePallete.pop();
  const gradient = tinygradient([
    { color: c1, pos: 0 },
    { color: c2, pos: 0.5 - gradientSpread },
    {
      color: tinycolor(c2).darken(5).toRgbString(),
      pos: 0.5 - gradientSpread * 0.2,
    },
    {
      color: tinycolor(c2).darken(5).toRgbString(),
      pos: 0.5 + gradientSpread * 0.2,
    },
    { color: c2, pos: 0.6 + gradientSpread },
    { color: c1, pos: 1 },
  ]);

  // Uncomment a fill or add a different one to set a background. Default is transparent.
  rect({
    width: canvas.width,
    height: canvas.height,
    fill: c3,
    fill: '#eee',
    fill: '#191919',
  });

  // Move 0,0 to the canvas center:
  context.translate(canvas.width / 2, canvas.height / 2);

  const draw = (width, height) => {
    // Add draw stuff here, run it at the end of the sketch method or in a repeating layout.
    const minDim = Math.min(width, height);
    const maxDim = Math.min(width, height);

    const topWave = RandomWave(rng, { layers: 20 });
    const bottomWave = RandomWave(rng, { layers: 20 });

    const drawHeight = height * heightFill;
    const linesCover = drawHeight * lineFill;
    const lineThickness = Math.floor(linesCover / lines);

    repeat(lines, (line) => {
      const lineRatio = line / (lines - 1);
      const baseY =
        lineRatio < 0.5
          ? Math.pow(Math.sin(lineRatio * Math.PI), bottomPower) * drawHeight -
            drawHeight
          : drawHeight -
            Math.pow(Math.sin(lineRatio * Math.PI), topPower) * drawHeight;
      const points = array(0, steps).map((i) => {
        const ratio = i / steps;
        const x = width * ratio - width / 2;
        const angle = Math.PI * 2 * ratio * waveFreq;

        const y =
          Math.sin(ratio * (Math.PI - 0.7) + 0.35) *
          (((topWave.at(angle * topFreq) * lineRatio +
            bottomWave.at(
              angle * bottomFreq + (lineRatio * Math.PI * 2 * 0) / 12,
            ) *
              (1 - lineRatio)) *
            height *
            waveMax) /
            2 -
            baseY);
        return Vec2(x, y);
      });
      path({
        points,
        stroke: '#eee',
        stroke: gradient.rgbAt(lineRatio),
        strokeWidth: lineThickness,
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
      width: 16 * 200,
      height: 9 * 200,
      // blend: 'lighten',
    }}
    draw={draw}
    params={{
      steps: 1000,
      waveMax: 0.8,
      waveFreq: 0.2,
      topFreq: 1.2,
      bottomFreq: 0.7,
      lineFill: 1600 / 1000,
      lines: 80,
      heightFill: 0.3,
      topPower: 0.8,
      bottomPower: 0.5,
      // topPower: 1,
      // bottomPower: 1,
      gradientSpread: 0.3,
    }}
  />
);
