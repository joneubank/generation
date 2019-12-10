import { repeat } from '../utils';

const Symmetry = context => {
  const arc = (draw, sections, { mirror = true } = {}) => {
    repeat(sections, i => {
      const angle = (2 * Math.PI * i) / sections;
      context.rotate(angle);
      draw(i);
      context.rotate(-angle);
    });
  };

  return { arc };
};

export default Symmetry;
