import { tinycolor } from '@thebespokepixel/es-tinycolor';

import hash from '../hash';

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
  const jitter = (x) => {
    const val = value().toRgb();
    
    

  }
  return {
    name,
    value,
    inverse,
    toString,
  };
};
export default Color;
