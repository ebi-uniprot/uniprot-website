/**
 * @jest-environment node
 */
import {
  hasContent,
  pluralise,
  getBEMClassName,
  formatPercentage,
  deepFindAllByKey,
  addBlastLinksToFreeText,
  keysToLowerCase,
  getNumberChars,
} from '../utils';

describe('Model Utils', () => {
  it('should check whether an object is empty', () => {
    expect(hasContent({})).toBeFalsy();
  });

  it('should check whether a nested object has content', () => {
    expect(hasContent({ key: { key1: 'something' } })).toBeTruthy();
  });

  it('should check whether a nested object has content', () => {
    expect(hasContent({ key: { key1: undefined } })).toBeTruthy();
  });

  it('should check whether an array has content', () => {
    expect(hasContent({ key: ['blah'] })).toBeTruthy();
  });

  it('should check whether an array has no content', () => {
    expect(hasContent({ key: [] })).toBeFalsy();
  });

  it('should check whether a nested Map has content', () => {
    expect(hasContent({ key: new Map([['a', 'b']]) })).toBeTruthy();
  });

  it('should check whether a nested Map has no content', () => {
    expect(hasContent({ key: new Map() })).toBeFalsy();
  });
});

describe('pluralise', () => {
  it("shouldn't pluralise if count is one", () => {
    expect(pluralise('cat', 1)).toBe('cat');
    expect(pluralise('mouse', 1, 'mice')).toBe('mouse');
  });

  it('should pluralise if count is not one', () => {
    expect(pluralise('cat', 0)).toBe('cats');
    expect(pluralise('mouse', 0, 'mice')).toBe('mice');
    expect(pluralise('cat', 2)).toBe('cats');
    expect(pluralise('mouse', 2, 'mice')).toBe('mice');
  });
});

describe('getBEMClassName', () => {
  test('block and element', () => {
    expect(
      getBEMClassName({
        b: 'block',
        e: 'element',
      })
    ).toEqual('block__element');
  });

  test('block and array of elements', () => {
    expect(
      getBEMClassName({
        b: 'block',
        e: ['element_1', 'element_2'],
      })
    ).toEqual('block__element_1__element_2');
  });

  test('block, element and conditioned modifier', () => {
    expect(
      getBEMClassName({
        b: 'block',
        e: 'element_1',
        m: true && 'modifier_1',
      })
    ).toEqual('block__element_1 block__element_1--modifier_1');
  });

  test('block, element and array of mixed conditioned modifiers', () => {
    expect(
      getBEMClassName({
        b: 'block',
        e: 'element_1',
        m: [
          true && 'modifier_1',
          false && 'modifier_2',
          // eslint-disable-next-line no-constant-condition
          true ? 'modifier_3a' : 'modifier_3b',
        ],
      })
    ).toEqual(
      'block__element_1 block__element_1--modifier_1 block__element_1--modifier_3a'
    );
  });

  test('block and array of a single modifier', () => {
    expect(
      getBEMClassName({
        b: 'block',
        m: [true && 'modifier_1'],
      })
    ).toEqual('block block--modifier_1');
  });
});

describe('formatPercentage', () => {
  it('should format numbers with many digits of precision to have the default precision of 1 and with rounding', () => {
    const number = 10.192232340982;
    expect(formatPercentage(number)).toEqual('10.2%');
  });

  it('should format numbers with no digits of precision to have no trailing zeros', () => {
    const number = 10;
    expect(formatPercentage(number)).toEqual('10%');
  });
});

describe('deepFindAllByKey', () => {
  it('should find all keys in nested object', () => {
    expect(
      Array.from(deepFindAllByKey({ a: 1, b: { c: { d: { a: 2 } } } }, 'a'))
    ).toEqual([1, 2]);
  });
  it('should find all keys in array of nested objects', () => {
    expect(
      Array.from(
        deepFindAllByKey([{ a: 1 }, { b: { c: { d: { a: 2 } } } }], 'a')
      )
    ).toEqual([1, 2]);
  });
  it('should find no keys if not present', () => {
    expect(
      Array.from(
        deepFindAllByKey([{ a: 1 }, { b: { c: { d: { a: 2 } } } }], 'z')
      )
    ).toEqual([]);
  });

  describe('addBlastLinksToFreeText', () => {
    it('should handle positions at the beggining', () => {
      const result = addBlastLinksToFreeText(
        ['10-34 SOME TEXT'],
        'UP_ACCESSION'
      );
      expect(result).toMatchSnapshot();
    });

    it('should handle positions at the end', () => {
      const result = addBlastLinksToFreeText(
        ['SOME TEXT 10-34'],
        'UP_ACCESSION'
      );
      expect(result).toMatchSnapshot();
    });

    it('should handle no positions', () => {
      const result = addBlastLinksToFreeText(['SOME TEXT'], 'UP_ACCESSION');
      expect(result).toMatchSnapshot();
    });
  });
});

describe('keysToLowerCase', () => {
  it('should convert lowercase all keys', () => {
    expect(keysToLowerCase({ Foo: 1, BAR: 2 })).toEqual({ foo: 1, bar: 2 });
  });
  it('should return empty object with nothing provided', () => {
    expect(keysToLowerCase(undefined)).toEqual({});
  });
});

describe('getNumberChars', () => {
  const testCases = [
    [-1_000, 6],
    [-10, 3],
    [0, 1],
    [1, 1],
    [9, 1],
    [10, 2],
    [11, 2],
    [100, 3],
    [1_000, 5],
    [10_000, 6],
    [99_999, 6],
    [100_000, 7],
  ];
  test.each(testCases)(
    'for number %p should count %p characters (including commas and negative symbol)',
    (int: number, nChars: number) => {
      expect(getNumberChars(int)).toEqual(nChars);
    }
  );
});
