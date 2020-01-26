import Random from '../random';

const Pallete = name => {
  const rng = Random(name, `pallete(${name})`);
  const count = 5;
  const colors = [];
  for (let i = 0; i < count; i++) {
    colors.push(rng.color());
  }

  const next = () => rng.color();

  const toString = () => {
    // TODO: Add an input to specify a different color coding (rgb?) for this output

    return `Pallete:${name}=[${colors.map(color => color.toString())}]`;
  };

  const random = () => rng.chooseOne(colors);

  return {
    name,
    colors,
    toString,
    next,
    random,
  };
};
export default Pallete;
