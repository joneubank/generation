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
  
  const fillColor = '#eee';
  const outlineColor = pallete.colors[2].value().toRgbString();
  // Uncomment a fill or add a different one to set a background. Default is transparent.
  
  // Move 0,0 to the canvas center:
  context.translate(canvas.width / 2, canvas.height / 2);
  
  const draw = (width, height) => {
    // Add draw stuff here, run it at the end of the sketch method or in a repeating layout.
    
    // Draw some stripey background
    const backgroundFill = pallete.colors[0].value().toRgbString();
    const backgroundStripe = pallete.colors[1].value().toRgbString();
    const stripeWidth = rng.int(13,34);
    const stripePitch = rng.float(1.5, 4.5);
    const stripeAngle = rng.float(-Math.PI/4,Math.PI/4);
    const yComponentOfAngle = width*Math.tan(stripeAngle);
    
    rect({
      x: -width/2,
      y: -height/2,
      width: width,
      height: height,
      fill: backgroundFill,
    });

    let tempY = rng.int(0,stripeWidth)-Math.abs(yComponentOfAngle);
    while(tempY < height+Math.abs(yComponentOfAngle)) {
      const pathPoints = [
        {x:-width/2, y:-height/2+tempY},
        {x:width/2, y:-height/2+tempY-yComponentOfAngle},
        {x:width/2, y:-height/2+tempY+stripeWidth-yComponentOfAngle},
        {x:-width/2, y:-height/2+tempY+stripeWidth},
      ];
      
      path({path:pathPoints, fill:outlineColor});
        tempY+=stripeWidth+stripeWidth*stripePitch;
      }

    



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
      circle({...data, fill:backgroundFill
      })
    });
    circles.forEach(data=>{
      circle({...data, radius:data.radius-outlineWidth, fill:outlineColor})
    });

  };

  draw(canvas.width, canvas.height);
  // layout.grid(4, 4, draw);
};
