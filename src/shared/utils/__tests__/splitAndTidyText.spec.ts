import splitAndTidyText from '../splitAndTidyText';

const testCases: [
  input: string | undefined,
  separator: RegExp | undefined,
  length: number,
][] = [
  [undefined, undefined, 0],
  ['abc', undefined, 1],
  ['abc 123', undefined, 2],
  ['          abc 123\t asduiw   \t\n   \t\t p05067', undefined, 4],
  ['          abc 123\t asduiw   \t\n   \t\t p05067', undefined, 4],
  ['abc,def_xyz', undefined, 2],
  ['abc,def_xyz', /[,_]+/, 3],
];

describe('splitAndTidyText', () => {
  it.each(testCases)(
    'should split raw input correctly',
    (input, separator, length) => {
      expect(splitAndTidyText(input, separator)).toHaveLength(length);
    }
  );
});
