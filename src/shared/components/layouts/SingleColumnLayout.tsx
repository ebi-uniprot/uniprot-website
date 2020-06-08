import React, { lazy, FC, Suspense } from 'react';
import { Loader } from 'franklin-sites';

import ErrorBoundary from '../error-component/ErrorBoundary';

import './styles/single-column-layout.scss';

const UniProtFooter = lazy(() =>
  import(/* webpackChunkName: "footer" */ './UniProtFooter')
);

const SingleColumnLayout: FC = ({ children }) => (
  <div className="single-column-layout">
    <Suspense fallback={<Loader />}>
      <ErrorBoundary>
        <main>{children}</main>
      </ErrorBoundary>
    </Suspense>
    <Suspense fallback={null}>
      <ErrorBoundary>
        <UniProtFooter className="footer" />
      </ErrorBoundary>
    </Suspense>
  </div>
);

export default SingleColumnLayout;
