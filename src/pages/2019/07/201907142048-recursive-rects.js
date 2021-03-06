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
  const { rect } = Draw(context);

  const margin = 200;

  const darkJitter = 8;

  const splitMin = 0.25;
  const splitMax = 0.75;
  const horizontalSplitChance = 0.5;

  const rounded = 35;

  const iterations = 19;

  const fillColor = pallete.colors[0];

  // convenience split method to keep random chance consistently defined
  const split = r =>
    // r.split(rng.bool(horizontalSplitChance), rng.float(splitMin, splitMax));
    r.split(r.height < r.width, rng.float(splitMin, splitMax));

  rect({
    width: canvas.width,
    height: canvas.height,
    fill: fillColor.value().toRgbString(),
  });

  const root = Rectangle({
    x: margin,
    y: margin,
    width: canvas.width - margin * 2,
    height: canvas.height - margin * 2,
  });
  const rectangles = split(root);
  for (let i = 0; i < iterations; i++) {
    const victim = rectangles.splice(1, 1)[0];
    const newbies = split(victim);
    rectangles.push(...newbies);
    rectangles.sort((a, b) => a.area - b.area);
    // rectangles.concat(split(rectangles.splice(0,1)));
  }

  // grab a rectangle from the whole frame, defined by 4 numbers (x, y, height, width)
  rectangles.forEach(r => {
    if (r.width > rounded || r.height > rounded) {
      rect({
        ...r,
        // fill: rng
        //   .chooseOne(pallete.colors)
        //   .value()
        //   .darken(rng.fuzzy(darkJitter, darkJitter))
        //   .toRgbString(),
        stroke: fillColor.inverse().toRgbString(),
        strokeWidth: 8,
        round: rounded,
      });
    }
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
      // blend: 'lighten',
    }}
    draw={draw}
  />
);

const Rectangle = ({ x, y, width, height }) => {
  const split = (horizontal, pos) => {
    const r1 = horizontal
      ? Rectangle({ x, y, width: width * pos, height: height })
      : Rectangle({ x, y, width: width, height: height * pos });
    const r2 = horizontal
      ? Rectangle({
          x: x + width * pos,
          y: y,
          width: width * (1 - pos),
          height: height,
        })
      : Rectangle({
          x: x,
          y: y + height * pos,
          width: width,
          height: height * (1 - pos),
        });
    return [r1, r2];
  };

  return {
    x,
    y,
    width,
    height,
    area: (width - x) * (height - y),
    split,
  };
};
