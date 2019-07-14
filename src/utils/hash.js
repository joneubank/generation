import { createHash } from 'crypto';
const hash = input => {
  return createHash('md5')
    .update(input)
    .digest('hex');
};

export default hash;
