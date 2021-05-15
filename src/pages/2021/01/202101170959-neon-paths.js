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
    gridWidth,
    gridHeight,
    pathWidth,
    layers,
    shift,
    maxPathLength,
    nodeCount,
  } = params;

  // Uncomment a fill or add a different one to set a background. Default is transparent.
  // rect({
  //   width: canvas.width,
  //   height: canvas.height,
  //   fill: '#000',
  //   // fill: '#191919',
  // });

  // Move 0,0 to the canvas center:
  // context.translate(canvas.width / 2, canvas.height / 2);

  const draw = (width, height) => {
    // Add draw stuff here, run it at the end of the sketch method or in a repeating layout.
    const minDim = Math.min(width, height);
    const maxDim = Math.min(width, height);

    const stepWidth = canvas.width / gridWidth;
    const stepHeight = canvas.width / gridHeight;

    const circleDistortion = (origin, shift) => (vec) => {
      const diff = vec.subtract(origin);
      const radius = diff.magnitude();
      const maxShift = 2 * pathWidth;
      const push =
        radius === 0
          ? maxShift
          : clamp((1 / radius) * shift, { max: maxShift });
      return vec.add(diff.normalize.scale(push));
    };

    const linearPush = (push) => (vec) => vec.add(push);
    const randomScatter = (max) => (vec) =>
      linearPush(
        Vec2(rng.float(), rng.float()).normalize().scale(rng.float(-max, max)),
      )(vec);

    const drawDotsLayer = (color, field = (vec) => vec) => {
      repeat(gridWidth, (x) => {
        repeat(gridHeight, (y) => {
          const inputVec = Vec2(
            x * stepWidth + stepWidth / 2,
            y * stepHeight + stepHeight / 2,
          );
          const outputVec = field(inputVec);
          circle({
            x: outputVec.x,
            y: outputVec.y,
            radius: pathWidth,
            fill: color,
          });
        });
      });
    };
    const drawPathLayer = (color, distortion = (vec) => vec) => {
      // const nodes = array(0, gridWidth).map(() =>
      //   array(0, gridHeight).map(() => false),
      // );

      // A path will be structured as a list of Vec2 nodes
      const paths = [];

      const nodes = [];
      repeat(gridWidth, (x) => {
        repeat(gridHeight, (y) => {
          nodes.push(Vec2(x, y));
        });
      });
      let nodeQueue = rng.shuffle(nodes).slice(0, nodeCount);
      console.log('length', nodeQueue);
      const useNode = (node) => {
        nodeQueue = nodeQueue.filter(
          (i) => !(i.x === node.x && i.y === node.y),
        );
      };
      const findNodeNeighbours = (node) => {
        const x = node.x;
        const y = node.y;
        return nodeQueue.filter(
          (i) => i.x >= x - 1 && i.x <= x + 1 && i.y >= y - 1 && i.y <= y + 1,
        );
      };

      const createPath = () => {
        const path = [];
        // To make a path:
        // Select a random node to start - remove node from list of remaining (or mark as used)
        let current = nodeQueue.shift();
        useNode(current);
        path.push(current);

        let count = 0;
        const countMax = nodeQueue.length;

        // Repeat process of adding nodes until no adjacent left or max path length hit
        while (
          count < countMax &&
          (path.length < maxPathLength || maxPathLength < 0)
        ) {
          count += 1;

          // Get list of all adjacent nodes that have not yet been used (adjacent is orthagonal or diagonal)
          const neighbours = findNodeNeighbours(current);

          if (neighbours.length === 0) {
            // if no unused adjacent, end path (return)
            return path;
          } else {
            // else add an adjacent node at random
            current = rng.chooseOne(neighbours);
            useNode(current);
            path.push(current);
          }
        }

        return path;
      };
      while (nodeQueue.length > 0) {
        paths.push(createPath());
        console.log(paths);
      }

      paths.forEach((nodes) => {
        const points = nodes.map((node) => {
          const pixelPoint = Vec2(node.x * stepWidth, node.y * stepHeight).add(
            Vec2(stepWidth / 2, stepHeight / 2),
          );
          return distortion(pixelPoint);
        });
        if (points.length === 1) {
          circle({
            x: points[0].x,
            y: points[0].y,
            radius: pathWidth / 2,
            fill: color,
          });
        }
        path({
          points,
          strokeWidth: pathWidth,
          stroke: color,
        });
      });
    };
    const baseHue = prand.float(0, 360);
    repeat(layers, (i) => {
      drawPathLayer(
        tinycolor({
          h: (baseHue + (i * 360) / layers) % 360,
          s: 1,
          v: 1,
        }).toRgbString(),
        linearPush(Vec2(shift * i, shift * i)),
      );
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
      width: 2048,
      height: 2048,
      blend: 'lighter',
    }}
    draw={draw}
    params={{
      debounce: 250,
      gridWidth: 8,
      gridHeight: 8,
      pathWidth: 21,
      layers: 3,
      shift: 5,
      maxPathLength: -1,
      nodeCount: 100,
    }}
    controls={[
      { key: 'gridWidth', type: 'range', min: 3, max: 55, step: 1 },
      { key: 'gridHeight', type: 'range', min: 3, max: 55, step: 1 },
      { key: 'pathWidth', type: 'range', min: 1, max: 255, step: 1 },
      { key: 'layers', type: 'range', min: 1, max: 8, step: 1 },
      { key: 'shift', type: 'range', min: 0, max: 300, step: 1 },
      { key: 'maxPathLength', type: 'range', min: -1, max: 100, step: 1 },
      { key: 'nodeCount', type: 'range', min: 1, max: 1000, step: 1 },
    ]}
  />
);
