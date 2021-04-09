// any whitespace, or commas
const DEFAULT_SEPARATOR = /[\s,]+/;

const splitAndTidyText = (input = '', separator = DEFAULT_SEPARATOR) =>
  input.split(separator).filter(Boolean);

export default splitAndTidyText;
