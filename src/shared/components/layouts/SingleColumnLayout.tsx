import React, { lazy, FC, Suspense } from 'react';

import ErrorBoundary from '../error-component/ErrorBoundary';

import './styles/single-column-layout.scss';

const UniProtFooter = lazy(() =>
  import(/* webpackChunkName: "footer" */ './UniProtFooter')
);

const SingleColumnLayout: FC = ({ children }) => (
  <div className="single-column-layout">
    <ErrorBoundary>
      <main>{children}</main>
    </ErrorBoundary>
    <Suspense fallback={null}>
      <ErrorBoundary>
        <UniProtFooter />
      </ErrorBoundary>
    </Suspense>
  </div>
);

export default SingleColumnLayout;
