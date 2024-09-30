import { renderHook, act } from '@testing-library/react';
import { JsonValue } from 'type-fest';

import useLocalStorage, {
  localStorageCache,
  UserPreferenceKey,
} from '../useLocalStorage';

describe('useLocalStorage hook', () => {
  afterEach(() => {
    window.localStorage.clear();
    localStorageCache.clear();
  });

  test('get value, basic, first time', async () => {
    const { result } = renderHook(() =>
      useLocalStorage('gdpr', 'default value')
    );

    expect(result.current[0]).toEqual('default value');
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    expect(JSON.parse(window.localStorage.getItem('gdpr')!)).toBe(
      'default value'
    );
  });

  test('get value, basic, first time, already saved', () => {
    window.localStorage.setItem('gdpr', JSON.stringify('previous value'));
    const { result } = renderHook(() =>
      useLocalStorage('gdpr', 'default value')
    );

    expect(result.current[0]).toEqual('previous value');
  });

  test('get 2 values with same hook, basic, first time, already saved', async () => {
    window.localStorage.setItem('gdpr', JSON.stringify('previous value'));
    window.localStorage.setItem('view-mode', JSON.stringify('previous view'));
    const { result, rerender } = renderHook<
      [
        state: JsonValue,
        setState: React.Dispatch<React.SetStateAction<JsonValue>>,
      ],
      { key: UserPreferenceKey }
    >((props) => useLocalStorage<JsonValue>(props.key, 'default value'), {
      initialProps: { key: 'gdpr' as const },
    });

    expect(result.current[0]).toEqual('previous value');

    rerender({ key: 'view-mode' as const });

    expect(result.current[0]).toEqual('previous view');
  });

  test('set value, basic, already saved', async () => {
    window.localStorage.setItem('gdpr', JSON.stringify('previous value'));
    const { result } = renderHook(() =>
      useLocalStorage<string>('gdpr', 'default value')
    );

    act(() => result.current[1]('other value'));

    expect(result.current[0]).toEqual('other value');
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    expect(JSON.parse(window.localStorage.getItem('gdpr')!)).toBe(
      'other value'
    );
  });

  test('set value, through function of current value', async () => {
    window.localStorage.setItem('gdpr', JSON.stringify('other value'));
    const { result } = renderHook(() =>
      useLocalStorage<string>('gdpr', 'default value')
    );

    act(() =>
      result.current[1]((currentValue) => `(${currentValue.toUpperCase()}!)`)
    );

    expect(result.current[0]).toEqual('(OTHER VALUE!)');
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    expect(JSON.parse(window.localStorage.getItem('gdpr')!)).toBe(
      '(OTHER VALUE!)'
    );
  });

  test('set value, types', async () => {
    const { result } = renderHook(() =>
      useLocalStorage<JsonValue>('gdpr', 'default value')
    );

    act(() => result.current[1](0));

    expect(result.current[0]).toEqual(0);

    act(() => result.current[1]([1]));

    expect(result.current[0]).toEqual([1]);

    act(() => result.current[1]({ complex: 'object', ok: true }));

    expect(result.current[0]).toEqual({ complex: 'object', ok: true });

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    expect(JSON.parse(window.localStorage.getItem('gdpr')!)).toEqual({
      complex: 'object',
      ok: true,
    });
  });

  test('sync value from storage event', async () => {
    const { result } = renderHook(() =>
      useLocalStorage('gdpr', 'default value')
    );

    expect(result.current[0]).toEqual('default value');

    // event we are not interested in
    act(() => {
      window.dispatchEvent(
        new StorageEvent('storage', {
          // Important, a different key, that we are not interested in
          key: 'view-mode',
          newValue: JSON.stringify('new value'),
          storageArea: window.localStorage,
        })
      );
    });

    expect(result.current[0]).toEqual('default value');

    // event we are interested in
    act(() => {
      window.dispatchEvent(
        new StorageEvent('storage', {
          key: 'gdpr',
          newValue: JSON.stringify('new value'),
          storageArea: window.localStorage,
        })
      );
    });

    expect(result.current[0]).toEqual('new value');

    // event we are interested in, delete event, should reset to default
    act(() => {
      window.dispatchEvent(
        new StorageEvent('storage', {
          key: 'gdpr',
          newValue: null,
          storageArea: window.localStorage,
        })
      );
    });

    expect(result.current[0]).toEqual('default value');

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    expect(JSON.parse(window.localStorage.getItem('gdpr')!)).toBe(
      'default value'
    );
  });
});
