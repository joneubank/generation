import Vec2, { polarToVec2 } from '../Vec2';
//Math reference: https://diego.assencio.com/?index=1500c66ae7ab27bb0106467c68feebc6

const DoublePendulum = ({
  x = 0,
  y = 0,
  timeStep = 1,
  l1,
  l2,
  a1,
  a2,
  a1dot = 0,
  a2dot = 0,
  m1 = 1,
  m2 = 1,
}) => {
  let _a1 = a1;
  let _a2 = a2;
  let _a1dot = a1dot;
  let _a2dot = a2dot;
  const origin = Vec2(x, y);

  const get = () => {
    // find p1 position
    const p1 = Vec2(0, l1).rotate(_a1);
    const p2 = Vec2(0, l2).rotate(_a2);
    return {
      p1: p1.add(origin),
      p2: p1.add(p2).add(origin),
      a1: _a1,
      a2: _a2,
      a1dot: _a1dot,
      a2dot: _a2dot,
      m1,
      m2,
    };
  };

  const next = (t = timeStep) => {
    _a2dot += (-Math.sin(_a2)+_a1dot) * t;
    _a1dot += (-Math.sin(_a1) + _a2dot) * t;
    _a1 += _a1dot;
    _a2 += _a2dot;
    return get();
  };
  return {
    get,
    next,
  };
};

export default DoublePendulum;
