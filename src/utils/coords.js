export const fromPolar = (radius, angle) => {
  return { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius };
};
