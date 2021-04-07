/**
 * @jest-environment node
 */
import parseDate from '../parseDate';

const testCases: [
  input?: string | number | Date,
  year?: number,
  month?: number, // starts at 0
  day?: number // starts at 1
][] = [
  ['2021', 2021, undefined, undefined],
  ['2021-12', 2021, 11, undefined],
  ['2021-12-10', 2021, 11, 10],
  ['2021-12-10 12:00:11', 2021, 11, 10],
  ['DEC-2021', 2021, 11, undefined],
  ['December 10, 21 00:20:18', 2021, 11, 10],
  ['2021-12-10T14:48:00.000Z', 2021, 11, 10],
  ['abc', undefined, undefined, undefined],
  [new Date(2021, 11, 10), 2021, 11, 10],
  [1639094400000, 2021, 11, 10],
  [undefined, undefined, undefined, undefined],
];

describe('timezone sanity check', () => {
  it('should always be UTC, as per global jest config', () => {
    expect(new Date().getTimezoneOffset()).toBe(0);
  });
});

describe('parseDate', () => {
  it.each(testCases)('should parse date "%s"', (input, year, month, day) => {
    const parsed = parseDate(input);
    expect(Number.isNaN(parsed?.getTime())).toBe(false);
    if (year === undefined) {
      expect(parsed).toBeUndefined();
    } else {
      expect(parsed.getFullYear()).toBe(year);
      if (month !== undefined) {
        expect(parsed.getMonth()).toBe(month);
        if (day !== undefined) {
          expect(parsed.getDate()).toBe(day);
        }
      }
    }
  });
});
