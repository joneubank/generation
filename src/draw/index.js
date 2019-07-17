const Draw = context => {
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
    corners = {},
    round,
  }) => {
    // rounded corner dims
    const topLeft = corners.topLeft || round || 0;
    const topRight = corners.topRight || round || 0;
    const bottomLeft = corners.bottomLeft || round || 0;
    const bottomRight = corners.bottomRight || round || 0;

    // Do rounded corners as path
    if (topLeft || topRight || bottomLeft || bottomRight) {
      context.beginPath();
      context.moveTo(x + topLeft, y);
      context.lineTo(x + width - topRight, y);
      context.quadraticCurveTo(x + width, y, x + width, y + topRight);
      context.lineTo(x + width, y + height - bottomRight);
      context.quadraticCurveTo(
        x + width,
        y + height,
        x + width - bottomRight,
        y + height,
      );
      context.lineTo(x + bottomLeft, y + height);
      context.quadraticCurveTo(x, y + height, x, y + height - bottomLeft);
      context.lineTo(x, y + topLeft);
      context.quadraticCurveTo(x, y, x + topLeft, y);
      context.closePath();
      if (fill) {
        context.fillStyle = fill;
        context.fill();
      }
      if (stroke) {
        context.lineWidth = strokeWidth;
        context.strokeStyle = stroke;
        context.stroke();
      }
    } else {
      if (fill) {
        context.fillStyle = fill;
        context.fillRect(x, y, width, height);
      }
      if (stroke) {
        context.lineWidth = strokeWidth;
        context.strokeStyle = stroke;
        context.strokeRect(x, y, width, height);
      }
    }
  };

  const path = ({
    path = [],
    strokeWidth,
    stroke,
    fill,
    close = false,
    cap = 'round',
  }) => {
    context.beginPath();
    context.lineCap = cap;
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
    if (fill) {
      context.fillStyle = fill;
      context.fill();
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
