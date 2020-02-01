import RandomWave from './RandomWave';
import Vec2 from './Vec2';

const ParkerCurve = (rng, { order = 2 }) => {
  const xWave = RandomWave(rng, { layers: order });
  const yWave = RandomWave(rng, { layers: order });

  const at = rads => Vec2(xWave.at(rads), yWave.at(rads));
  return { at };
};

export default ParkerCurve;
