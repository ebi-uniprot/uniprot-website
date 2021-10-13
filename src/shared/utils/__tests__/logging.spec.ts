/* eslint-disable no-console */
import { createGtagEvent } from '../logging';

describe('createGtagEvent', () => {
  it('should deal with objects', () => {
    expect(createGtagEvent('log', { foo: 'bar', baz: ['baz', 'qux'] })).toEqual(
      {
        event_baz: '["baz","qux"]',
        event_foo: '"bar"',
        event_label: 'log',
      }
    );
  });
  it('should deal with strings', () => {
    expect(createGtagEvent('log', 'foo')).toEqual({
      event_data: 'foo',
      event_label: 'log',
    });
  });
  it('should deal with numbers', () => {
    expect(createGtagEvent('log', 12345)).toEqual({
      event_data: 12345,
      event_label: 'log',
    });
  });

  it('should deal with booleans', () => {
    expect(createGtagEvent('log', true)).toEqual({
      event_data: true,
      event_label: 'log',
    });
  });

  it('should warn when event data type is not handled', () => {
    console.warn = jest.fn();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (global as any).LIVE_RELOAD = false;
    createGtagEvent('log', undefined);
    expect(console.warn).not.toHaveBeenCalled();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (global as any).LIVE_RELOAD = true;
    createGtagEvent('log', undefined);
    expect(console.warn).toHaveBeenCalled();
  });
});
