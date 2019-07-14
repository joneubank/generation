const Draw = context => {
  console.log('Draw');
  const circle = ({
    x,
    y,
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

  return {
    circle,
  };
};

export default Draw;
