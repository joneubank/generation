import { tinycolor } from '@thebespokepixel/es-tinycolor';

import Draw from '../';
import Vec2, { polarToVec2 } from '../../data/Vec2';
import { repeat, clamp } from '../../utils';

import Random, { distributions } from '../../random';

const jitterScaling = 0.7;
const desiredSegmentLength = 100;

const normalShift = 0.15;
const normalConfig = {
  skew: 1,
  min: -normalShift,
  max: 1 + normalShift,
};

const normal = (p1, p2) => {};

const dot = (a, b) => a.x * b.x + a.y * b.y;

const clockwiseAngle = (a, b) =>
  Math.atan2(a.x * b.y - a.y * b.x, a.x * b.x + a.y * b.y);

const makeCanvas = (width, height) => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');
  return { canvas, context };
};

/**
 * find long segments in a path and split them into pieces a better size for the jitter
 * @param {*} points
 */
const normalizePathSegments = points => {
  const output = [];
  points.forEach((point, i) => {
    output.push(point);
    const next = i === points.length - 1 ? points[0] : points[i + 1];
    const segmentLength = next.add(point.scale(-1)).magnitude();
    if (segmentLength > desiredSegmentLength) {
      const pointsToAdd = Math.ceil(segmentLength / desiredSegmentLength);
      const unitVector = next.add(point.scale(-1)).normalize();
      const newSegmentLength = segmentLength / (pointsToAdd + 1);
      repeat(pointsToAdd, i => {
        const newPoint = point.add(
          unitVector.scale(newSegmentLength * (i + 1)),
        );
        output.push(newPoint);
      });
    }
  });
  return output;
};

const outlineMiddlePoint = (point, points, i, width) => {
  const halfWidth = width / 2;
  const cornerSteps = 10;
  const output = [];

  const vLast = points[i - 1].add(point.scale(-1)).normalize();
  const vNext = points[i + 1].add(point.scale(-1)).normalize();

  const bisector = vLast
    .add(vNext)
    .scale(0.5)
    .normalize();
  const angle = clockwiseAngle(vLast, vNext);

  if (angle < 0) {
    // Add the two quarter circles that make up the turn

    const outerAngle = Math.PI - Math.abs(angle);
    const cornerPoints = clamp(Math.ceil(outerAngle / (Math.PI / 8)), {
      min: 2,
      max: 8,
    });

    repeat(cornerPoints, j => {
      output.push(
        point.add(
          vLast
            .scale(-halfWidth)
            .rotate((outerAngle * j) / (cornerPoints - 1) - Math.PI / 2),
        ),
      );
    });
  } else {
    const max = Math.min(
      points[i - 1].add(point.scale(-1)).magnitude(),
      points[i + 1].add(point.scale(-1)).magnitude(),
    );
    const pivotDistance = clamp(
      Math.abs(
        (width * Math.sin(Math.PI / 2 - angle / 2)) /
          Math.cos(Math.PI / 2 - angle),
      ),
      { min: halfWidth, max },
    );
    const innerPivot = point.add(bisector.scale(pivotDistance));
    output.push(innerPivot);
  }

  return output;
};

const pathOutline = (points, width) => {
  const cornerSteps = 2;

  const vPoints = points.map(point => Vec2(point.x, point.y));
  const halfWidth = width / 2;

  const shapePoints = [];

  vPoints.forEach((point, i) => {
    if (i === 0) {
      // first point

      const vNext = vPoints[i + 1].add(vPoints[i].scale(-1)).normalize();

      // starting point, along the first vector
      const endCap = point.add(vNext.scale(-halfWidth));
      shapePoints.push(endCap);

      // quarter circle to vector start
      repeat(cornerSteps, i => {
        const next = point.add(
          vNext
            .scale(-halfWidth)
            .rotate(((Math.PI / 2) * (i + 1)) / cornerSteps),
        );
        shapePoints.push(next);
      });
    } else if (i === points.length - 1) {
      // last point
      const vLast = vPoints[i - 1].add(point.scale(-1)).normalize();
      repeat(cornerSteps, i => {
        const next = point.add(
          vLast
            .scale(-halfWidth)
            .rotate(-((Math.PI / 2) * (cornerSteps - i)) / cornerSteps),
        );
        shapePoints.push(next);
      });
      repeat(cornerSteps + 1, i => {
        const next = point.add(
          vLast.scale(-halfWidth).rotate(((Math.PI / 2) * i) / cornerSteps),
        );
        shapePoints.push(next);
      });
    } else {
      // middle points
      const outline = outlineMiddlePoint(point, vPoints, i, width);
      outline.forEach(point => shapePoints.push(point));
    }
  });

  // All the middle points again, now in reverse order
  vPoints.reverse();
  vPoints.forEach((point, i) => {
    // skip start and end to get only middle points ;)
    if (i > 0 && i < vPoints.length - 1) {
      const outline = outlineMiddlePoint(point, vPoints, i, width);
      outline.forEach(point => shapePoints.push(point));
    }
  });

  // Finish the end cap
  const vNext = vPoints[vPoints.length - 2]
    .add(vPoints[vPoints.length - 1].scale(-1))
    .normalize();

  // quarter circle to vector start
  repeat(cornerSteps, i => {
    const next = vPoints[vPoints.length - 1].add(
      vNext
        .scale(-halfWidth)
        .rotate(-((Math.PI / 2) * (cornerSteps - i)) / cornerSteps),
    );
    shapePoints.push(next);
  });

  return shapePoints;
};

