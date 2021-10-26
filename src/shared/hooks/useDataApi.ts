import { useEffect, useReducer } from 'react';
import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';
import { v1 } from 'uuid';
import { useDispatch } from 'react-redux';

import fetchData from '../utils/fetchData';
import { addMessage } from '../../messages/state/messagesActions';
import * as logging from '../utils/logging';

import {
  MessageFormat,
  MessageLevel,
} from '../../messages/types/messagesTypes';
import { Namespace } from '../types/namespaces';
import { UserPreferenceKey } from './useLocalStorage';

const invalidFieldMessage = /Invalid fields parameter value '(?<field>[^']*)'/;
const namespacedURL = new RegExp(
  `api/(?<namespace>${Object.values(Namespace).join('|')})/search`
);

// TODO: possible improvement:
// See https://developers.google.com/web/tools/workbox/modules/workbox-broadcast-update#using_broadcast_update
// Listen for a service worker message saying that there is new data to get
// fresher data from cache and replace the data within this custom hook

// Threshold under which a progress event will not be emitted
// This is in order to avoid unecessary renders
const PROGRESS_THRESHOLD = 2_000; // 2s

export type UseDataAPIState<T> = {
  loading: boolean;
  progress?: number;
  data?: T;
  status?: AxiosResponse['status'];
  statusText?: AxiosResponse['statusText'];
  headers?: Record<string, string>;
  error?: AxiosError<{ messages?: string[] }>;
  redirectedTo?: string;
  url?: string | null;
};

enum ActionType {
  INIT = 'INIT',
  PROGRESS = 'PROGRESS',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

type Action<T> =
  | { type: ActionType.INIT; url?: string }
  | { type: ActionType.PROGRESS; progress: number }
  | {
      type: ActionType.SUCCESS;
      response?: AxiosResponse<T>;
      originalURL?: string;
      progress?: 1;
    }
  | { type: ActionType.ERROR; error: AxiosError };

// eslint-disable-next-line consistent-return
const createReducer =
  <T>() =>
  (
    state: UseDataAPIState<T>,
    action: Action<T>
    // eslint-disable-next-line consistent-return
  ): UseDataAPIState<T> => {
    // eslint-disable-next-line default-case
    switch (action.type) {
      case ActionType.INIT:
        return {
          loading: true,
          url: action.url,
        };
      case ActionType.PROGRESS:
        return {
          ...state,
          progress: action.progress,
        };
      case ActionType.SUCCESS:
        // eslint-disable-next-line no-case-declarations
        const newState: UseDataAPIState<T> = {
          ...state,
          loading: false,
          progress: action.progress,
          data: action.response && action.response.data,
          status: action.response && action.response.status,
          statusText: action.response && action.response.statusText,
          headers: action.response && action.response.headers,
        };
        if (
          action.response &&
          action.response.request.responseURL &&
          action.response.request.responseURL !== action.originalURL
        ) {
          newState.redirectedTo = action.response.request.responseURL;
        } else if (
          // Issue with casing in axios-mock-adapter?
          action.response &&
          action.response.request.responseUrl &&
          action.response.request.responseUrl !== action.originalURL
        ) {
          newState.redirectedTo = action.response.request.responseUrl;
        }
        return newState;
      case ActionType.ERROR:
        return {
          ...state,
          loading: false,
          progress: undefined,
          status: action.error.response && action.error.response.status,
          statusText: action.error.response && action.error.response.statusText,
          headers: action.error.response && action.error.response.headers,
          error: action.error,
        };
    }
  };

function useDataApi<T>(
  url?: string | null,
  options?: AxiosRequestConfig
): UseDataAPIState<T> {
  const [state, dispatch] = useReducer(createReducer<T>(), { loading: !!url });
  const reduxDispatch = useDispatch();

  useEffect(() => {
    // need this variable to ensure state updates don't occur when cancelled/unmounted
    // https://github.com/facebook/react/issues/14369#issuecomment-468267798
    let didCancel = false;

    // we don't require a URL, we just don't need data anymore
    // assume succes with no data
    if (!url) {
      dispatch({ type: ActionType.SUCCESS });
      return;
    }

    dispatch({ type: ActionType.INIT, url });

    // variables to handle cancellation
    const source = axios.CancelToken.source();

    // to keep track of the last time we dispatched a progress action
    let lastProgressDate: number;
    // actual request
    fetchData<T>(url, undefined, source.token, {
      ...options,
      onDownloadProgress: (progressEvent: ProgressEvent) => {
        options?.onDownloadProgress?.(progressEvent);
        if (
          didCancel ||
          !progressEvent.lengthComputable ||
          !progressEvent.total
        ) {
          return;
        }
        const now = Date.now();
        // If last time we dispatched a progress action was less than threshold
        if (lastProgressDate && now - lastProgressDate < PROGRESS_THRESHOLD) {
          // skip, don't want to refresh too often
          return;
        }
        dispatch({
          type: ActionType.PROGRESS,
          progress: progressEvent.loaded / progressEvent.total,
        });
        lastProgressDate = now;
      },
    }).then(
      // handle ok
      (response: AxiosResponse<T>) => {
        if (didCancel) {
          return;
        }
        dispatch({
          type: ActionType.SUCCESS,
          response,
          originalURL: url,
          progress: 1,
        });
      },
      // catch error
      (error: AxiosError) => {
        if (axios.isCancel(error) || didCancel) {
          return;
        }
        logging.error(error, { url }, { origin: 'useDataApi' });
        dispatch({ type: ActionType.ERROR, error });
      }
    );

    // handle unmounting of the hook
    // eslint-disable-next-line consistent-return
    return () => {
      source.cancel();
      didCancel = true;
    };
  }, [url, options]);

  useEffect(() => {
    // TODO: when refactoring, accept a onError callback to do this from outside
    if (state.status === 400) {
      // Just in case a field is updated in the server and is no longer valid
      try {
        for (const message of state.error?.response?.data?.messages || []) {
          const messageMatch = message.match(invalidFieldMessage);
          const invalidField = messageMatch?.groups?.field;
          if (!messageMatch) {
            continue; // eslint-disable-line no-continue
          }
          const nsMatch = state.url?.match(namespacedURL);
          if (!nsMatch?.groups?.namespace) {
            continue; // eslint-disable-line no-continue
          }
          const key =
            `table columns for ${nsMatch?.groups?.namespace}` as UserPreferenceKey;
          const faultyArray: string[] = JSON.parse(
            localStorage.getItem(key) as string
          );
          const correctArray = JSON.stringify(
            faultyArray.filter(
              (column) =>
                // Clean up any wrong type of value, and the faulty value too
                column && typeof column === 'string' && column !== invalidField
            )
          );
          localStorage.setItem(key, correctArray);
          // Signals to all useLocalStorage hooks in use to rerender
          window.dispatchEvent(
            new StorageEvent('storage', {
              key,
              newValue: correctArray,
              storageArea: window.localStorage,
            })
          );
          return;
        }
      } catch {
        /**/
      }
      reduxDispatch(
        addMessage({
          id: v1(),
          content:
            state.error?.response?.data?.messages?.join(',') || '400 Error',
          format: MessageFormat.POP_UP,
          level: MessageLevel.FAILURE,
        })
      );
    }
  }, [reduxDispatch, state.status, state.error, state.url]);

  // when changing the URL, the state is set asynchronously, this is to set it
  // to loading synchronously to avoid using previous data
  if (state.url !== url) {
    return { loading: Boolean(url), url };
  }

  return state;
}

export default useDataApi;
