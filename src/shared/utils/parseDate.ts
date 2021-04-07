const edgeCase1 = /'\w{3}-\d{4}'/;

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
  let output = new Date(input);
  if (!Number.isNaN(output.getTime())) {
    return output;
  }
  /* edge cases */
  // This one is specific to Firefox and Safari, as of April 2021.
  // This will not be able to be covered by tests as node is using the V8 engine
  if (typeof input === 'string' && edgeCase1.test(input)) {
    const [month, year] = input.split('-');
    const monthIndex = months.indexOf(month.toLowerCase());
    output = new Date(+year, monthIndex);
    if (monthIndex >= 0 && !Number.isNaN(output.getTime())) {
      return output;
    }
  }
  // otherwise just return undefined
  return undefined;
};

export default parseDate;
