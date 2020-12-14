import { lazy, FC, Suspense } from 'react';
import { Loader } from 'franklin-sites';
import cn from 'classnames';

import ErrorBoundary from '../error-component/ErrorBoundary';

import './styles/single-column-layout.scss';

const UniProtFooter = lazy(
  () => import(/* webpackChunkName: "footer" */ './UniProtFooter')
);

type SingleColumnLayoutProps = {
  className?: string;
};

const SingleColumnLayout: FC<SingleColumnLayoutProps> = ({
  children,
  className,
}) => (
  <div className={cn('single-column-layout', className)}>
    <main className="single-column-layout__main">
      <Suspense fallback={<Loader />}>
        <ErrorBoundary>{children}</ErrorBoundary>
      </Suspense>
    </main>
    <Suspense fallback={null}>
      <ErrorBoundary>
        <UniProtFooter className="single-column-layout__footer" />
      </ErrorBoundary>
    </Suspense>
  </div>
);

export default SingleColumnLayout;
