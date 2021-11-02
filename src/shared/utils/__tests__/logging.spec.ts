/* eslint-disable no-console */
import { createGtagEvent } from '../logging';

describe('createGtagEvent', () => {
  it('should deal with objects', () => {
    expect(
      createGtagEvent('log', { extra: { foo: 'bar', baz: ['baz', 'qux'] } })
    ).toEqual({
      event_label: 'log',
      event_extra: '{"foo":"bar","baz":["baz","qux"]}',
    });
  });
});
