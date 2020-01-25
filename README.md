# Computer Generated Art Sandbox

## Quick Start

Install dependencies with NPM

```
npm i
```

Run the dev script, it will run locally using webpack-dev-server

```
npm run start
```

The site will run on [http://localhost:3000](localhost:3000). The homepage will be a list of all the sketches that are currently available.

To update the pages listed on the homepage run:

```
npm run pages
```

### Sketching

To create a new sketch file from a template:

```
npm run sketch
```

Choose the template you want (currently one for animated sketches and one for static called 'basic'). The path to this file will be output by the script, or look for it in the `/src/pages` directory. The full path matches the pattern:`./src/pages/{year}/{month}/{date}-{sketchname}.js`.

### Concepts

#### Titles and Palletes

Each image is generated by a random seed that is used to generate a title and a pallete-name. The title is used as the seed of a pseudo-random generator that will be used for the image, and the pallete name will be used to generate random colors in a consistent order. This allows the user to generate a new image keeping the colors the same, or change the colors and redraw the same pattern.

The title of the current image is shown in the title of the document.

### Keyboard Shortcuts

`space` will generate a new seed, randomizing a new title and pallete and draw it

`s` will open the file save dialog to save the current image

`p` will generate a new Pallete and redraw the image with the same seed

`o` will generate a new Title and redraw the image with the same pallete

`f` will toggle the full page canvas

`r` will redraw the whole piece - useful if the window resize fails to trigger

`Left` and `Right` Arrow keys will navigate through generated image titles while keeping the color pallete the same (`left` to previous image, `right` to next image or create a new image if at the latest)

`Up` and `Down` keys will navigate through generated palletes while keeping the image generated the same (`up` for a new pallete, `down` for a previous pallete)

#### Animation shortcuts

`Enter` will pause and resume the animation.
