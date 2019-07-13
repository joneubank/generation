# Computer Generated Art Sandbox

## Quick Start

Install dependencies with NPM

```
npm i
```

Run the dev script, it will run locally using webpack-dev-server

```
npm run dev
```

### Sketching

Go to path `localhost:8080/sketch/?s=201907120055-dots` to render the dots sketch file.

For a new algorithm/design, copy an existing sketch file or the `templates/sketch.js` file into the `src/sketchs` directory. Change the `s` query param value to be the new filename.

### Keyboard Shortcuts

`r` will redraw the whole piece

`p` will generate a new Pallete and redraw the image with the same seed

`f` will toggle the full page canvas (not properly implemented)

`space` will generate a new seed (except for values provided in options) and draw this
