import nouns, { pluralize } from './nouns';
import adjectives from './adjectives';

export const getNoun = (ratio, { plural = false } = {}) => {
  const pos = Math.floor(ratio * nouns.length);

  const noun = nouns[pos];

  return plural ? pluralize(noun) : noun;
};

export const getAdjective = (ratio, {} = {}) => {
  const pos = Math.floor(ratio * adjectives.length);

  const adj = adjectives[pos];
  return adj;
};
