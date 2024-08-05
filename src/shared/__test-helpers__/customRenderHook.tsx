import { renderHook } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

function getCustomRenderHook<TProps, TResult>(
  hook: (props: TProps) => TResult
) {
  return function customRenderHook(path?: string, state?: unknown) {
    const history = createMemoryHistory();
    if (path) {
      history.push(path, state);
    }
    return renderHook(hook, {
      wrapper: ({ children }) => <Router history={history}>{children}</Router>,
    });
  };
}

export default getCustomRenderHook;
