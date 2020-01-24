import React, { useEffect, useState } from 'react';
import Random from '../random';
import Pallete from '../colors/palletes';

import { merge, assign } from 'lodash';

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
let frameRequestId = 0;

const redraw = (params, options, draw, loop, canvas, wrapper) => {
  console.log(`Options:`, options);

  if (frameRequestId) {
    window.cancelAnimationFrame(frameRequestId);
    frameRequestId = 0;
  }

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

  const rng = Random(options.title);
  const pallete = Pallete(options.pallete);
  const meta = {
    title: options.title,
    pallete: options.pallete,
    size: { width: canvasWidth, height: canvasHeight },
    options,
  };
  draw({
    params,
    context,
    rng,
    pallete,
    meta,
    canvas,
  });

  /* Animation Loop */
  const startTime = Date.now();
  if (loop) {
    let lastFrame = startTime;
    const repeater = () => {
      const thisFrame = Date.now();
      const totalTime = thisFrame - startTime;
      const deltaTime = thisFrame - lastFrame;
      lastFrame = thisFrame;
      loop({
        deltaTime,
        totalTime,
        params,
        context,
        rng,
        pallete,
        meta,
        canvas,
      });
      frameRequestId = window.requestAnimationFrame(repeater);
    };
    repeater();
  }
};

const download = () => {
  const downloadLink = document.getElementById('downloader');
  const image = canvas.toDataURL('image/png');
  downloadLink.setAttribute('href', image);
  downloadLink.setAttribute('download', `${document.title}.png`);
  downloadLink.click();
};
let keydownHandler = undefined;

const compare = (obj1, obj2) => {
  // Thanks to: https://gist.github.com/nicbell/6081098

  //Loop through properties in object 1
  for (var p in obj1) {
    //Check property exists on both objects
    if (obj1.hasOwnProperty(p) !== obj2.hasOwnProperty(p)) return false;

    switch (typeof obj1[p]) {
      //Deep compare objects
      case 'object':
        if (!compare(obj1[p], obj2[p])) return false;
        break;
      //Compare function code
      case 'function':
        if (
          typeof obj2[p] == 'undefined' ||
          (p != 'compare' && obj1[p].toString() != obj2[p].toString())
        )
          return false;
        break;
      //Compare values
      default:
        if (obj1[p] != obj2[p]) return false;
    }
  }
  //Check object 2 for any extra properties
  for (var p in obj2) {
    if (typeof obj1[p] == 'undefined') return false;
  }
  return true;
};

const originalParams = {};
const sketchParams = {};

export default ({ options = {}, draw = () => {}, loop, params = {} }) => {
  const [stateParams, setStateParams] = useState(params);

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

    if (!compare(params, originalParams)) {
      assign(sketchParams, params);
    }

    regen();

    redraw(sketchParams, sketchOptions, draw, loop, canvas, wrapper);

    /* Event Handlers Below */
    if (keydownHandler) {
      document.removeEventListener('keydown', keydownHandler, false);
    }

    keydownHandler = function(event) {
      console.log(event.code);
      switch (event.code) {
        case 'KeyR':
          // Redraw sketch
          redraw(sketchParams, sketchOptions, draw, loop, canvas, wrapper);
          break;
        case 'KeyP':
          // Change pallete and nothing else
          palleteIndex = palleteArray.length;
          regen();
          redraw(sketchParams, sketchOptions, draw, loop, canvas, wrapper);
          break;
        case 'KeyO':
          // Change title and nothing else
          titleIndex = titleArray.length;
          regen();
          redraw(sketchParams, sketchOptions, draw, loop, canvas, wrapper);
          break;
        case 'Space':
          titleIndex = titleArray.length;
          palleteIndex = palleteArray.length;
          regen();
          // Refresh everything then redraw sketch
          // generate();
          redraw(sketchParams, sketchOptions, draw, loop, canvas, wrapper);
          break;
        case 'ArrowRight':
          titleIndex += 1;
          if (titleIndex > titleArray.length) {
            titleIndex = titleArray.length;
          }
          regen();
          redraw(sketchParams, sketchOptions, draw, loop, canvas, wrapper);
          break;
        case 'ArrowLeft':
          titleIndex -= 1;
          if (titleIndex <= 0) {
            titleIndex = 0;
          }
          regen();
          redraw(sketchParams, sketchOptions, draw, loop, canvas, wrapper);
          break;
        case 'ArrowUp':
          palleteIndex += 1;
          if (palleteIndex > palleteArray.length) {
            palleteIndex = palleteArray.length;
          }
          regen();
          redraw(sketchParams, sketchOptions, draw, loop, canvas, wrapper);
          break;
        case 'ArrowDown':
          palleteIndex -= 1;
          if (palleteIndex <= 0) {
            palleteIndex = 0;
          }
          regen();
          redraw(sketchParams, sketchOptions, draw, loop, canvas, wrapper);
          break;
        case 'KeyF':
          // Toggle fullscreen
          sketchOptions.fullscreen = !sketchOptions.fullscreen;
          redraw(sketchParams, sketchOptions, draw, loop, canvas, wrapper);
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
