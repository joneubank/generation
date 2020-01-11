import queryString from 'query-string';

import Random from './random';
import Pallete from './colors/palletes';
import { defaultSketchOptions } from './config';
import { pickBy } from 'lodash';

console.log('Sketch says "Hello!"');
/* ***************** *
 * Sketch File Setup
 * ***************** */
const query = queryString.parse(location.search);

const filename = query.s;
console.log('Running sketch from:', filename);
const sketch = require(`./sketches/${filename}`);

/* ********************************* *
 * Options and Random Initialization
 * ********************************* */
const defaultOptions = {
  seed: null,
  title: null,

  pallete: null,

  fullscreen: false,
  width: 2560,
  height: 1600,

  blend: null,
};
const sketchOptions = sketch.options();

// Order of the spread operators is important, should go:
// 1. this file
// 2. config file
// 3. imported sketch file
// 4. query string overwrites
const options = {
  ...defaultOptions,
  ...defaultSketchOptions,
  ...sketchOptions,
  ...pickBy({ pallete: query.p, title: query.t }, v => v !== undefined),
};

const seedStack = [];

console.log(`Options:`, options);
let seed, rng, sketchSeed, title, pallete;
let seedIndex = 0;
const generate = () => {
  if (seedIndex >= seedStack.length) {
    const newSeed =
      seedIndex && options.seed
        ? options.seed
        : rng
        ? rng.next()
        : Math.random();
    seedStack.push(newSeed);
  }

  console.log('index: ', seedIndex, seedStack);

  rng = Random(seedStack[seedIndex], 'base');

  title = options.title || rng.label();
  rng.push({ seed: title, context: 'titled sketch' });

  sketchSeed = rng.next();

  pallete = options.pallete ? Pallete(options.pallete) : rng.pallete();
};

generate();

const meta = () => ({
  filename,
  seed,
  title,
  pallete: pallete.name,
  size: { width: canvasWidth, height: canvasHeight },
  options,
});

/* ***************** *
 * Canvas Management
 * ***************** */
const canvas = document.getElementById('canvas');
const wrapper = document.getElementById('canvas-wrapper');

let canvasHeight = options.fullscreen
  ? canvas.parentElement.scrollHeight
  : options.height;
let canvasWidth = options.fullscreen
  ? canvas.parentElement.scrollWidth
  : options.width;

const redraw = () => {
  if (options.fullscreen) {
    wrapper.className = 'fullscreen-wrapper';
  } else {
    wrapper.className = 'framed-wrapper';
  }
  canvasHeight = options.fullscreen
    ? canvas.parentElement.scrollHeight
    : options.height;
  canvasWidth = options.fullscreen
    ? canvas.parentElement.scrollWidth
    : options.width;

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  canvas.style.maxHeight = wrapper.parentElement.scrollHeight;

  if (options.blend) {
    console.log(`Applying Composite Operation: ${options.blend}`);
    context.globalCompositeOperation = options.blend;
  }

  const _meta = meta();
  document.title = title;

  console.log('Drawing Sketch:', _meta);
  sketch.sketch({
    context,
    rng: Random(sketchSeed),
    pallete,
    meta: _meta,
    canvas,
  });
};

const context = canvas.getContext('2d');

// const redraw = randomBackground;
window.addEventListener(
  'resize',
  () => (options.fullscreen ? redraw() : null),
  false,
);

/* ******** *
 * Exceute!
 * ******** */
redraw();

/* **************** *
 * Keyboard Commands
 * ***************** */

document.addEventListener('keydown', event => {
  console.log(event.code);
  switch (event.code) {
    case 'KeyR':
      // Redraw sketch
      redraw();
      break;
    case 'KeyP':
      // Change pallete and nothing else
      pallete = Random(Date.now()).pallete();
      redraw();
      break;
    case 'Space':
    case 'ArrowRight':
      seedIndex += 1;
      // Refresh everything then redraw sketch
      generate();
      redraw();
      break;
    case 'ArrowLeft':
      seedIndex -= 1;
      if (seedIndex <= 0) {
        seedIndex = 0;
      }
      generate();
      redraw();
      break;
    case 'KeyF':
      // Toggle fullscreen
      options.fullscreen = !options.fullscreen;
      redraw();
      break;
    case 'KeyS':
      download();
      break;

    default:
      break;
  }
});

const downloadLink = document.getElementById('downloader');
const download = () => {
  const image = canvas.toDataURL('image/png');
  downloadLink.setAttribute('href', image);
  downloadLink.setAttribute('download', `${document.title}.png`);
  downloadLink.click();
};
