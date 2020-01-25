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
  const { rect, circle, path } = Draw(context);
  const layout = Layout(context);
  const sym = Symmetry(context);

  // Uncomment a fill or add a different one to set a background. Default is transparent.

  // Move 0,0 to the canvas center:
  context.translate(canvas.width / 2, canvas.height / 2);

  const draw = (width, height) => {
    // Add draw stuff here, run it at the end of the sketch method or in a repeating layout.

    // Draw some stripey background
    const backgroundFill = pallete.colors[0];
    const backgroundStripe = pallete.colors[1].value().toRgbString();
    const outlineColor = pallete.colors[2].value().toRgbString();
    const fillColor = pallete.colors[2]
      .value()
      .darken(10)
      .toRgbString();
    const stripeWidth = rng.int(13, 21);
    const stripePitch = rng.float(1.5, 2.5);
    const stripeAngle = rng.float(-Math.PI / 4, Math.PI / 4);
    const yComponentOfAngle = width * Math.tan(stripeAngle);

    rect({
      x: -width / 2,
      y: -height / 2,
      width: width,
      height: height,
      fill: backgroundFill
        .value()
        .darken(0)
        .toRgbString(),
    });

    let tempY = rng.int(0, stripeWidth) - Math.abs(yComponentOfAngle);
    while (tempY < height + Math.abs(yComponentOfAngle)) {
      const pathPoints = [
        { x: -width / 2, y: -height / 2 + tempY },
        { x: width / 2, y: -height / 2 + tempY - yComponentOfAngle },
        {
          x: width / 2,
          y: -height / 2 + tempY + stripeWidth - yComponentOfAngle,
        },
        { x: -width / 2, y: -height / 2 + tempY + stripeWidth },
      ];

      path({ points: pathPoints, fill: outlineColor });
      tempY += stripeWidth + stripeWidth * stripePitch;
    }

    const scale = 0.5;

    const count = rng.int(15, 23);
    const arms = 2;
    const minRad = 40;
    const maxRad = 100;
    const jitter = 10;
    const outlineWidth = 15;

    const angleShift = rng.float(0, Math.PI * 2);

    const circles = [];
    repeat(arms, arm =>
      repeat(count, i => {
        const pos = polarToVec2(
          (i / count + arm / arms) * 2 * Math.PI + angleShift,
          (i / count) * width * scale,
        );

        circles.push({
          x: rng.fuzzy(pos.x, jitter),
          y: rng.fuzzy(pos.y, jitter),
          radius: rng.int(minRad, maxRad),
        });
      }),
    );

    circles.forEach(data => {
      circle({
        ...data,
        radius: data.radius + outlineWidth,
        fill: outlineColor,
      });
    });
    circles.forEach(data => {
      circle({ ...data, fill: fillColor });
    });

    // Fill Stuff
    const fillCanvas = document.createElement('canvas');
    const fillContext = fillCanvas.getContext('2d');
    fillCanvas.width = width;
    fillCanvas.height = height;
    fillContext.setTransform(context.getTransform());

    const { rect: fillRect, points: fillPath, circle: fillCircle } = Draw(
      fillContext,
    );

    circles.forEach(data => {
      fillCircle({ ...data, radius: data.radius - outlineWidth, fill: '#000' });
    });
    fillContext.globalCompositeOperation = 'source-atop';
    fillRect({
      x: -width / 2,
      y: -height / 2,
      width: width,
      height: height,
      fill: backgroundFill.value().toRgbString(),
    });

    // let tempY = rng.int(0,stripeWidth)-Math.abs(yComponentOfAngle);
    // while(tempY < height+Math.abs(yComponentOfAngle)) {
    //   const pathPoints = [
    //     {x:-width/2, y:-height/2+tempY},
    //     {x:width/2, y:-height/2+tempY-yComponentOfAngle},
    //     {x:width/2, y:-height/2+tempY+stripeWidth-yComponentOfAngle},
    //     {x:-width/2, y:-height/2+tempY+stripeWidth},
    //   ];

    //   fillPath({points:pathPoints, fill:outlineColor});
    //   tempY+=stripeWidth+stripeWidth*stripePitch;
    // }
    context.drawImage(fillCanvas, -width / 2, -height / 2, width, height);
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
      // width: 2560,
      // height: 1600,
      width: 1080,
      height: 1080,
      // blend: 'difference',
    }}
    draw={draw}
  />
);
