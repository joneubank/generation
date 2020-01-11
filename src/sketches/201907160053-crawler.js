import Draw from '../draw';
import { repeat } from '../utils';
import Vec2 from '../data/Vec2';
import { tinycolor } from '@thebespokepixel/es-tinycolor';

export const options = () => ({
  // title: '',
  // pallete: null,
  // fullscreen: true,
  width: 2000,
  height: 2000,
});

const steps = 10;

export const sketch = ({ context, rng, pallete, meta, canvas }) => {
  const { rect, circle, path } = Draw(context);

  // background
  rect({
    width: canvas.width,
    height: canvas.height,
    fill: tinycolor('hsv(0,0%,95%)').toRgbString(),
  });

  const initialTarget = Vec2(
    rng.int(100, canvas.width - 100),
    rng.int(100, canvas.height - 100),
  );
  const Bot = () => {
    let pos = Vec2(
      rng.int(100, canvas.width - 100),
      rng.int(100, canvas.height - 100),
    );
    let direction = Vec2(0, 1).normalize();
    let target = initialTarget;
    let speed = 4;
    let inertia = 20;
    let jitter = 0;

    return {
      pos,
      direction,
      target,
      speed,
      inertia,
      jitter,
    };
  };
  const move = bot => {
    const vector = bot.pos
      .direction(bot.target)
      .add(bot.direction.scale(bot.inertia))
      .add(Vec2(rng.next(), rng.next()).scale(bot.jitter))
      .normalize();
    bot.direction = vector;
    bot.pos = bot.pos.add(vector.scale(bot.speed));
  };

  const bots = [...Array(pallete.colors.length).keys()].map(() => Bot());

  const maxTargets = rng.int(1, 4);

  let iterations = 0;

  const loop = () => {
    console.log(++iterations);
    bots.forEach((bot, i) => {
      const start = bot.pos.obj;
      move(bot);
      const end = bot.pos.obj;
      // circle({
      //   x: bot.pos.x,
      //   y: bot.pos.y,
      //   radius: 3,
      //   fill: pallete.colors[i].rgb,
      // });
      // path({
      //   path: [start, end],
      //   stroke: pallete.colors[i].rgb,
      //   strokeWidth: 10,
      // });
      circle({ ...end, radius: 5, fill: '#333' });
    });
    if (iterations % 1000 === 0) {
      const nextTarget = Vec2(
        rng.int(100, canvas.width - 100),
        rng.int(100, canvas.height - 100),
      );
      bots.forEach(bot => (bot.target = nextTarget));
    }
  };

  repeat(maxTargets * 1000, i => loop());

  // const interval = setInterval(() => {
  //   loop();
  //   if (iterations === maxTargets * 1000) {
  //     clearInterval(interval);
  //   }
  // }, 1);
};