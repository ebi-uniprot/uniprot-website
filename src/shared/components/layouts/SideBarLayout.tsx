import { lazy, Suspense, ReactNode } from 'react';
import cn from 'classnames';

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
}: SidebarLayoutProps) => (
  <>
    <div
      className={cn(
        styles['sidebar-layout'],
        { [styles['no-overflow']]: noOverflow },
        className
      )}
    >
      <aside className={styles.sidebar}>
        <ErrorBoundary>{sidebar}</ErrorBoundary>
      </aside>
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
