import cn from 'classnames';
import { Loader } from 'franklin-sites';
import { FC, lazy, Suspense } from 'react';

import ErrorBoundary from '../error-component/ErrorBoundary';
import styles from './styles/single-column-layout.module.scss';

const UniProtFooter = lazy(
  () => import(/* webpackChunkName: "footer" */ './UniProtFooter')
);

type SingleColumnLayoutProps = {
  className?: string;
};

export const SingleColumnLayout: FC<
  React.PropsWithChildren<SingleColumnLayoutProps>
> = ({ children, className }) => (
  <>
    <div className={cn(styles['single-column-layout'], className)}>
      <main>
        <Suspense fallback={<Loader />}>
          <ErrorBoundary>{children}</ErrorBoundary>
        </Suspense>
      </main>
    </div>
    <ErrorBoundary>
      <Suspense fallback={null}>
        <UniProtFooter />
      </Suspense>
    </ErrorBoundary>
  </>
);
