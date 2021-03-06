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
    steps,
    particleCount,

    momentumDecay,
    initialMomentumMax,

    gravityRate,
    rotateGravity,

    repellorCount,
    repellForceMin,
    repellForceMax,
    showRepellors,

    attractorCount,
    attractForceMin,
    attractForceMax,
    attractStuckDistance,
    showAttractors,

    twisterCount,
    twistForceMin,
    twistForceMax,
    showTwisters,
  } = params;

  // Uncomment a fill or add a different one to set a background. Default is transparent.
  rect({
    width: canvas.width,
    height: canvas.height,
    fill: '#eee',
    fill: '#191919',
  });

  // Move 0,0 to the canvas center:
  // context.translate(canvas.width / 2, canvas.height / 2);

  const draw = (width, height) => {
    // Add draw stuff here, run it at the end of the sketch method or in a repeating layout.
    const minDim = Math.min(width, height);
    const maxDim = Math.min(width, height);

    const gravityAngle = rotateGravity ? rng.float(0, Math.PI * 2) : 0;
    const gravity = Vec2(0, gravityRate).scale(maxDim).rotate(gravityAngle);

    const generateParticles = (count) => {
      const minX = gravity.x > 0 ? -gravity.x * (2 - momentumDecay) * steps : 0;
      const maxX =
        gravity.x < 0 ? width - gravity.x * (2 - momentumDecay) * steps : width;
      const minY = gravity.y > 0 ? -gravity.y * (2 - momentumDecay) * steps : 0;
      const maxY =
        gravity.y < 0
          ? height - gravity.y * (2 - momentumDecay) * steps
          : height;
      return array(0, count).map((i) => [
        Vec2(rng.float(minX, maxX), rng.float(minY, maxY)),
      ]);
    };

    const generateRepellors = (count) => {
      return array(0, count).map((i) => {
        return {
          pos: Vec2(rng.float(0, width), rng.float(0, height)),
          force: rng.float(repellForceMin, repellForceMax) * maxDim,
        };
      });
      // return [{ pos: Vec2(width / 2, height / 2), force:  * maxDim }];
    };

    const generateAttractors = (count) => {
      return array(0, count).map((i) => {
        return {
          pos: Vec2(rng.float(0, width), rng.float(0, height)),
          force: rng.float(attractForceMin, attractForceMax) * maxDim,
        };
      });
      // return [{ pos: Vec2(width / 2, height / 2), force:  * maxDim }];
    };

    const generateTwisters = (count) => {
      return array(0, count).map((i) => {
        return {
          pos: Vec2(rng.float(0, width), rng.float(0, height)),
          force: twistForceMax * maxDim,
          force: rng.float(twistForceMin, twistForceMax) * maxDim,
          rotation: rng.fuzzy(0.1, 0.05) * (rng.bool() ? 1 : -1),
        };
      });
      // return [{ pos: Vec2(width / 2, height / 2), force:  * maxDim }];
    };

    const repellors = generateRepellors(repellorCount);
    const attractors = generateAttractors(attractorCount);
    const twisters = generateTwisters(twisterCount);
    const particles = generateParticles(particleCount);

    const initialParticleVector = () =>
      gravity.scale(initialMomentumMax).rotate(Math.PI * 2 * rng.float(0, 1));

    const moveParticles = (step) => {
      particles.forEach((particle) => {
        // 1. Find Start Postiion
        const latest = particle[particle.length - 1];

        // 2. Get current momentum
        const momentum =
          particle.length > 1
            ? particle[particle.length - 1].add(
                particle[particle.length - 2].scale(-1),
              )
            : initialParticleVector();

        // 3. Get force from repellors
        let repellForce = Vec2(0, 0);
        repellors.forEach((repellor) => {
          const separation = latest.add(repellor.pos.scale(-1));
          const force = separation
            .scale(repellor.force)
            .scale(1 / Math.pow(separation.magnitude(), 2));
          repellForce = repellForce.add(force);
        });

        // 4. Get force from attractors
        let stuck = false;
        let attractForce = Vec2(0, 0);
        attractors.forEach((attractor) => {
          const separation = attractor.pos.add(latest.scale(-1));
          if (separation.magnitude() < attractStuckDistance * maxDim) {
            stuck = true;
          }
          const force = separation
            .scale(attractor.force)
            .scale(1 / Math.pow(separation.magnitude(), 2));
          attractForce = attractForce.add(force);
        });

        if (!stuck) {
          // calculate new movement
          let vector = gravity
            .add(momentum.scale(1 - momentumDecay))
            .add(repellForce)
            .add(attractForce);
          // 5. Get Twister Force
          let twistForce = Vec2(0, 0);
          twisters.forEach((twister) => {
            const separation = latest.add(twister.pos.scale(-1));
            const force = twister.force / Math.pow(separation.magnitude(), 1);
            vector = vector.rotate(twister.rotation * force * Math.PI * 2);
          });

          particle.push(latest.add(vector));
        }
      });
    };

    repeat(steps, (step) => moveParticles(step));

    if (showRepellors) {
      repellors.forEach((r) => {
        circle({ ...r.pos.obj, fill: 'red', radius: (r.force * 1) / 2 });
      });
    }
    if (showAttractors) {
      attractors.forEach((r) => {
        circle({ ...r.pos.obj, fill: 'green', radius: (r.force * 1) / 2 });
      });
    }
    if (showTwisters) {
      twisters.forEach((r) => {
        circle({ ...r.pos.obj, fill: 'blue', radius: (r.force * 1) / 2 });
      });
    }
    particles.forEach((points) => {
      path({
        points,
        stroke: '#191919',
        stroke: tinycolor('#eee').setAlpha(0.3).toRgbString(),
        stroke: rng.chooseOne(nicePallete),
        stroke: tinycolor(rng.chooseOne(nicePallete))
          .setAlpha(0.8)
          .toRgbString(),
        strokeWidth: 5,
      });
    });
  };

  draw(canvas.width, canvas.height);
  // layout.grid(4, 4, draw, { fitAll: true });
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
      steps: 20,
      particleCount: 2000,

      momentumDecay: 0.6,
      initialMomentumMax: 0 / 10000,

      rotateGravity: false,
      gravityRate: 40 / 10000,

      repellorCount: 8,
      repellForceMin: 500 / 10000,
      repellForceMax: 3000 / 10000,
      showRepellors: false,

      attractorCount: 8,
      attractForceMin: 500 / 10000,
      attractForceMax: 1000 / 10000,
      attractStuckDistance: 9 / 1000,
      showAttractors: false,

      twisterCount: 10,
      twistForceMin: 200 / 10000,
      twistForceMax: 500 / 10000,
      showTwisters: false,
    }}
  />
);
