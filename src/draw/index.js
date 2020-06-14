const Draw = (context) => {
  const circle = ({
    x = 0,
    y = 0,
    radius,
    fill = null,
    strokeWidth = 1,
    stroke = null,
    start = 0,
    arc = 1,
    useOrigin = false,
  }) => {
    context.beginPath();
    if (useOrigin) {
      context.moveTo(x, y);
    }
    context.arc(
      x,
      y,
      radius,
      start * 2 * Math.PI,
      start * 2 * Math.PI + arc * 2 * Math.PI,
      false,
    );
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
    points = [],
    strokeWidth,
    stroke,
    fill,
    close = false,
    cap = 'round',
    join = 'round',
  }) => {
    context.beginPath();
    context.lineJoin = join;
    context.lineCap = cap;
    points.forEach(({ x, y }, i) => {
      if (i === 0) {
        context.moveTo(x, y);
      } else {
        context.lineTo(x, y);
      }
    });
    if (close) {
      context.lineTo(points[0].x, points[0].y);
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

  // const poly = ({segments, radius, jitter = 0, cap,}) => {

  // }

  /* This method of coloring a line is awful, extremely slow for long lines*/
  const colorPath = ({
    points = [],
    strokeWidth,
    stroke,
    fill,
    close = false,
    cap = 'round',
  }) => {
    context.lineCap = cap;
    points.forEach(({ x, y, stroke, strokeWidth }, i) => {
      if (i >= 1) {
        context.beginPath();
        const start = points[Math.max(0, i - 2)];
        const mid = points[i - 1];
        const end = { x, y };
        context.moveTo(start.x, start.y);
        context.lineTo(mid.x, mid.y);
        context.lineTo(end.x, end.y);

        if (stroke) {
          context.strokeStyle = stroke;
          context.lineWidth = strokeWidth;
          context.stroke();
        }
      }
    });
    if (close) {
      context.lineTo(points[0].x, points[0].y);
    }
    if (fill) {
      context.fillStyle = fill;
      context.fill();
    }
    // if (stroke) {
    //   context.strokeStyle = stroke;
    //   context.lineWidth = strokeWidth;
    //   context.stroke();
    // }
  };

  const bezier = ({
    start,
    end,
    control1,
    control2,
    stroke,
    strokeWidth,
    fill,
    close = false,
    cap = 'round',
    join = 'round',
  }) => {
    context.beginPath();
    context.lineJoin = join;
    context.lineCap = cap;

    context.moveTo(start.x, start.y);
    context.bezierCurveTo(
      control1.x,
      control1.y,
      control2.x,
      control2.y,
      end.x,
      end.y,
    );

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
    colorPath,
    bezier,
  };
};

export default Draw;
