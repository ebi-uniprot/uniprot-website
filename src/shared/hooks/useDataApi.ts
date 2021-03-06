import { useEffect, useReducer } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { v1 } from 'uuid';
import { useDispatch } from 'react-redux';

import fetchData from '../utils/fetchData';
import { addMessage } from '../../messages/state/messagesActions';
import {
  MessageFormat,
  MessageLevel,
} from '../../messages/types/messagesTypes';

// TODO: possible improvement:
// See https://developers.google.com/web/tools/workbox/modules/workbox-broadcast-update#using_broadcast_update
// Listen for a service worker message saying that there is new data to get
// fresher data from cache and replace the data within this custom hook

export type UseDataAPIState<T> = {
  loading: boolean;
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
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

type Action<T> =
  | { type: ActionType.INIT; url?: string }
  | {
      type: ActionType.SUCCESS;
      response?: AxiosResponse<T>;
      originalURL?: string;
    }
  | { type: ActionType.ERROR; error: AxiosError };

// eslint-disable-next-line consistent-return
const createReducer = <T>() => (
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
    case ActionType.SUCCESS:
      // eslint-disable-next-line no-case-declarations
      const newState: UseDataAPIState<T> = {
        ...state,
        loading: false,
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
        status: action.error.response && action.error.response.status,
        statusText: action.error.response && action.error.response.statusText,
        headers: action.error.response && action.error.response.headers,
        error: action.error,
      };
  }
};

function useDataApi<T>(url?: string | null): UseDataAPIState<T> {
  const [state, dispatch] = useReducer(createReducer<T>(), { loading: !!url });
  const reduxDispatch = useDispatch();

  useEffect(() => {
    // need this variabe to ensure state updates don't occur when cancelled/unmounted
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

    // actual request
    fetchData<T>(url, undefined, source.token).then(
      // handle ok
      (response: AxiosResponse) => {
        if (didCancel) {
          return;
        }
        dispatch({ type: ActionType.SUCCESS, response, originalURL: url });
      },
      // catch error
      (error: AxiosError) => {
        if (axios.isCancel(error) || didCancel) {
          return;
        }
        dispatch({ type: ActionType.ERROR, error });
      }
    );

    // handle unmounting of the hook
    // eslint-disable-next-line consistent-return
    return () => {
      source.cancel();
      didCancel = true;
    };
  }, [url]);

  useEffect(() => {
    if (state.status === 400) {
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
  }, [reduxDispatch, state.status, state.error]);

  // when changing the URL, the state is set asynchronously, this is to set it
  // to loading synchronously to avoid using previous data
  if (state.url !== url) {
    return { loading: Boolean(url), url };
  }

  return state;
}

export default useDataApi;
