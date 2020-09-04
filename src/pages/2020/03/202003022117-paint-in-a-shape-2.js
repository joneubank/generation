import React from 'react';
import tinygradient from 'tinygradient';
import { tinycolor } from '@thebespokepixel/es-tinycolor';
import _ from 'lodash';
import * as niceColors from 'nice-color-palettes/1000';

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
import Layers from '../../../draw/layers';

const draw = ({ context, pallete, rng, canvas, params }) => {
  const { rect, circle, path } = Draw(context);
  const layout = Layout(context);
  const sym = Symmetry(context);

  const { steps, scale } = params;

  const nicePallete = Random(pallete.colors[0].rgb()).chooseOne(
    niceColors.default,
  );

  // Uncomment a fill or add a different one to set a background. Default is transparent.
  rect({
    width: canvas.width,
    height: canvas.height,
    fill: nicePallete[0],
    fill: '#eee',
    fill: '#191919',
  });

  // Move 0,0 to the canvas center:
  // context.translate(canvas.width / 2, canvas.height / 2);

  const draw = (width, height) => {
    // Add draw stuff here, run it at the end of the sketch method or in a repeating layout.
    const minDim = Math.min(width, height);

    const colors = 5;
    const sideLength = minDim * scale;
    const sectionHeight = sideLength / colors;
    const halfLength = sideLength / 2;
    const colorLayer = Layers.make(canvas);
    const colorLayerRect = Draw(colorLayer.context).rect;
    colorLayerRect({
      width: canvas.width,
      height: canvas.height,
      fill: nicePallete[0],
      fill: '#191919',
      fill: '#eee',
    });
    repeat(colors, i => {
      if (i !== 0) {
        const color = nicePallete[5 - i];
        const points = [
          Vec2(halfLength, -halfLength),
          Vec2(-halfLength, -halfLength),
          Vec2(-halfLength, -halfLength + sectionHeight * (colors - i)),
          Vec2(halfLength, -halfLength + sectionHeight * (colors - i)),
        ].map(point => point.add(Vec2(width / 2, height / 2)));

        const brush = new Watercolor(rng.next(), colorLayer);

        brush.fill({ points, color: tinycolor(color) });
      }
    });

    const mask = Layers.make(canvas);
    const maskCircle = Draw(mask.context).circle;
    maskCircle({
      x: width / 2,
      y: height / 2,
      radius: (minDim / 2) * scale * 0.95,
      fill: '#000',
    });
    Layers.combine(colorLayer, mask, 'destination-in');
    Layers.combine({ canvas, context }, colorLayer);
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
      scale: 0.9,
    }}
  />
);
