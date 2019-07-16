import Draw from '../draw';

export const options = () => ({
  // title: '',
  // pallete: null,
  // fullscreen: true,
  // width: null,
  // height: null,
});

export const sketch = ({ context, rng, pallete, meta, canvas }) => {
  const { rect, circle, path } = Draw(context);
};
