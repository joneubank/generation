import { tinycolor } from '@thebespokepixel/es-tinycolor';

import { line } from '../data';
import hash from '../utils/hash';

const ffffffff = 4294967295;

const chunkConverter = (chunk, max) => {
  return Math.floor((parseInt(chunk, 16) * max) / ffffffff);
};

export const hashColor = hash => {
  // assumes 32 character md5 hash
  const h = chunkConverter(hash.substring(0, 8), 360);
  const s = chunkConverter(hash.substring(8, 16), 100);
  const v = chunkConverter(hash.substring(16, 24), 100);

  const hsv = `hsv(${h}, ${s}%, ${v}%)`;
  return tinycolor(hsv);
};

export const gradient = (c1, c2, steps) => {
  const rgb1 = c1.toRgb();
  const rgb2 = c2.toRgb();
  return line(steps).map(i =>
    tinycolor({
      r: rgb1.r * i + rgb2.r * (1 - i),
      g: rgb1.g * i + rgb2.g * (1 - i),
      b: rgb1.b * i + rgb2.b * (1 - i),
    }),
  );
};

const Color = name => {
  const color = hashColor(hash(name));
  const value = () => tinycolor(color.toRgb());
  const inverse = () => {
    const rgb = value().toRgb();
    const irgb = { r: 255 - rgb.r, g: 255 - rgb.g, b: 255 - rgb.b };
    return tinycolor(irgb);
  };
  const toString = () => {
    // TODO: Add an input to specify a different color coding (rgb?) for this output
    const code = value().toHsvString();
    return `Color:${name}=${code}`;
  };
  const rgb = value().toRgbString();
  return {
    name,
    value,
    inverse,
    toString,
    rgb,
  };
};
export default Color;
