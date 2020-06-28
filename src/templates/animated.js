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

// ===== CONSTANTS UPDATED EVERY LOOP
let loopTime = 0;
let points = [];

const restart = ({ rng, canvas, params, pallete, context }) => {
  // ===== INITIALIZE ALL THE CONSTANTS FOR A NEW DRAW
  loopTime = 0;
  points = [];
};

const blank = ({ rng, canvas, params, pallete, context }) => {
  // ===== DRAW BLANK TO START THE DRAWING AND EVERY FRAME
  const { rect, circle, path } = Draw(context);

  context.resetTransform();

  rect({
    width: canvas.width,
    height: canvas.height,
    fill: pallete.colors[0].value().toRgbString(),
    fill: '#191919',
    fill: '#eee',
  });

  // Move 0,0 to the canvas center:
  // context.translate(canvas.width / 2, canvas.height / 2);
};

const draw = ({ context, pallete, rng, canvas, params }) => {
  restart({ rng, canvas, params, pallete, context });
  blank({ rng, canvas, params, pallete, context });

  // ===== FIRST FRAME ONLY DRAW
  const { rect, circle, path } = Draw(context);
};

const loop = ({ speed, time, context, pallete, rng, canvas, params }) => {
  loopTime += speed * params.speed;
  blank({ rng, canvas, params, pallete, context });

  // ===== DRAW EVERY LOOP
  const { rect, circle, path } = Draw(context);
};

export default () => (
  <Sketch
    options={{
      // title: '',
      // pallete: null,
      // fullscreen: true,
      width: 2048,
      height: 2048,
      // blend: 'difference',
    }}
    draw={draw}
    loop={loop}
    params={{
      scale: 0.95,
      speed: 100,
      length: 200,
    }}
  />
);
