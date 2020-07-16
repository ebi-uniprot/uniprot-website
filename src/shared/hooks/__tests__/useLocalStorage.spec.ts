import { renderHook, cleanup, act } from '@testing-library/react-hooks';

import useLocalStorage from '../useLocalStorage';

const url = '/some/path';
const url2 = '/some/other/path';

afterAll(() => {
  cleanup();
});

describe('useLocalStorage hook', () => {
  test('get value, basic', () => {
    const { result } = renderHook(() =>
      useLocalStorage('key', 'default value')
    );

    expect(result.current[0]).toEqual('default value');
  });

  test('set value, basic', () => {
    const { result } = renderHook(() =>
      useLocalStorage('key', 'default value')
    );

    act(() => result.current[1]('other value'));

    expect(result.current[0]).toEqual('other value');
  });

  test('set value, types', () => {
    const { result } = renderHook(() =>
      useLocalStorage('key', 'default value')
    );

    act(() => result.current[1](0));

    expect(result.current[0]).toEqual(0);

    act(() => result.current[1]([1]));

    expect(result.current[0]).toEqual([1]);

    act(() => result.current[1]({ complex: 'object', ok: true }));

    expect(result.current[0]).toEqual({ complex: 'object', ok: true });
  });

  test('set/get value, accross instances', async () => {
    const { result: instance1 } = renderHook(() =>
      useLocalStorage('key', 'default value')
    );

    act(() => instance1.current[1]([1, 2, 3, 4]));

    expect(localStorage.getItem('key')).toBe(JSON.stringify([1, 2, 3, 4]));

    const { result: instance2 } = renderHook(() =>
      useLocalStorage('key', 'other default value')
    );

    expect(instance2.current[0]).toEqual([1, 2, 3, 4]);
  });

  test('unset value, reset to default', async () => {
    const { result } = renderHook(() =>
      useLocalStorage('key', 'default value')
    );

    act(() => result.current[1]('value'));

    expect(result.current[0]).toEqual('value');

    act(() => result.current[2]());

    expect(result.current[0]).toEqual(null);
    expect(localStorage.getItem('key')).toBe(null);
  });
});
