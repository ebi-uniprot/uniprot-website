/**
 * @jest-environment node
 */
import {
  removeProperty,
  formatLargeNumber,
  getBEMClassName,
  getSmallerMultiple,
  getLargerMultiple,
} from '../utils';

test('removeProperty removes only specified property and returns a deep copy of object ', () => {
  const obj = { foo: { bar: [1] }, baz: -1 };
  const objWithoutProprety = removeProperty(obj, 'baz');
  expect(objWithoutProprety).toEqual({ foo: { bar: [1] } });
  expect(objWithoutProprety).not.toBe(obj);
});

test('formatLargeNumber', () => {
  const number = 999999;
  expect(formatLargeNumber(number)).toEqual('999,999');
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

describe('getSmallerMultiple', () => {
  it('should return a multiple of a factor < number', () => {
    expect(getSmallerMultiple(91, 10)).toEqual(90);
  });

  it('should return the number if number is alread a multiple of the factor ', () => {
    expect(getSmallerMultiple(90, 10)).toEqual(90);
  });
});

describe('getLargerMultiple', () => {
  it('should return a multiple of a factor > number', () => {
    expect(getLargerMultiple(91, 10)).toEqual(100);
  });

  it('should return the number if number is alread a multiple of the factor ', () => {
    expect(getSmallerMultiple(90, 10)).toEqual(90);
  });
});
