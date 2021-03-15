/**
 * Convert a random string to an rgb colour
 * @param str the string to convert
 * @param cap an optional maximum value for r,g and b
 * @returns rgb values as a string
 */
export const stringToColour = (str: string, cap = 255) => {
  const hash = str
    .split('')
    // eslint-disable-next-line no-bitwise
    .reduce((prev, letter) => letter.charCodeAt(0) + ((prev << 5) - prev), 0);
  const rgb = [];
  for (let i = 0; i < 3; i += 1) {
    // eslint-disable-next-line no-bitwise
    const value = (hash >> (i * 8)) & cap;
    rgb.push(value);
  }
  return `rgb(${rgb.join(',')})`;
};
