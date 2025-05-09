import cn from 'classnames';
import { lazy, ReactNode, Suspense } from 'react';

import { useSmallScreen } from '../../hooks/useMatchMedia';
import ErrorBoundary from '../error-component/ErrorBoundary';
import styles from './styles/sidebar-layout.module.scss';

const UniProtFooter = lazy(
  () => import(/* webpackChunkName: "footer" */ './UniProtFooter')
);

type SidebarLayoutProps = {
  sidebar: ReactNode;
  className?: string;
  noOverflow?: boolean;
  children: ReactNode;
};

export const SidebarLayout = ({
  sidebar,
  children,
  className,
  noOverflow,
}: SidebarLayoutProps) => {
  const smallScreen = useSmallScreen();

  return (
    <>
      <div
        className={cn(
          styles['sidebar-layout'],
          { [styles['no-overflow']]: noOverflow },
          className
        )}
      >
        {!smallScreen && (
          <aside className={styles.sidebar}>
            <ErrorBoundary>{sidebar}</ErrorBoundary>
          </aside>
        )}
        <main className={styles.content}>
          <ErrorBoundary>{children}</ErrorBoundary>
        </main>
      </div>
      <Suspense fallback={null}>
        <ErrorBoundary>
          <UniProtFooter />
        </ErrorBoundary>
      </Suspense>
    </>
  );
};
