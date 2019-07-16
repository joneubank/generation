import Draw from '../draw';
import { repeat } from '../utils';
import Vec2 from '../data/Vec2';

export const options = () => ({
  // title: '',
  // pallete: null,
  // fullscreen: true,
  // width: null,
  // height: null,
});

const steps = 10;

export const sketch = ({ context, rng, pallete, meta, canvas }) => {
  const { rect, circle, path } = Draw(context);

  // background
  rect({ width: canvas.width, height: canvas.height, fill: 'white' });

  const Bot = () => {
    let pos = Vec2(100, 100);
    let direction = Vec2(1, 1).normalize();
    let target = Vec2(canvas.width / 2, canvas.height / 2);
    let speed = 100;

    pos.x += speed;
    pos.y += speed;

    return {
      pos,
      direction,
      target,
      speed,
      move,
    };
  };
  const move = bot => {
    bot.pos = bot.pos.add(bot.pos.direction(bot.target).scale(bot.speed));
  };

  const bot = Bot();
  const botColor = 'black';

  circle({ x: bot.pos.x, y: bot.pos.y, radius: 3, fill: botColor });

  repeat(steps, i => {
    console.log(bot.pos.x);
    move(bot);
    circle({ x: bot.pos.x, y: bot.pos.y, radius: 3, fill: botColor });
  });
};