class Watercolor {
  constructor(seed, { context, canvas }) {
    this.context = context;
    this.rng = Random(seed);
    this.width = canvas.width;
    this.height = canvas.height;
  }

  _texturedBackground = () => {
    const output = makeCanvas(this.width, this.height);
    const { circle } = Draw(output.context);

    const width = output.canvas.width;
    const height = output.canvas.height;

    // TODO: These all need to be calculated based on canvas size
    const count = 8000;
    const minRadius = 80;
    const maxRadius = 140;
    const minAlpha = 0.008;
    const maxAlpha = 0.04;

    repeat(count, i => {
      circle({
        x: this.rng.int(-maxRadius, width + maxRadius),
        y: this.rng.int(-maxRadius, height + maxRadius),
        radius: this.rng.int(minRadius, maxRadius),
        fill: tinycolor({
          r: 0,
          b: 0,
          g: 0,
          a: this.rng.float(minAlpha, maxAlpha),
        }),
      });
    });
    return output;
  };

  _jitterPath = (points, jitterLimit) => {
    const output = [];

    points.forEach((point, i) => {
      const next = i === points.length - 1 ? points[0] : points[i + 1];
      const midpoint = point.add(next).scale(0.5);
      const segmentLength = next.add(point.scale(-1)).magnitude();
      const maxJitter =
        jitterLimit === undefined
          ? segmentLength
          : Math.min(segmentLength, jitterLimit);

      const movedPoint = point.add(
        Vec2(
          this.rng.float(
            -maxJitter,
            maxJitter,
            distributions.normal(normalConfig),
          ),
          this.rng.float(
            -maxJitter,
            maxJitter,
            distributions.normal(normalConfig),
          ),
        ).scale(jitterScaling),
      );
      const movedMidpoint = midpoint.add(
        Vec2(
          this.rng.float(
            -maxJitter,
            maxJitter,
            distributions.normal(normalConfig),
          ),
          this.rng.float(
            -maxJitter,
            maxJitter,
            distributions.normal(normalConfig),
          ),
        ).scale(jitterScaling),
      );

      output.push(movedPoint);
      this.rng.bool(0.7) && output.push(movedMidpoint);
    });
    return output;
  };

  fill = function({ points, color }) {
    const background = this._texturedBackground();

    const paint = makeCanvas(this.width, this.height);

    let baseShape = normalizePathSegments(points);
    repeat(3, i => {
      baseShape = this._jitterPath(baseShape);
    });

    const { path } = Draw(paint.context);
    repeat(40, () => {
      let shapePoints = [...baseShape];
      repeat(this.rng.int(2, 5), () => {
        shapePoints = this._jitterPath(shapePoints);
      });
      path({
        points: shapePoints,
        fill: color.setAlpha(0.014).toRgbString(),
        close: true,
      });
    });

    background.context.globalCompositeOperation = 'source-in';
    background.context.drawImage(paint.canvas, 0, 0, this.width, this.height);

    this.context.drawImage(background.canvas, 0, 0, this.width, this.height);
  };

  stroke = function({ points, color, width = 40 } = {}) {
    this.fill({ points: pathOutline(points, width), color });
  };
}

export default Watercolor;
