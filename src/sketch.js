import queryString from 'query-string';

import Random from './random';
import Pallete from './colors/palletes';
import { defaultSketchOptions } from './config';

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

  fullscreen: true,
  width: 2048,
  height: 2048,
};
const sketchOptions = sketch.options();

// Order of the spread operators is important, should go:
// 1. this file
// 2. config file
// 3. imported sketch file
const options = {
  ...defaultOptions,
  ...defaultSketchOptions,
  ...sketchOptions,
};

console.log(`Options:`, options);
let seed, rng, sketchSeed, title, pallete;
const generate = () => {
  seed = options.seed || Math.random();

  rng = Random(Math.random(), 'base');

  title = options.title || rng.label();
  rng.push({ seed: title, context: 'titled sketch' });

  sketchSeed = rng.next();

  pallete = options.pallete ? Pallete(options.pallete) : rng.pallete();
};

generate();

const meta = () => ({
  filename,
  seed,
  sketchSeed,
  title,
  pallete: pallete.name,
  size: { width, height },
  options,
});

/* ***************** *
 * Canvas Management
 * ***************** */
const canvas = document.getElementById('canvas');

let height = canvas.parentElement.scrollHeight;
let width = canvas.parentElement.scrollWidth;

const redraw = () => {
  height = canvas.parentElement.offsetHeight;
  width = canvas.parentElement.offsetWidth;
  canvas.width = width;
  canvas.height = height;

  const _meta = meta();
  console.log('Drawing Sketch:', _meta);
  sketch.sketch({
    context,
    rng: Random(sketchSeed),
    pallete,
    meta: _meta,
    canvas,
  });
  document.title = title;
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

document.addEventListener('keypress', event => {
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
      // Refresh everything then redraw sketch
      generate();
      redraw();
      break;
    case 'KeyF':
      // Toggle fullscreen
      options.fullscreen = !options.fullscreen;
      redraw();
    default:
      break;
  }
});
