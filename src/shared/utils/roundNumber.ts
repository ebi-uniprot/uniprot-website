const UNITS = ['', 'k', 'M', 'B'];
const UNIT_SCALE = 1_000; // Every 1000, jump in magnitude

export const roundNumber = (value: number, scaleMargin = 1) => {
  let outValue = value;
  let unitIndex = 0;
  while (outValue >= UNIT_SCALE * scaleMargin) {
    unitIndex += 1;
    outValue = Math.round(outValue / UNIT_SCALE);
  }
  return `${outValue.toLocaleString()}${UNITS[unitIndex]}`;
};
