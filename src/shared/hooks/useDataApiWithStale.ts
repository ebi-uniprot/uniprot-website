import { AxiosRequestConfig } from 'axios';
import { useRef } from 'react';

import useDataApi, { UseDataAPIState } from './useDataApi';

export type UseDataAPIWithStaleState<T> = UseDataAPIState<T> & {
  isStale?: boolean;
};

/**
 * wraps useDataApi to provide a way to keep stale data in the component using
 * it, marking it as stale through the `isStale` field.
 */
function useDataApiWithStale<T>(
  url?: string | null,
  options?: AxiosRequestConfig
): UseDataAPIWithStaleState<T> {
  const staleDataRef = useRef<T>();

  const state = useDataApi<T>(url, options);

  if (state.data) {
    // fresh data available
    if (state.data !== staleDataRef.current) {
      // and different from stale data
      staleDataRef.current = state.data; // store fresh data as stale for later
    }
  } else if (staleDataRef.current) {
    // no fresh data, but stale data available
    return {
      ...state,
      data: staleDataRef.current,
      isStale: true,
    };
  }

  return state;
}

export default useDataApiWithStale;
