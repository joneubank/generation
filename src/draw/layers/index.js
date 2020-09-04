const make = (inputCanvas, { width, height } = {}) => {
  const canvas = document.createElement('canvas');
  // canvas.width = width !== undefined ? width : inputCanvas.width;
  // canvas.height = height !== undefined ? height : inputCanvas.height;
  canvas.width = inputCanvas.width;
  canvas.height = inputCanvas.height;
  const context = canvas.getContext('2d');
  return { canvas, context };
};

const combine = (bottom, top, blendMode = 'source-over') => {
  const tempBlend = bottom.context.globalCompositeOperation;
  bottom.context.globalCompositeOperation = blendMode;
  bottom.context.drawImage(
    top.canvas,
    0,
    0,
    top.canvas.width,
    top.canvas.height,
  );
  bottom.context.globalCompositeOperation = tempBlend;
};

export default {
  make,
  combine,
};
