import {
  parseAccessionWithModifications,
  stringifyAccessionWithModifications,
  AccessionWithModifications,
} from '../modifications';

const testCases: [stringified: string, parsed: AccessionWithModifications][] = [
  ['P05067', { accession: 'P05067' }],
  ['P05067-1', { accession: 'P05067-1' }],
  [
    'P05067[1]',
    { accession: 'P05067', modifications: { subsets: [{ start: 1, end: 1 }] } },
  ],
  [
    'P05067[10-15]',
    {
      accession: 'P05067',
      modifications: { subsets: [{ start: 10, end: 15 }] },
    },
  ],
  [
    'P05067[10-15,20,30-31]',
    {
      accession: 'P05067',
      modifications: {
        subsets: [
          { start: 10, end: 15 },
          { start: 20, end: 20 },
          { start: 30, end: 31 },
        ],
      },
    },
  ],
  [
    'P05067[1>-]',
    {
      accession: 'P05067',
      modifications: {
        variations: [{ start: 1, end: 1, replacement: '-' }],
      },
    },
  ],
  [
    'P05067[1>LMN]',
    {
      accession: 'P05067',
      modifications: {
        variations: [{ start: 1, end: 1, replacement: 'LMN' }],
      },
    },
  ],
  [
    'P05067[1-4>L]',
    {
      accession: 'P05067',
      modifications: {
        variations: [{ start: 1, end: 4, replacement: 'L' }],
      },
    },
  ],
  [
    'P05067[1,3-4>L]',
    {
      accession: 'P05067',
      modifications: {
        subsets: [{ start: 1, end: 1 }],
        variations: [{ start: 3, end: 4, replacement: 'L' }],
      },
    },
  ],
];

describe('accession modifications', () => {
  it.each(testCases)('should parse "%s" correctly', (stringified, parsed) => {
    expect(parseAccessionWithModifications(stringified)).toEqual(parsed);
  });

  it.each(testCases)(
    'should stringify accession object correctly to "%s"',
    (stringified, parsed) => {
      expect(stringifyAccessionWithModifications(parsed)).toBe(stringified);
    }
  );
});
