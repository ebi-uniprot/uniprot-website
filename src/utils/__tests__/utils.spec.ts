import {
  serializableDeepCopy,
  serializableDeepAreEqual,
  removeProperty,
  formatLargeNumber,
  flattenArrays,
  truncateStringWithEllipsis,
  getBEMClassName,
} from '../utils';

test('serializableDeepCopy returns a copy that is not a reference ', () => {
  const obj = { foo: { bar: [1] } };
  const objCopy = serializableDeepCopy(obj);
  expect(objCopy).not.toBe(obj);
  expect(objCopy).toEqual(obj);
});

test('serializableDeepAreEqual returns true if has recursively equal attributes for obj1 and obj2 ', () => {
  const obj1 = { foo: { bar: [1] } };
  const obj2 = { foo: { bar: [1] } };
  expect(serializableDeepAreEqual(obj1, obj2)).toBe(true);
});

test('serializableDeepAreEqual returns false if has recursively unequal attributes for obj1 and obj2 ', () => {
  const obj1 = { foo: { bar: [1] } };
  const obj2 = { foo: { bar: [2] } };
  expect(serializableDeepAreEqual(obj1, obj2)).toBe(false);
});

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

test('flattenArrays', () => {
  const arrays = [[1, 2, 3], ['ab'], [4, '5']];
  expect(flattenArrays(arrays)).toEqual([1, 2, 3, 'ab', 4, '5']);
});

test('truncateStringWithEllipsis to return truncated string with ellipsis appended', () => {
  expect(truncateStringWithEllipsis('foo bar baz', 10)).toEqual('foo bar...');
});

test('truncateStringWithEllipsis to return string if less than maxLength', () => {
  expect(truncateStringWithEllipsis('foo bar baz', 11)).toEqual('foo bar baz');
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
