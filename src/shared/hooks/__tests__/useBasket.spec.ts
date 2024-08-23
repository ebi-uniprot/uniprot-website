import { renderHook, act } from '@testing-library/react-hooks';

import { Namespace } from '../../types/namespaces';

import useBasket from '../useBasket';

import { localStorageCache } from '../useLocalStorage';

describe('useBasket hook', () => {
  afterEach(() => {
    window.localStorage.clear();
    localStorageCache.clear();
  });

  test('get value, basic, first time', async () => {
    const { result } = renderHook(() => useBasket());

    expect(result.current[0]).toEqual(
      new Map([
        [Namespace.uniprotkb, new Set()],
        [Namespace.uniref, new Set()],
        [Namespace.uniparc, new Set()],
      ])
    );
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    expect(JSON.parse(window.localStorage.getItem('basket')!)).toEqual({
      [Namespace.uniprotkb]: [],
      [Namespace.uniref]: [],
      [Namespace.uniparc]: [],
    });
  });

  test('get value, basic, first time, already saved', () => {
    window.localStorage.setItem(
      'basket',
      JSON.stringify({
        [Namespace.uniprotkb]: ['P05067'],
        [Namespace.uniref]: [],
        [Namespace.uniparc]: ['UPI0000000001', 'UPI0000000002'],
      })
    );
    const { result } = renderHook(() => useBasket());

    expect(result.current[0]).toEqual(
      new Map([
        [Namespace.uniprotkb, new Set(['P05067'])],
        [Namespace.uniref, new Set()],
        [Namespace.uniparc, new Set(['UPI0000000001', 'UPI0000000002'])],
      ])
    );
  });

  test('set value, basic, already saved', async () => {
    window.localStorage.setItem(
      'basket',
      JSON.stringify({
        [Namespace.uniprotkb]: ['P05067'],
        [Namespace.uniref]: [],
        [Namespace.uniparc]: ['UPI0000000001', 'UPI0000000002'],
      })
    );
    const { result } = renderHook(() => useBasket());

    act(() =>
      result.current[1](
        new Map([
          [Namespace.uniprotkb, new Set()],
          [Namespace.uniref, new Set()],
          [Namespace.uniparc, new Set(['UPI0000000001', 'UPI0000000002'])],
        ])
      )
    );

    expect(result.current[0]).toEqual(
      new Map([
        [Namespace.uniprotkb, new Set()],
        [Namespace.uniref, new Set()],
        [Namespace.uniparc, new Set(['UPI0000000001', 'UPI0000000002'])],
      ])
    );
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    expect(JSON.parse(window.localStorage.getItem('basket')!)).toEqual({
      [Namespace.uniprotkb]: [],
      [Namespace.uniref]: [],
      [Namespace.uniparc]: ['UPI0000000001', 'UPI0000000002'],
    });
  });

  test('set value, through function of current value', async () => {
    window.localStorage.setItem(
      'basket',
      JSON.stringify({
        [Namespace.uniprotkb]: ['P05067'],
        [Namespace.uniref]: [],
        [Namespace.uniparc]: ['UPI0000000001', 'UPI0000000002'],
      })
    );
    const { result } = renderHook(() => useBasket());

    act(() =>
      result.current[1](
        (currentValue) =>
          new Map([...currentValue, [Namespace.uniprotkb, new Set()]])
      )
    );

    expect(result.current[0]).toEqual(
      new Map([
        [Namespace.uniprotkb, new Set([])],
        [Namespace.uniref, new Set([])],
        [Namespace.uniparc, new Set(['UPI0000000001', 'UPI0000000002'])],
      ])
    );
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    expect(JSON.parse(window.localStorage.getItem('basket')!)).toEqual({
      [Namespace.uniprotkb]: [],
      [Namespace.uniref]: [],
      [Namespace.uniparc]: ['UPI0000000001', 'UPI0000000002'],
    });
  });
});
