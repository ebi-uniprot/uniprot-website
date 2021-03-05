export const stringToColour = (str: string) => {
  const hash = str
    .split('')
    // eslint-disable-next-line no-bitwise
    .reduce((prev, letter) => letter.charCodeAt(0) + ((prev << 5) - prev), 0);
  let colour = '#';
  for (let i = 0; i < 3; i += 1) {
    // eslint-disable-next-line no-bitwise
    const value = (hash >> (i * 8)) & 0xff;
    colour += `00${value.toString(16)}`.substr(-2);
  }
  return colour;
};
