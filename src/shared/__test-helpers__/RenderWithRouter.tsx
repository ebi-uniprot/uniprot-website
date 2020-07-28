import React from 'react';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory, MemoryHistory, LocationState } from 'history';
// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from '@testing-library/react';

type RenderOptions = {
  route?: string;
  history?: MemoryHistory<LocationState>;
  path?: string;
};
const renderWithRouter = (
  ui: React.ReactNode,
  {
    route = '',
    path,
    history = createMemoryHistory({ initialEntries: [route] }),
  }: RenderOptions = {}
) => {
  const renderOutput = render(
    <Router history={history}>
      {path ? <Route path={path} render={() => ui} /> : ui}
    </Router>
  );
  return {
    ...renderOutput,
    rerenderWithRouter: (ui: React.ReactNode) =>
      renderOutput.rerender(
        <Router history={history}>
          {path ? <Route path={path} render={() => ui} /> : ui}
        </Router>
      ),
    history,
  };
};

export default renderWithRouter;
