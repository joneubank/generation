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
    const minDim = Math.min(width, height);
    const maxDim = Math.min(width, height);
    const maxRadius = (maxDim / 2) * (1 - buffer);

    const positiveMasks = array(0, circles).map(() => {
      // Position and size are random within bounds:
      // const radius = rng.float(circleMin * maxDim, circleMax * maxDim);
      // const gap = buffer * maxDim + radius;
      // const x = rng.float(gap, canvas.width - gap);
      // const y = rng.float(gap, canvas.height - gap);

      const posTheta = rng.float(0, Math.PI * 2);
      const posRadius = clamp(
        rng.float(0, rng.float() * maxRadius, (x) => Math.pow(x, 0.5)),
        { max: maxRadius },
      );
      const pos = polarToVec2(posTheta, posRadius).add({
        x: canvas.width / 2,
        y: canvas.height / 2 - canvas.height / 8,
      });
      const x = pos.x;
      const y = pos.y;
      const radius =
        circleMax * Math.pow(1 - posRadius / maxRadius, 3) * maxDim;

      return {
        // Random within bounds
        // x: rng.float(gap, canvas.width - gap),
        // y: rng.float(gap, canvas.height - gap),
        x,
        y,
        // Centered with likely distance
        // x: rng.float(gap, canvas.width - gap),
        // y: rng.float(gap, canvas.height - gap),
        // y: canvas.height / 2 + (layers - layer - 1) * 150,
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
        positiveMasks.forEach((mask) => {
          maskDraw.circle(mask);
        });
      });
      rng.pop();

      Layers.combine(solidLayer, maskLayer, 'destination-in');
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
      layers: 21,
      layerAlpha: 0.075,
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
      { key: 'buffer', type: 'range', min: -0.25, max: 0.25, step: 0.01 },

      { type: 'header', title: 'Positive Column' },
      { key: 'circles', type: 'range', min: 0, max: 100, step: 1 },
      { key: 'circleMin', type: 'range', min: 0, max: 1, step: 0.025 },
      { key: 'circleMax', type: 'range', min: 0, max: 1, step: 0.025 },
    ]}
  />
);
