import React, { useEffect } from 'react';
import Random from '../random';
import Pallete from '../colors/palletes';

import { merge } from 'lodash';

/* ********************************* *
 * Options and Random Initialization
 * ********************************* */
const defaultOptions = {
  seed: null,
  title: null,

  pallete: null,

  fullscreen: false,
  width: 2560,
  height: 2560,

  blend: null,
};

const titleArray = [];
let titleIndex = 0;
const palleteArray = [];
let palleteIndex = 0;

const redraw = (options, draw, canvas, wrapper) => {
  console.log(`Options:`, options);

  let canvasHeight = options.fullscreen
    ? canvas.parentElement.scrollHeight
    : options.height;
  let canvasWidth = options.fullscreen
    ? canvas.parentElement.scrollWidth
    : options.width;

  if (options.fullscreen) {
    wrapper.className = 'fullscreen-wrapper';
  } else {
    wrapper.className = 'framed-wrapper';
  }

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  document.title = options.title;

  const context = canvas.getContext('2d');

  if (options.blend) {
    console.log(`Applying Composite Operation: ${options.blend}`);
    context.globalCompositeOperation = options.blend;
  }

  draw({
    context,
    rng: Random(options.title),
    pallete: Pallete(options.pallete),
    meta: {
      title: options.title,
      pallete: options.pallete,
      size: { width: canvasWidth, height: canvasHeight },
      options,
    },
    canvas,
  });
};

const download = () => {
  const downloadLink = document.getElementById('downloader');
  const image = canvas.toDataURL('image/png');
  downloadLink.setAttribute('href', image);
  downloadLink.setAttribute('download', `${document.title}.png`);
  downloadLink.click();
};
let keydownHandler = undefined;
export default ({ options = {}, draw = () => {} }) => {
  useEffect(() => {
    console.log('Sketch says "Hello!"');

    const canvas = document.getElementById('canvas');
    const wrapper = document.getElementById('canvas-wrapper');

    const sketchOptions = merge(defaultOptions, options);

    const rand = Random(sketchOptions.seed);

    const regen = () => {
      if (titleIndex >= titleArray.length) {
        titleArray.push(rand.label());
      }
      sketchOptions.title = titleArray[titleIndex];
      if (palleteIndex >= palleteArray.length) {
        palleteArray.push(rand.label());
      }
      sketchOptions.pallete = palleteArray[palleteIndex];
    };

    regen();

    redraw(sketchOptions, draw, canvas, wrapper);

    if (keydownHandler) {
      document.removeEventListener('keydown', keydownHandler, false);
    }

    keydownHandler = function(event) {
      console.log(event.code);
      switch (event.code) {
        case 'KeyR':
          // Redraw sketch
          redraw(sketchOptions, draw, canvas, wrapper);
          break;
        case 'KeyP':
          // Change pallete and nothing else
          palleteIndex = palleteArray.length;
          regen();
          redraw(sketchOptions, draw, canvas, wrapper);
          break;
        case 'KeyO':
          // Change title and nothing else
          titleIndex = titleArray.length;
          regen();
          redraw(sketchOptions, draw, canvas, wrapper);
          break;
        case 'Space':
          titleIndex = titleArray.length;
          palleteIndex = palleteArray.length;
          regen();
          // Refresh everything then redraw sketch
          // generate();
          redraw(sketchOptions, draw, canvas, wrapper);
          break;
        case 'ArrowRight':
          titleIndex += 1;
          if (titleIndex > titleArray.length) {
            titleIndex = titleArray.length;
          }
          regen();
          redraw(sketchOptions, draw, canvas, wrapper);
          break;
        case 'ArrowLeft':
          titleIndex -= 1;
          if (titleIndex <= 0) {
            titleIndex = 0;
          }
          regen();
          redraw(sketchOptions, draw, canvas, wrapper);
          break;
        case 'ArrowUp':
          palleteIndex += 1;
          if (palleteIndex > palleteArray.length) {
            palleteIndex = palleteArray.length;
          }
          regen();
          redraw(sketchOptions, draw, canvas, wrapper);
          break;
        case 'ArrowDown':
          palleteIndex -= 1;
          if (palleteIndex <= 0) {
            palleteIndex = 0;
          }
          regen();
          redraw(sketchOptions, draw, canvas, wrapper);
          break;
        case 'KeyF':
          // Toggle fullscreen
          sketchOptions.fullscreen = !sketchOptions.fullscreen;
          redraw(sketchOptions, draw, canvas, wrapper);
          break;
        case 'KeyS':
          download();
          break;

        default:
          break;
      }
    };

    document.addEventListener('keydown', keydownHandler, false);
  });

  return (
    <>
      <div className="fixed-fullscreen">
        <div id="canvas-wrapper">
          <canvas download="asdf" id="canvas"></canvas>
        </div>
      </div>
      <a id="downloader" download=""></a>
    </>
  );
};
