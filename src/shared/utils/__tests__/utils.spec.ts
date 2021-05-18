/**
 * @jest-environment node
 */
import {
  hasContent,
  getBEMClassName,
  formatPercentage,
  isSameEntry,
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
    const number = 10.1922323409823049823094;
    expect(formatPercentage(number)).toEqual('10.2%');
  });

  it('should format numbers with no digits of precision to have no trailing zeros', () => {
    const number = 10;
    expect(formatPercentage(number)).toEqual('10%');
  });
});

describe('isSameEntry', () => {
  it('should return true if previous primaryAccession equals next primaryAccession', () => {
    expect(
      isSameEntry(
        { transformedData: { primaryAccession: 'P12345' } },
        { transformedData: { primaryAccession: 'P12345' } }
      )
    ).toBeTruthy();
  });
  it('should return false if previous primaryAccession is different to next primaryAccession', () => {
    expect(
      isSameEntry(
        { transformedData: { primaryAccession: 'P12345' } },
        { transformedData: { primaryAccession: 'P54321' } }
      )
    ).toBeFalsy();
  });
  it('should return true if previous id equals next id', () => {
    expect(
      isSameEntry(
        { transformedData: { id: 'P12345' } },
        { transformedData: { id: 'P12345' } }
      )
    ).toBeTruthy();
  });
  it('should return false if previous id is different to next id', () => {
    expect(
      isSameEntry(
        { transformedData: { id: 'P12345' } },
        { transformedData: { id: 'P54321' } }
      )
    ).toBeFalsy();
  });
});
