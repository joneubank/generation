// Based on the 2016 drawing machine here: https://robertbalke.de/about/
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

let topAngle = 0;
let leftAngle = 0;
let rightAngle = 0;
let stageAngle = 0;

const angleFromSides = (opposite, a, b) => {
  const c = opposite;
  //c2=a2+b2-2ab cos(C)
  //C = acos( (a2+b2-c2) /2ab)
  return Math.acos((a * a + b * b - c * c) / (2 * a * b));
};

const restart = ({ rng, canvas, params, pallete, context }) => {
  // ===== INITIALIZE ALL THE CONSTANTS FOR A NEW DRAW
  const { rect, circle, path } = Draw(context);
  loopTime = 0;
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
  context.translate(canvas.width / 2, canvas.height / 2);
};

const draw = ({ context, pallete, rng, canvas, params }) => {
  restart({ rng, canvas, params, pallete, context });
  blank({ rng, canvas, params, pallete, context });

  // ===== FIRST FRAME ONLY DRAW
  const { rect, circle, path } = Draw(context);
};

const loop = ({ ticks, time, context, pallete, rng, canvas, params }) => {
  loopTime += time;

  blank({ rng, canvas, params, pallete, context });

  // ===== DRAW EVERY LOOP
  const { rect, circle, path } = Draw(context);
  const {
    speed,

    showMachine,

    machineScale,

    topSpeed,
    topOffset,
    topInitial,
    topPosition,
    leftSpeed,
    leftOffset,
    leftInitial,
    leftPosition,
    rightSpeed,
    rightOffset,
    rightInitial,
    rightPosition,
    stageSpeed,
    stageOffset,
    stageInitial,

    armTopLeftLength,
    armTopRightLength,
    armSideLeftLength,
    armSideLeftPivot,
    armSideRightLength,
    armSideRightPivot,
    armCenterLeftLength,
    armCenterRightLength,
  } = params;
  const steps = ticks * speed;

  const minDim = Math.min(canvas.width, canvas.height) * machineScale;

  // Stage Position (moving 0,0)
  stageAngle += steps * stageSpeed;
  const stagePoint = Vec2(minDim * stageOffset, 0).rotate(stageAngle);

  // Motor positions
  topAngle += steps * topSpeed;
  const topPoint = Vec2(minDim * topOffset, 0)
    .rotate(topAngle)
    .add(topPosition.scale(minDim))
    .add(stagePoint)
    .rotate(stageAngle);

  leftAngle += steps * leftSpeed;
  const leftPoint = Vec2(minDim * leftOffset, 0)
    .rotate(leftAngle)
    .add(leftPosition.scale(minDim))
    .add(stagePoint)
    .rotate(stageAngle);

  rightAngle += steps * rightSpeed;
  const rightPoint = Vec2(minDim * rightOffset, 0)
    .rotate(rightAngle)
    .add(rightPosition.scale(minDim))
    .add(stagePoint)
    .rotate(stageAngle);

  // lets solve some arm positions

  // Top Arms First
  const topLeftOppositeLength = armSideLeftLength * armSideLeftPivot * minDim;
  const topLeftMotorSeparation = topPoint.add(leftPoint.scale(-1)).magnitude();
  const armTopLeftAngle = angleFromSides(
    topLeftOppositeLength,
    armTopLeftLength * minDim,
    topLeftMotorSeparation,
  );

  const armTopLeftJoinPoint = topPoint.add(
    leftPoint
      .add(topPoint.scale(-1))
      .normalize()
      .scale(minDim * armTopLeftLength)
      .rotate(armTopLeftAngle),
  );

  const topRightOppositeLength =
    armSideRightLength * armSideRightPivot * minDim;
  const topRightMotorSeparation = topPoint
    .add(rightPoint.scale(-1))
    .magnitude();
  const armTopRightAngle = angleFromSides(
    topRightOppositeLength,
    armTopRightLength * minDim,
    topRightMotorSeparation,
  );

  const armTopRightJoinPoint = topPoint.add(
    rightPoint
      .add(topPoint.scale(-1))
      .normalize()
      .scale(minDim * armTopRightLength)
      .rotate(-armTopRightAngle),
  );

  // Now Side Arms
  const armSideLeftJoinPoint = armTopLeftJoinPoint.add(
    leftPoint
      .add(armTopLeftJoinPoint.scale(-1))
      .normalize()
      .scale(minDim * armSideLeftLength),
  );

  const armSideRightJoinPoint = armTopRightJoinPoint.add(
    rightPoint
      .add(armTopRightJoinPoint.scale(-1))
      .normalize()
      .scale(minDim * armSideRightLength),
  );

  // Now center arms
  const sideJoinSeparation = armSideRightJoinPoint
    .add(armSideLeftJoinPoint.scale(-1))
    .magnitude();

  const sideLeftJoinAngle = angleFromSides(
    minDim * armCenterRightLength,
    minDim * armCenterLeftLength,
    sideJoinSeparation,
  );
  const drawPoint = armSideLeftJoinPoint.add(
    armSideRightJoinPoint
      .add(armSideLeftJoinPoint.scale(-1))
      .normalize()
      .scale(minDim * armCenterLeftLength)
      .rotate(-sideLeftJoinAngle),
  );
  points.push(drawPoint);
  // circle({ ...drawPoint.obj, radius: 3, fill: '#222' });
  path({ points, strokeWidth: 2, stroke: '#111' });

  if (showMachine) {
    circle({ ...topPoint.obj, fill: '#f00', radius: 8 });
    circle({ ...leftPoint.obj, fill: '#0f0', radius: 8 });
    circle({ ...rightPoint.obj, fill: '#00f', radius: 8 });
    path({
      points: [topPoint, armTopLeftJoinPoint],
      stroke: '#111',
      strokeWidth: 4,
    });
    path({
      points: [topPoint, armTopRightJoinPoint],
      stroke: '#111',
      strokeWidth: 4,
    });
    path({
      points: [armTopLeftJoinPoint, armSideLeftJoinPoint],
      stroke: '#111',
      strokeWidth: 4,
    });
    path({
      points: [armTopRightJoinPoint, armSideRightJoinPoint],
      stroke: '#111',
      strokeWidth: 4,
    });
    path({
      points: [armSideLeftJoinPoint, drawPoint, armSideRightJoinPoint],
      stroke: '#111',
      strokeWidth: 4,
    });
  }
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
      //speed = miliseconds per step
      speed: 1000 / 10, // denominator is number of steps per second
      showMachine: false,

      machineScale: 3.3,
      //There are 4 motors, each with speed, offset, and initial angle
      //   all but the stage have an x/y position. The x/y given here is scaled by minDim with 0,0 at the image center
      // speed = radians per step
      // offset = ratio of minDim, turns into pixels from motor center
      // initial = initial radians of the motor at loop start.
      topSpeed: (((Math.PI * 2) / 60 / 1000) * 1) / 1.5, //bracketted number is inverse of seconds per full rotation
      topOffset: 1 / 20,
      topInitial: 0,
      topPosition: Vec2(0, -0.3),
      leftSpeed: ((Math.PI * 2) / 60 / 1000) * (1 / 4), //bracketted number is inverse of seconds per full rotation,
      leftOffset: 1 / 25,
      leftInitial: 0,
      leftPosition: Vec2(-0.3, 0.1),
      rightSpeed: ((Math.PI * 2) / 60 / 1000) * (1 / 3), //bracketted number is inverse of seconds per full rotation,
      rightOffset: 1 / 30,
      rightInitial: 0,
      rightPosition: Vec2(0.3, 0.1),
      stageSpeed: ((Math.PI * 2 - 0.01) / 60 / 1000) * (1 / 1.5 / 2 / 3), //bracketted number is inverse of seconds per full rotation,
      stageOffset: 0.0,
      stageInitial: 0,

      // There are 6 arms, each with a fixed length.
      // Two of the arms also have a pivot position somwhere along that length.

      armTopLeftLength: 0.4,
      armTopRightLength: 0.4,
      armSideLeftLength: 0.5,
      armSideLeftPivot: 0.6,
      armSideRightLength: 0.5,
      armSideRightPivot: 0.6,
      armCenterLeftLength: 0.35,
      armCenterRightLength: 0.35,
    }}
  />
);
