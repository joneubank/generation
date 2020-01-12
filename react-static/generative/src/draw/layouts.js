import { repeat } from '../utils';
import { grid as dataGrid } from '../data';

const Layout = context => {
  const grid = (x, y, draw, { fitAll = true } = {}) => {
    const spots = dataGrid(x, y);
    const width = fitAll ? canvas.width / x : canvas.width / (x - 1);
    const height = fitAll ? canvas.height / y : canvas.height / (y - 1);

    const translateWidth = fitAll ? canvas.width - width : canvas.width;
    const translateHeight = fitAll ? canvas.height - height : canvas.height;
    const xFitAdjust = fitAll ? width / 2 : 0;
    const yFitAdjust = fitAll ? height / 2 : 0;

    spots.forEach(({ u, v }) => {
      context.resetTransform();
      context.translate(
        translateWidth * u + xFitAdjust,
        translateHeight * v + yFitAdjust,
      );
      draw(width, height);
    });
  };
  return { grid };
};

export default Layout;
