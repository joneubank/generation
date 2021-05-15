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
  const nicePallete = prand.chooseOne(t1000).map((i) => i);

  const {
    gridScale,
    gridWidth,
    // gridHeight,
    lineFill,

    layers,
    layerShift,
    layerAlpha,
    palleteShuffle,
    pathShuffle,

    drawBodies,
    repulsorCount,
    repulsorStrength,
    repulsorClamp,
    attractorCount,
    attractorStrength,
    attractorClamp,
  } = params;
  const gridHeight = gridWidth;

  rng.push('colorShuffle');
  const colors = palleteShuffle ? rng.shuffle(nicePallete) : nicePallete;
  rng.pop();

  // Uncomment a fill or add a different one to set a background. Default is transparent.
  rect({
    width: canvas.width,
    height: canvas.height,
    fill: colors.pop(),
    // fill: '#191919',
  });

  // Move 0,0 to the canvas center:
  // context.translate(canvas.width / 2, canvas.height / 2);

  const draw = (width, height) => {
    // Add draw stuff here, run it at the end of the sketch method or in a repeating layout.
    const minDim = Math.min(width, height);
    const maxDim = Math.min(width, height);

    const maxGrid = Math.max(gridWidth, gridHeight);

    const gridStartPos = Vec2(
      (width * (1 - gridScale)) / 2,
      (height * (1 - gridScale)) / 2,
    );

    const originalNodes = [];
    repeat(gridWidth, (x) => {
      const row = [];
      repeat(gridHeight, (y) => {
        row.push(Vec2(x / (gridWidth - 1), y / (gridHeight - 1)));
      });
      originalNodes.push(row);
    });

    // Apply Node distortions
    const distortedNodes = [];

    rng.push('repulsor generation');
    const repulsors = array(0, repulsorCount).map((i) => ({
      pos: Vec2(rng.float(0, 1), rng.float(0, 1)),
      size: rng.float(0.001, 0.1),
    }));
    rng.pop();
    rng.push('attractor generation');
    const attractors = array(0, attractorCount).map((i) => ({
      pos: Vec2(rng.float(0, 1), rng.float(0, 1)),
      size: rng.float(0.001, 0.1),
    }));
    rng.pop();

    originalNodes.forEach((row) => {
      const distortedRow = [];
      row.forEach((node) => {
        const repulsorDisplacement = repulsors.reduce((acc, repulsor) => {
          const direction = node.subtract(repulsor.pos).normalize();
          const distance = node.subtract(repulsor.pos).magnitude();
          const push = repulsorClamp
            ? clamp(repulsor.size / distance / distance, {
                max: repulsorClamp,
              })
            : repulsor.size / distance / distance;
          return acc.add(direction.scale(push));
        }, Vec2(0, 0));

        const attractorDisplacement = attractors.reduce((acc, attractor) => {
          const direction = attractor.pos.subtract(node);
          const distance = attractor.pos.subtract(node).magnitude();
          const push = clamp(
            attractor.size / (attractor.size + distance * distance * distance),
            { max: 1 },
          );
          const output = acc.add(direction.scale(push));
          return output;
        }, Vec2(0, 0));

        distortedRow.push(
          node
            .add(repulsorDisplacement.scale(repulsorStrength))
            .add(attractorDisplacement.scale(attractorStrength)),
        );
      });
      distortedNodes.push(distortedRow);
    });

    // Draw Bodies
    const drawBody = (body, color) => {
      circle({
        x: body.pos.x * width * gridScale + gridStartPos.x,
        y: body.pos.y * height * gridScale + gridStartPos.y,
        radius: body.size * minDim,
        fill: color,
      });
    };
    const repulsorColor = pallete.next().value().toRgbString();
    const attractorColor = pallete.next().value().toRgbString();
    drawBodies && repulsors.forEach((body) => drawBody(body, repulsorColor));
    drawBodies && attractors.forEach((body) => drawBody(body, attractorColor));

    // Build Paths, collect them then draw at end
    const paths = [];
    repeat(layers, (layer) => {
      const shiftAmount = layerShift * layer * minDim;
      const layerShiftVec = Vec2(shiftAmount, shiftAmount);
      const layerStartPos = gridStartPos.add(layerShiftVec);
      const lineWidth = ((lineFill * minDim) / (maxGrid - 1)) * gridScale;
      const lineColor = tinycolor(colors.pop())
        .setAlpha(layerAlpha)
        .toRgbString();

      // Horizontal Lines
      repeat(gridHeight, (i) => {
        const points = [];
        repeat(gridWidth, (j) => {
          const node = distortedNodes[j][i];
          points.push(
            Vec2(node.x * width, node.y * height)
              .scale(gridScale)
              .add(layerStartPos),
          );
        });
        paths.push({
          points,
          strokeWidth: lineWidth,
          stroke: lineColor,
        });
        // path({
        //   points,
        //   strokeWidth: lineWidth,
        //   stroke: lineColor,
        // });
      });

      // Verticle Lines
      repeat(gridWidth, (j) => {
        const points = [];
        repeat(gridHeight, (i) => {
          const node = distortedNodes[j][i];
          points.push(
            Vec2(node.x * width, node.y * height)
              .scale(gridScale)
              .add(layerStartPos),
          );
        });
        paths.push({
          points,
          strokeWidth: lineWidth,
          stroke: lineColor,
        });
        // path({
        //   points,
        //   strokeWidth: lineWidth,
        //   stroke: lineColor,
        // });
      });
    });
    const orderedPaths = pathShuffle ? rng.shuffle(paths) : paths;

    orderedPaths.forEach((p) => path(p));
  };

  draw(canvas.width, canvas.height);
  // layout.grid(2, 2, draw, { fitAll: true });
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

      gridScale: 0.85,
      gridWidth: 25,
      gridHeight: 25,
      lineFill: 0.25,

      layers: 1,
      layerShift: 0.001,
      layerAlpha: 1,
      palleteShuffle: false,
      pathShuffle: false,

      drawBodies: false,
      repulsorCount: 1,
      repulsorStrength: 0.1,
      repulsorClamp: 0,
      attractorCount: 1,
      attractorStrength: 0.1,
      attractorClamp: 0,
    }}
    controls={[
      { type: 'header', title: 'Grid Control' },
      { key: 'gridScale', type: 'range', min: 0.5, max: 1.5, step: 0.01 },
      { key: 'gridWidth', type: 'range', min: 5, max: 255, step: 1 },
      // { key: 'gridHeight', type: 'range', min: 5, max: 255, step: 1 },
      { key: 'lineFill', type: 'range', min: 0, max: 1, step: 0.01 },

      { type: 'header', title: 'Layers and Colors' },
      { key: 'layers', type: 'range', min: 1, max: 4, step: 1 }, // if you want more than 4 layers you need to add colours beyond the nice pallete limit of 5
      { key: 'layerShift', type: 'range', min: 0, max: 0.25, step: 0.001 },
      { key: 'layerAlpha', type: 'range', min: 0, max: 1, step: 0.01 },
      { key: 'palleteShuffle', type: 'boolean' },
      { key: 'pathShuffle', type: 'boolean' },

      { type: 'header', title: 'Distortions' },
      { key: 'drawBodies', type: 'boolean' },

      { type: 'header', title: 'Repulsors' },
      { key: 'repulsorCount', type: 'range', min: 0, max: 13, step: 1 },
      { key: 'repulsorStrength', type: 'range', min: 0, max: 1, step: 0.01 },
      { key: 'repulsorClamp', type: 'range', min: 0, max: 12, step: 0.05 },

      { type: 'header', title: 'Attractors' },
      { key: 'attractorCount', type: 'range', min: 0, max: 13, step: 1 },
      { key: 'attractorStrength', type: 'range', min: 0, max: 5, step: 0.01 },

      { type: 'header', title: 'Spinners' },
      { key: 'spinnerCount', type: 'range', min: 0, max: 13, step: 1 },
      { key: 'spinnerStrength', type: 'range', min: 0, max: 1, step: 0.01 },
      { key: 'spinnerClamp', type: 'range', min: 0, max: 12, step: 0.05 },
    ]}
  />
);
