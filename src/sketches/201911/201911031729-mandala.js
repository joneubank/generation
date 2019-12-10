import { tinycolor } from '@thebespokepixel/es-tinycolor';

import Random from '../../random';

import Draw from '../../draw';
// import Layout from '../../draw/layouts';
import Symmetry from '../../draw/symmetry';
import { repeat } from '../../utils';

export const options = () => ({
  // title: '',
  // pallete: null,
  // fullscreen: true,
  width: 2048,
  height: 2048,
  // blend: 'difference',
});

export const sketch = ({ context, rng, pallete, meta, canvas }) => {
  const { rect, circle, path } = Draw(context);
  // const layout = Layout(context);
  const sym = Symmetry(context);

  // Uncomment a fill or add a different one to set a background. Default is transparent.
  rect({
    width: canvas.width,
    height: canvas.height,
    // fill: tinycolor('hsv(25,8%,95%)').toRgbString(),
    fill: '#191919',
    // fill: '#eee',
    // fill: pallete
    //   .next()
    //   .value()
    //   .toRgbString(),
  });

  // Move 0,0 to the canvas center:
  context.translate(canvas.width / 2, canvas.height / 2);

  // Params:
  const params = {
    centerDotMin: 25,
    centerDotMax: 50,
    dotRadiusMax: 10,
    dotRadiusMin: 5,
    dotFillMin: 0.5,
    dotFillMax: 0.75,

    spokesMin: 6,
    spokesMax: 14,
  };

  const filledDot = ({ x, y, radius, fill, baseColor, fillColor }) => {
    circle({
      x,
      y,
      radius: radius,
      fill: baseColor,
    });
    circle({
      x,
      y,
      radius: radius * fill,
      fill: fillColor,
    });
  };

  const dottedCircle = ({
    x = 0,
    y = 0,
    radius,
    dotRadius,
    baseColor,
    fillColor,
    fillRatio = 0.3,
    rotation = 0,
    buffer = 0,
  }) => {
    const circumference = 2 * Math.PI * radius;
    const dotCount = Math.floor(circumference / 2 / (dotRadius + buffer));

    repeat(dotCount, i =>
      fillColor
        ? filledDot({
            x: Math.cos((Math.PI * 2 * i) / dotCount + rotation) * radius,
            y: Math.sin((Math.PI * 2 * i) / dotCount + rotation) * radius,
            radius: dotRadius,
            fill: fillRatio,
            baseColor,
            fillColor,
          })
        : circle({
            x: Math.cos((Math.PI * 2 * i) / dotCount) * radius,
            y: Math.sin((Math.PI * 2 * i) / dotCount) * radius,
            radius: dotRadius,
            fill: baseColor,
          }),
    );
  };

  const circlesOut = ({ innerRadius, outerRadius, dotRadius, colors = [] }) => {
    const maxRadius =
      outerRadius ||
      Math.floor(
        Math.sqrt(canvas.width * canvas.width + canvas.height * canvas.height),
      );

    const buffer = 2;
    const radiusDelta = dotRadius * 2;

    let ringRad = innerRadius;
    const circumference = 2 * Math.PI * ringRad;
    let ringDotCount = Math.floor(circumference / 2 / (dotRadius + buffer));
    let i = 2;

    while (ringRad < maxRadius) {
      dottedCircle({
        radius: ringRad,
        dotRadius,
        baseColor: colors[i % colors.length].value().toRgbString(),
        buffer,
        rotation: 100,
      });
      i++;
      ringRad += radiusDelta;
    }
    const ringCount = Math.ceil((maxRadius - innerRadius) / radiusDelta);

    // repeat(ringCount, i => {
    // });
  };

  const draw = seed => () => {
    const rand = Random(seed);

    filledDot({
      x: 0,
      y: 0,
      radius: rand.int(params.centerDotMin, params.centerDotMax),
      fill: rand.float(params.dotFillMin, params.dotFillMax),
      baseColor: pallete.colors[0].value().toRgbString(),
      fillColor: pallete.colors[1].value().toRgbString(),
    });

    // Draw several dotted rings
    let lastRing = 0;
    // repeat(rand.int(2, 4), () => {
    //   lastRing = rand.int(lastRing + 100, lastRing + 300);

    //   dottedCircle({
    //     x: 0,
    //     y: 0,
    //     radius: lastRing,
    //     dotRadius: rand.int(40, 70),
    //     baseColor: rand
    //       .chooseOne(pallete.colors)
    //       .value()
    //       .toRgbString(),
    //     fillRatio: rand.float(params.dotFillMin, params.dotFillMax),
    //     fillColor: rand.bool(0.5)
    //       ? rand
    //           .chooseOne(pallete.colors)
    //           .value()
    //           .toRgbString()
    //       : null,
    //     rotation: rand.float(0, 0.2),
    //   });
    // });

    circlesOut({
      innerRadius: lastRing + 100,
      colors: pallete.colors,
      dotRadius: rand.int(params.dotRadiusMin, params.dotRadiusMax),
    });
  };

  draw(rng.next())();
};
