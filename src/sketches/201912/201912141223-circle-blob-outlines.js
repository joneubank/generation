import { tinycolor } from '@thebespokepixel/es-tinycolor';
import tinygradient from 'tinygradient';

import Draw from '../../draw';
import Layout from '../../draw/layouts';
import Symmetry from '../../draw/symmetry';

import { grid, circleSegments } from '../../data';
import { simplex, perlin } from '../../data/noise';
import Vec2, { polarToVec2 } from '../../data/Vec2';

import { clamp, repeat } from '../../utils';

export const options = () => ({
  // title: '',
  // pallete: null,
  // fullscreen: true,
  // width: 2560,
  // height: 1600,
  width: 1080,
  height: 1080,
  // blend: 'difference',
});

export const sketch = ({ context, rng, pallete, meta, canvas }) => {
  const { rect, circle, path } = Draw(context);
  const layout = Layout(context);
  const sym = Symmetry(context);
  
  const backgroundColor = '#eee';
  const outlineColor = '#191919'
  // Uncomment a fill or add a different one to set a background. Default is transparent.
  rect({
    width: canvas.width,
    height: canvas.height,
    // fill: tinycolor('hsv(25,8%,95%)').toRgbString(),
    // fill: '#191919',
    // fill: '#eee',
    fill: backgroundColor,
  });

  // Move 0,0 to the canvas center:
  context.translate(canvas.width / 2, canvas.height / 2);

  const draw = (width, height) => {
    // Add draw stuff here, run it at the end of the sketch method or in a repeating layout.

    const scale = 0.9;

    const count = rng.int(8,15);
    const minRad = 50;
    const maxRad = 150;
    const blobJitter = 250;
    const outlineWidth = 20;
    const circles = [];
    repeat(count, i=>{
      circles.push({
        x: rng.fuzzy(0,blobJitter),
        y: rng.fuzzy(0,blobJitter),
        radius: rng.int(minRad, maxRad),
      });
    });
    console.log(circles)

    circles.forEach(data=>{
      circle({...data, radius:data.radius+outlineWidth, fill:outlineColor});
    });
    circles.forEach(data=>{
      circle({...data, fill:backgroundColor
      })
    });
    circles.forEach(data=>{
      circle({...data, radius:data.radius-outlineWidth, fill:outlineColor})
    });

  };

  draw(canvas.width, canvas.height);
  // layout.grid(4, 4, draw);
};
