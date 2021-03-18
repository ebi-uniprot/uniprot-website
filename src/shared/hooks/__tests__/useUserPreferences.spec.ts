import { createElement, FC } from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { JsonValue } from 'type-fest';

import useUserPreferences from '../useUserPreferences';

import UserPreferencesContext, {
  UserPreferences,
} from '../../contexts/UserPreferences';

import useSafeState from '../useSafeState';

const Wrapper: FC<{ initialState: UserPreferences }> = ({
  children,
  initialState,
}) => {
  const [state, setState] = useSafeState(initialState);

  return createElement(
    UserPreferencesContext.Provider,
    { value: [state, setState] },
    children
  );
};

describe('useUserPreferences hook', () => {
  afterEach(() => {
    window.localStorage.clear();
  });

  test('get value, basic, first time', async () => {
    const { result, waitFor } = renderHook(
      () => useUserPreferences('gdpr', 'default value'),
      { wrapper: Wrapper, initialProps: { initialState: {} } }
    );

    expect(window.localStorage.getItem('gdpr')).toBeNull();
    expect(result.current[0]).toEqual('default value');

    await waitFor(() =>
      expect(JSON.parse(window.localStorage.getItem('gdpr'))).toBe(
        'default value'
      )
    );
  });

  test('get value, basic, second time', () => {
    const { result } = renderHook(
      () => useUserPreferences('gdpr', 'default value'),
      {
        wrapper: Wrapper,
        initialProps: { initialState: { gdpr: 'previous value' } },
      }
    );

    expect(result.current[0]).toEqual('previous value');
  });

  test('get value, basic, first time, already saved', () => {
    window.localStorage.setItem('gdpr', JSON.stringify('previous value'));
    const { result } = renderHook(
      () => useUserPreferences('gdpr', 'default value'),
      {
        wrapper: Wrapper,
        initialProps: { initialState: {} },
      }
    );

    expect(result.current[0]).toEqual('previous value');
  });

  test('set value, basic, already saved', async () => {
    window.localStorage.setItem('gdpr', JSON.stringify('previous value'));
    const { result, waitFor } = renderHook(
      () => useUserPreferences<string>('gdpr', 'default value'),
      {
        wrapper: Wrapper,
        initialProps: { initialState: { gdpr: 'default value' } },
      }
    );

    act(() => result.current[1]('other value'));

    expect(result.current[0]).toEqual('other value');
    await waitFor(() =>
      expect(JSON.parse(window.localStorage.getItem('gdpr'))).toBe(
        'other value'
      )
    );
  });

  test('set value, through function of current value', async () => {
    const { result, waitFor } = renderHook(
      () => useUserPreferences<string>('gdpr', 'default value'),
      {
        wrapper: Wrapper,
        initialProps: { initialState: { gdpr: 'other value' } },
      }
    );

    act(() =>
      result.current[1]((currentValue) => `(${currentValue.toUpperCase()}!)`)
    );

    expect(result.current[0]).toEqual('(OTHER VALUE!)');

    await waitFor(() =>
      expect(JSON.parse(window.localStorage.getItem('gdpr'))).toBe(
        '(OTHER VALUE!)'
      )
    );
  });

  test('set value, types', async () => {
    const { result, waitFor } = renderHook(
      () => useUserPreferences<JsonValue>('gdpr', 'default value'),
      {
        wrapper: Wrapper,
        initialProps: { initialState: { gdpr: 'default value' } },
      }
    );

    act(() => result.current[1](0));

    expect(result.current[0]).toEqual(0);

    act(() => result.current[1]([1]));

    expect(result.current[0]).toEqual([1]);

    act(() => result.current[1]({ complex: 'object', ok: true }));

    expect(result.current[0]).toEqual({ complex: 'object', ok: true });

    await waitFor(() =>
      expect(JSON.parse(window.localStorage.getItem('gdpr'))).toEqual({
        complex: 'object',
        ok: true,
      })
    );
  });

  test('sync value from storage event', async () => {
    const { result, waitFor } = renderHook(
      () => useUserPreferences('gdpr', 'default value'),
      { wrapper: Wrapper, initialProps: { initialState: {} } }
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

    await waitFor(() =>
      expect(JSON.parse(window.localStorage.getItem('gdpr'))).toBe(
        'default value'
      )
    );
  });
});
