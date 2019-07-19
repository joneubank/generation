import { repeat } from '../utils';
import { grid as dataGrid } from '../data';

const Layout = context => {
  const grid = (x, y, draw, {} = {}) => {
    const spots = dataGrid(x, y);
    const width = canvas.width / (x - 1);
    const height = canvas.height / (y - 1);

    spots.forEach(({ u, v }) => {
      context.resetTransform();
      context.translate(canvas.width * u, canvas.height * v);
      draw(width, height);
    });
  };
  return { grid };
};

export default Layout;
