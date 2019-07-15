export const repeat = (count, method) => {
  for (let i = 0; i < count; i++) {
    method(i);
  }
};
