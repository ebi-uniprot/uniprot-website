import { FC, Suspense } from 'react';
import { Loader } from 'franklin-sites';
import cn from 'classnames';

import ErrorBoundary from '../error-component/ErrorBoundary';

import './styles/single-column-layout.scss';

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
  </div>
);

export default SingleColumnLayout;
