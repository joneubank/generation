const magnitude = ({ x, y } = {}) => Math.sqrt(x * x + y * y);
const normalize = ({ x, y } = {}) => {
  const M = magnitude({ x, y });
  return {
    x: x / M,
    y: y / M,
  };
};

const difference = (start, end) => Vec2(end.x - start.x, end.y - start.y);
const add = (a, b) => Vec2(a.x + b.x, a.y + b.y);
const scale = (vector, factor) => {
  return Vec2(vector.x * factor, vector.y * factor);
};

const rotate = (theta, { x, y }) =>
  Vec2(
    x * Math.cos(theta) - y * Math.sin(theta),
    y * Math.cos(theta) + x * Math.sin(theta),
  );

export const polarToVec2 = (theta, r) =>
  Vec2(r * Math.cos(theta), r * Math.sin(theta));

const Vec2 = (x, y) => {
  const obj = { x, y };

  const _magnitude = () => magnitude(obj);
  const _normalize = () => {
    const normal = normalize(obj);
    return Vec2(normal.x, normal.y);
  };

  const delta = other => difference(obj, other);
  const direction = target => delta(target).normalize();

  const subtract = other => difference(other, obj);
  const _add = other => add(obj, other);
  const _scale = factor => scale(obj, factor);
  const _rotate = theta => rotate(theta, obj);

  return {
    x,
    y,
    obj,
    magnitude: _magnitude,
    normalize: _normalize,

    delta,
    direction,

    subtract,
    add: _add,
    scale: _scale,
    rotate: _rotate,
  };
};
export default Vec2;
