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
import Layers from '../../../draw/layers';

import { default as t1000 } from 'nice-color-palettes/1000';

const colorSchemes = ['mono', 'random', 'gradient'];

const draw = ({ context, pallete, rng, canvas, params }) => {
  const { rect, circle, path } = Draw(context);
  const layout = Layout(context);

  const prand = Random(pallete.colors[0].rgb());
  const nicePallete = prand.chooseOne(t1000).map((i) => i);

  const {
    layers,
    layerAlpha,
    circles,
    circleMin,
    circleMax,
    buffer,
    colorScheme,
    layerShift,
  } = params;

  const fadeColor = tinycolor('black').setAlpha(layerAlpha).toRgbString();
  const singleColor = prand.chooseOne(nicePallete);
  const gradient = tinygradient([
    prand.color().value().toRgbString(),
    tinycolor(singleColor).toRgbString(),
  ]);

  const getBackColor = () => {
    switch (colorScheme) {
      case 'gradient':
        return gradient.rgbAt(0);
      default:
        return singleColor;
    }
  };

  const getFadeColor = () => {
    switch (colorScheme) {
      default:
        return fadeColor;
    }
  };

  const getLayerColor = (layer) => {
    switch (colorScheme) {
      case 'gradient':
        const ratio = layer / (layers - 1);
        return gradient.rgbAt(ratio);
      case 'mono':
      //fall through to default
      default:
        return singleColor;
    }
    return singleColor;
  };
  // Uncomment a fill or add a different one to set a background. Default is transparent.
  rect({
    width: canvas.width,
    height: canvas.height,
    fill: prand.chooseOne(nicePallete),
    fill: 'black',
    fill: getBackColor(),
  });

  // Move 0,0 to the canvas center:
  // context.translate(canvas.width / 2, canvas.height / 2);

  const draw = (width, height) => {
    // Add draw stuff here, run it at the end of the sketch method or in a repeating layout.
    const minDim = Math.min(width, height);
    const maxDim = Math.min(width, height);

    const masks = array(0, circles).map(() => {
      const radius = rng.float(circleMin * maxDim, circleMax * maxDim);
      const gap = buffer * maxDim + radius;

      return {
        x: rng.float(gap, canvas.width - gap),
        // y: canvas.height / 2 + (layers - layer - 1) * 150,
        y: rng.float(gap, canvas.height - gap),
        radius,
        fill: 'black',
      };
    });

    repeat(layers, (layer) => {
      const layerColor = prand.chooseOne(nicePallete);
      rect({
        width: canvas.width,
        height: canvas.height,
        fill: getFadeColor(),
      });
      const solidLayer = Layers.make(canvas);
      Draw(solidLayer.context).rect({
        width: canvas.width,
        height: canvas.height,
        fill: getLayerColor(layer),
      });
      const maskLayer = Layers.make(solidLayer.canvas);
      maskLayer.context.translate(
        0,
        (layers - layer - 1) * layerShift * maxDim,
      );
      const maskDraw = Draw(maskLayer.context);

      rng.push(`layer${layer}`);
      repeat(circles, (circle) => {
        // maskDraw.circle({
        //   x: rng.float(0, canvas.width),
        //   // y: canvas.height / 2 + (layers - layer - 1) * 150,
        //   y: rng.float(0, canvas.height),
        //   radius: rng.float(circleMin * maxDim, circleMax * maxDim),
        //   fill: 'black',
        // });
        masks.forEach((mask) => {
          maskDraw.circle(mask);
        });
      });
      rng.pop();

      Layers.combine(solidLayer, maskLayer, 'destination-out');
      Layers.combine({ canvas, context }, solidLayer);
    });
  };

  draw(canvas.width, canvas.height);
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
      debounce: 250,
      layers: 1,
      layerAlpha: 0.1,
      layerShift: 0.025,
      colorScheme: 'mono',

      circles: 10,
      circleMin: 0.1,
      circleMax: 0.2,
      buffer: 0.1,
    }}
    controls={[
      { type: 'header', title: 'Layers' },
      { key: 'layers', type: 'range', min: 0, max: 100, step: 1 },
      { key: 'layerAlpha', type: 'range', min: 0, max: 1, step: 0.025 },
      { key: 'layerShift', type: 'range', min: 0, max: 0.2, step: 0.005 },
      { key: 'colorScheme', type: 'list', options: colorSchemes },

      { type: 'header', title: 'Mask' },
      { key: 'circles', type: 'range', min: 0, max: 100, step: 1 },
      { key: 'circleMin', type: 'range', min: 0, max: 1, step: 0.025 },
      { key: 'circleMax', type: 'range', min: 0, max: 1, step: 0.025 },
      { key: 'buffer', type: 'range', min: -0.25, max: 0.25, step: 0.01 },
    ]}
  />
);
