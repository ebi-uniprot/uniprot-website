import * as logging from './logging';

const edgeCase1 = /\w{3}-\d{4}/;
const edgeCase2 = /\d{6}/;

const months = [
  'jan',
  'feb',
  'mar',
  'apr',
  'may',
  'jun',
  'jul',
  'aug',
  'sep',
  'oct',
  'nov',
  'dec',
];

/** @protected */
export const parseEdgeCases = (input: string) => {
  let output: Date;
  // This one is specific to Firefox and Safari, as of April 2021.
  // This will not be able to be covered by tests as node is using the V8 engine
  if (edgeCase1.test(input)) {
    const [month, year] = input.split('-');
    const monthIndex = months.indexOf(month.toLowerCase());
    output = new Date(+year, monthIndex);
    if (monthIndex >= 0 && !Number.isNaN(output.getTime())) {
      return output;
    }
  }
  if (edgeCase2.test(input)) {
    const year = +input.substr(0, 4);
    const month = +input.substr(4, 2) - 1;
    const day = +input.substr(6, 4);
    output = new Date(year, month, day);
    if (!Number.isNaN(output.getTime())) {
      return output;
    }
  }
  logging.error(`couldn't parse "${input}" as a date`);
  // otherwise just return undefined
  return undefined;
};

/**
 * Either returns a valid date, or undefined, but no invalid date
 * @param input date to parse
 * @returns {Date | undefined} valid date if possible, otherwise undefined
 */
const parseDate = (input?: string | number | Date | null): Date | undefined => {
  if (!input) {
    return undefined;
  }
  if (input instanceof Date) {
    return input;
  }
  // easy case
  const output = new Date(input);
  if (!Number.isNaN(output.getTime())) {
    return output;
  }
  /* edge cases */
  if (typeof input === 'string') {
    return parseEdgeCases(input);
  }
  // otherwise just return undefined
  return undefined;
};

export default parseDate;
