import {
  serializableDeepCopy,
  serializableDeepAreEqual,
  removeProperty,
  formatLargeNumber,
  flattenArrays,
  truncateStringWithEllipsis,
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
