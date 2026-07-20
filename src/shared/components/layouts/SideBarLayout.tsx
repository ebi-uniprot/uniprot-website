import cn from 'classnames';
import { lazy, type ReactNode, Suspense } from 'react';

import {
  useEarlySidebarCollapseScreen,
  useSmallScreen,
} from '../../hooks/useMatchMedia';
import ErrorBoundary from '../error-component/ErrorBoundary';
import styles from './styles/sidebar-layout.module.scss';

const UniProtFooter = lazy(
  () => import(/* webpackChunkName: "footer" */ './UniProtFooter')
);

type SidebarLayoutProps = {
  sidebar: ReactNode;
  className?: string;
  noOverflow?: boolean;
  // Collapse the sidebar below ~768px instead of Franklin's default ~640px,
  // freeing horizontal space for the main content (used by the entry page so
  // its sticky bar gets more room). Opt-in so other pages keep the standard
  // breakpoint.
  collapseSidebarEarly?: boolean;
  children: ReactNode;
};

export const SidebarLayout = ({
  sidebar,
  children,
  className,
  noOverflow,
  collapseSidebarEarly,
}: SidebarLayoutProps) => {
  const smallScreen = useSmallScreen();
  const earlyCollapse = useEarlySidebarCollapseScreen();
  const hideSidebar = collapseSidebarEarly ? earlyCollapse : smallScreen;

  return (
    <>
      <div
        className={cn(
          styles['sidebar-layout'],
          {
            [styles['no-overflow']]: noOverflow,
            [styles['collapse-sidebar-early']]: collapseSidebarEarly,
          },
          className
        )}
      >
        {!hideSidebar && (
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
