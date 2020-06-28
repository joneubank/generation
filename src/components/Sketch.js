import React, { useEffect, useState } from 'react';
// import SketchMenu from './SketchMenu';
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

// Animation Props
let frameRequestId = 0;
let paused = false;
let time = 0;
let speed = 16;

const resize = (canvas, width, height) => {
  const ratio = width / height;

  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const screenRatio = screenWidth / screenHeight;

  let newHeight = height;
  let newWidth = width;

  if (screenRatio > ratio) {
    const maxDim = window.innerHeight - 50;
    if (height > maxDim) {
      newHeight = maxDim;
      newWidth = (newHeight / height) * width;
    }
  } else {
    const maxDim = window.innerWidth - 50;
    if (width > maxDim) {
      newWidth = maxDim;
      newHeight = (newWidth / width) * height;
    }
  }

  canvas.style.height = newHeight + 'px';
  canvas.style.width = newWidth + 'px';
};

const redraw = (params, options, draw, loop, canvas, wrapper) => {
  console.log(`Options:`, options);

  if (frameRequestId) {
    window.cancelAnimationFrame(frameRequestId);
    frameRequestId = 0;
  }

  let canvasHeight = options.fullscreen ? window.innerHeight : options.height;
  let canvasWidth = options.fullscreen ? window.innerWidth : options.width;

  if (options.fullscreen) {
    wrapper.className = 'fullscreen-wrapper';
    canvas.style.height = '';
    canvas.style.width = '';
  } else {
    wrapper.className = 'framed-wrapper';

    resize(canvas, options.width, options.height);
  }

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  document.title = options.title;

  const context = canvas.getContext('2d');

  if (options.blend) {
    console.log(`Applying Composite Operation: ${options.blend}`);
    context.globalCompositeOperation = options.blend;
  } else {
    context.globalCompositeOperation = 'source-over';
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

  if (loop) {
    const repeater = () => {
      if (!paused) {
        time += speed;
        loop({
          speed,
          ticks: speed,
          time,
          params,
          context,
          rng,
          pallete,
          meta,
          canvas,
        });
      }
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
let touchendHandler = undefined;
let resizeHandler = undefined;

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

    const redrawHelper = () =>
      redraw(sketchParams, sketchOptions, draw, loop, canvas, wrapper);
    redrawHelper();

    /* Event Handlers Below */
    if (keydownHandler) {
      document.removeEventListener('keydown', keydownHandler, false);
    }

    keydownHandler = function (event) {
      console.log(event.code);
      switch (event.code) {
        case 'KeyR':
          // Redraw sketch
          time = 0;
          redrawHelper();
          break;
        case 'KeyP':
          // Change pallete and nothing else
          palleteIndex = palleteArray.length;
          regen();
          redrawHelper();
          break;
        case 'KeyO':
          // Change title and nothing else
          titleIndex = titleArray.length;
          regen();
          redrawHelper();
          break;
        case 'Space':
          titleIndex = titleArray.length;
          palleteIndex = palleteArray.length;
          regen();
          // Refresh everything then redraw sketch
          // generate();
          redrawHelper();
          break;
        case 'ArrowRight':
          titleIndex += 1;
          if (titleIndex > titleArray.length) {
            titleIndex = titleArray.length;
          }
          regen();
          redrawHelper();
          break;
        case 'ArrowLeft':
          titleIndex -= 1;
          if (titleIndex <= 0) {
            titleIndex = 0;
          }
          regen();
          redrawHelper();
          break;
        case 'ArrowUp':
          palleteIndex += 1;
          if (palleteIndex > palleteArray.length) {
            palleteIndex = palleteArray.length;
          }
          regen();
          redrawHelper();
          break;
        case 'ArrowDown':
          palleteIndex -= 1;
          if (palleteIndex <= 0) {
            palleteIndex = 0;
          }
          regen();
          redrawHelper();
          break;
        case 'KeyF':
          // Toggle fullscreen
          sketchOptions.fullscreen = !sketchOptions.fullscreen;
          redrawHelper();
          break;
        case 'KeyS':
          download();
          break;
        case 'Enter':
          paused = !paused;
          break;
        default:
          break;
      }
    };

    if (touchendHandler) {
      document.removeEventListener('touchend', touchendHandler, false);
    }

    touchendHandler = function (event) {
      titleIndex = titleArray.length;
      palleteIndex = palleteArray.length;
      regen();
      // Refresh everything then redraw sketch
      // generate();
      redrawHelper();
    };

    if (resizeHandler) {
      window.removeEventListener('resize', resizeHandler);
    }
    resizeHandler = function () {
      resize(canvas, options.width, options.height);
    };

    document.addEventListener('keydown', keydownHandler, false);
    document.addEventListener('touchend', touchendHandler, false);
    window.addEventListener('resize', resizeHandler, true);
  });

  return (
    <>
      {/* <SketchMenu /> */}
      <div className="fixed-fullscreen">
        <div id="canvas-wrapper">
          <canvas download="asdf" id="canvas"></canvas>
        </div>
      </div>
      <a id="downloader" download=""></a>
    </>
  );
};
