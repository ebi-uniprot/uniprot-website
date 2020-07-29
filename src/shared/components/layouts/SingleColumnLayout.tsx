import React, { lazy, FC, Suspense, ReactNode } from 'react';
import { Loader } from 'franklin-sites';

import ErrorBoundary from '../error-component/ErrorBoundary';

import './styles/single-column-layout.scss';

const UniProtFooter = lazy(() =>
  import(/* webpackChunkName: "footer" */ './UniProtFooter')
);

type Props = {
  title?: ReactNode;
};

const SingleColumnLayout: FC<Props> = ({ children }) => (
  <div className="single-column-layout">
    <Suspense fallback={<Loader />}>
      <ErrorBoundary>
        <main className="single-column-layout__main">{children}</main>
      </ErrorBoundary>
    </Suspense>
    <Suspense fallback={null}>
      <ErrorBoundary>
        <UniProtFooter className="single-column-layout__footer" />
      </ErrorBoundary>
    </Suspense>
  </div>
);

export default SingleColumnLayout;
