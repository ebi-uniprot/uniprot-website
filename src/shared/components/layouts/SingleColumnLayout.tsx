import React, { lazy, FC, Suspense } from 'react';
import { Loader } from 'franklin-sites';
import cn from 'classnames';

import ErrorBoundary from '../error-component/ErrorBoundary';

import './styles/single-column-layout.scss';

const UniProtFooter = lazy(() =>
  import(/* webpackChunkName: "footer" */ './UniProtFooter')
);

type Props = {
  className?: string;
};

const SingleColumnLayout: FC<Props> = ({ children, className }) => (
  <div className={cn('single-column-layout', className)}>
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
