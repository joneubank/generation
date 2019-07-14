const Draw = context => {
  console.log('Draw');
  const circle = ({
    x = 0,
    y = 0,
    radius,
    fill = null,
    strokeWidth = 1,
    stroke = null,
  }) => {
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI, false);
    if (fill) {
      context.fillStyle = fill;
      context.fill();
    }
    if (stroke) {
      context.lineWidth = strokeWidth;
      context.strokeStyle = stroke;
      context.stroke();
    }
  };

  const rect = ({
    x = 0,
    y = 0,
    width,
    height,
    fill,
    stroke,
    strokeWidth = 1,
  }) => {
    if (fill) {
      context.fillStyle = fill;
      context.fillRect(x, y, width, height);
    }
    if (stroke) {
      context.lineWidth = strokeWidth;
      context.strokeStyle = stroke;
      context.strokeRect(x, y, width, height);
    }
  };

  const path = ({ path = [], strokeWidth, stroke, close = false }) => {
    context.beginPath();
    path.forEach(({ x, y }, i) => {
      if (i === 0) {
        context.moveTo(x, y);
      } else {
        context.lineTo(x, y);
      }
    });
    if (close) {
      context.lineTo(path[0].x, path[0].y);
    }
    if (stroke) {
      context.strokeStyle = stroke;
      context.lineWidth = strokeWidth;
      context.stroke();
    }
  };

  return {
    circle,
    rect,
    path,
  };
};

export default Draw;
