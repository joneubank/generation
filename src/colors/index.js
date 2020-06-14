import { tinycolor } from '@thebespokepixel/es-tinycolor';
import Random from '../random';

import { line } from '../data';
import hash from '../utils/hash';

const ffffffff = 4294967295;

const chunkConverter = (chunk, max) => {
  return Math.floor((parseInt(chunk, 16) * max) / ffffffff);
};

export const hashColor = (hash) => {
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
  return line(steps).map((i) =>
    tinycolor({
      r: rgb1.r * i + rgb2.r * (1 - i),
      g: rgb1.g * i + rgb2.g * (1 - i),
      b: rgb1.b * i + rgb2.b * (1 - i),
    }),
  );
};

export const mix = (c1, c2, ratio) => {
  const rgb1 = c1.toRgb();
  const rgb2 = c2.toRgb();
  const inverse = 1 - ratio;
  return tinycolor({
    r: rgb1.r * ratio + rgb2.r * inverse,
    g: rgb1.g * ratio + rgb2.g * inverse,
    b: rgb1.b * ratio + rgb2.b * inverse,
  });
};

const Color = (h, s, v) => {
  const color = tinycolor({ h, s, v });
  const name = Random(color.toHsvString()).label();
  const value = () => tinycolor(color.toRgb());
  const rgb = () => color.toRgbString();
  const hsv = () => color.toHsvString();
  const inverse = () => {
    const rgb = value().toRgb();
    const irgb = { r: 255 - rgb.r, g: 255 - rgb.g, b: 255 - rgb.b };
    return tinycolor(irgb);
  };
  const mix = (color, ratio) => {
    const inverse = 1 - ratio;
    const rgb = value().toRgb();
    const otherRgb = color.toRgb();
    const out = tinycolor({
      r: rgb.r * ratio + otherRgb.r * inverse,
      g: rgb.g * ratio + otherRgb.g * inverse,
      b: rgb.b * ratio + otherRgb.b * inverse,
    });
    return out;
  };
  const toString = () => {
    // TODO: Add an input to specify a different color coding (rgb?) for this output
    const code = value().toHsvString();
    return `Color:${name}=${code}`;
  };
  return {
    name,
    value,
    inverse,
    toString,
    mix,
    rgb,
    hsv,
  };
};
export default Color;
