import { act, renderHook } from '@testing-library/react';

import useSessionStorage from '../useSessionStorage';

const KEY = 'ai-annotations';

beforeEach(() => {
  window.sessionStorage.clear();
});

describe('useSessionStorage', () => {
  it('reads the default value on first mount and writes it through', () => {
    const { result } = renderHook(() => useSessionStorage(KEY, false));

    expect(result.current[0]).toBe(false);
    expect(window.sessionStorage.getItem(KEY)).toBe('false');
  });

  it('reads a previously stored value instead of the default', () => {
    window.sessionStorage.setItem(KEY, 'true');

    const { result } = renderHook(() => useSessionStorage(KEY, false));

    expect(result.current[0]).toBe(true);
  });

  it('persists a set value to sessionStorage', () => {
    const { result } = renderHook(() => useSessionStorage<boolean>(KEY, false));

    act(() => result.current[1](true));

    expect(result.current[0]).toBe(true);
    expect(window.sessionStorage.getItem(KEY)).toBe('true');
  });

  it('supports functional updates against the current value', () => {
    window.sessionStorage.setItem(KEY, 'true');

    const { result } = renderHook(() => useSessionStorage<boolean>(KEY, false));

    act(() => result.current[1]((current) => !current));

    expect(result.current[0]).toBe(false);
    expect(window.sessionStorage.getItem(KEY)).toBe('false');
  });

  it('a second mounted instance picks up the persisted value', () => {
    const first = renderHook(() => useSessionStorage<boolean>(KEY, false));
    act(() => first.result.current[1](true));

    const second = renderHook(() => useSessionStorage<boolean>(KEY, false));

    expect(second.result.current[0]).toBe(true);
  });

  it('does not clobber a user-set value when the parent re-renders with a fresh defaultValue reference', () => {
    // Simulate a parent that re-renders with structurally-equivalent but
    // referentially-different defaults each render. The pre-fix hook had a
    // useEffect that re-ran the initialiser on defaultValueStr change and
    // would overwrite a user-set value here.
    const { result, rerender } = renderHook(
      ({ defaultValue }) => useSessionStorage(KEY, defaultValue),
      { initialProps: { defaultValue: { enabled: false } } }
    );

    act(() => result.current[1]({ enabled: true }));

    rerender({ defaultValue: { enabled: false } });

    expect(result.current[0]).toEqual({ enabled: true });
  });
});
