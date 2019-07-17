import { polarToVec2 } from './Vec2';

function Spinner(r, phase, period, update = time => {}) {
  this.phase = phase;
  this.r = r;
  this.period = period;
  this.age = 0;

  this.update = function(time) {
    this.age += time;
    update(time, this);
    this.phase += (time / period) * Math.PI * 2;
    return this.vector();
  };

  this.vector = () => polarToVec2(this.phase, this.r);
}

export default Spinner;
