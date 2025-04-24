const getExponentialContrast = (value: number, factor: number) => {
  if (value < 0 || value > 1 || factor < 1) {
    throw new Error(`Invalid values. value: ${value}, factor: ${factor}`);
  }

  // linear transformation, just keep the same value
  if (factor === 1) {
    return value;
  }

  // make it "kinda" exponential
  return ((factor ** factor) ** value - 1) / (factor ** factor - 1);
};

export default getExponentialContrast;
