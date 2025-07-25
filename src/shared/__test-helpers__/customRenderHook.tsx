import { renderHook } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { MemoryRouter } from 'react-router';

function getCustomRenderHook<TProps, TResult>(
  hook: (props: TProps) => TResult
) {
  return function customRenderHook(path?: string, state?: unknown) {
    const history = createMemoryHistory();
    if (path) {
      history.push(path, state);
    }
    const returned = renderHook(hook, {
      // TODO: fixme, find a way to test location of memory router
      wrapper: ({ children }) => (
        <MemoryRouter history={history}>{children}</MemoryRouter>
      ),
    });

    return { ...returned, history };
  };
}

export default getCustomRenderHook;
