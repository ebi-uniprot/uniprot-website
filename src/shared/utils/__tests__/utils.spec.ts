/**
 * @jest-environment node
 */
import { removeProperty, formatLargeNumber, getBEMClassName } from '../utils';

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
