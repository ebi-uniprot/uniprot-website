import { renderHook, act } from '@testing-library/react';

import useSafeState from '../useSafeState';

describe('useSafeState hook', () => {
  test('basic usage, value', () => {
    const { result } = renderHook(() => useSafeState('value'));

    expect(result.current[0]).toEqual('value');

    act(() => result.current[1]('other value'));

    expect(result.current[0]).toEqual('other value');
  });

  test('basic usage, setter', () => {
    const { result } = renderHook(() => useSafeState('value'));

    expect(result.current[0]).toEqual('value');

    act(() => result.current[1]((state) => `other ${state}`));

    expect(result.current[0]).toEqual('other value');
  });

  test('use after unmounting, value', () => {
    const { result, unmount } = renderHook(() => useSafeState('value'));

    expect(result.current[0]).toEqual('value');

    unmount();

    act(() => result.current[1](`other value`));

    // expect to not have changed, even if in real life we won't have access to
    // the state anymore
    expect(result.current[0]).toEqual('value');
  });

  test('use after unmounting, setter', () => {
    const { result, unmount } = renderHook(() => useSafeState('value'));

    expect(result.current[0]).toEqual('value');

    unmount();

    act(() => result.current[1]((state) => `other ${state}`));

    // expect to not have changed, even if in real life we won't have access to
    // the state anymore
    expect(result.current[0]).toEqual('value');
  });
});
