import listFormat from '../listFormat';

const list = ['one', 'two', 'three', 'four'];

const reducer = (acc, current, index, array) =>
  acc + listFormat(index, array) + current;

describe('listFormat', () => {
  test('1 item', () => {
    expect(list.slice(0, 1).reduce(reducer)).toBe('one');
  });

  test('2 items', () => {
    expect(list.slice(0, 2).reduce(reducer)).toBe('one and two');
  });

  test('3 items', () => {
    expect(list.slice(0, 3).reduce(reducer)).toBe('one, two, and three');
  });

  test('4 items', () => {
    expect(list.slice(0, 4).reduce(reducer)).toBe('one, two, three, and four');
  });
});
