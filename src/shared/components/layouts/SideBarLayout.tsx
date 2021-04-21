import { FC, ReactNode } from 'react';
import cn from 'classnames';

import ErrorBoundary from '../error-component/ErrorBoundary';

import './styles/side-bar-layout.scss';

type SideBarLayoutProps = {
  title?: ReactNode;
  sidebar: ReactNode;
  invert?: boolean;
  className?: string;
};

const SideBarLayout: FC<SideBarLayoutProps> = ({
  title,
  sidebar,
  children,
  className,
}) => (
  <div className={cn('sidebar-layout', className)}>
    <section className="sidebar-layout__sidebar">
      <ErrorBoundary>{sidebar}</ErrorBoundary>
    </section>
    <section className="sidebar-layout__content">
      <ErrorBoundary>
        <section className="sidebar-layout__title">{title}</section>
      </ErrorBoundary>
      <ErrorBoundary>{children}</ErrorBoundary>
    </section>
  </div>
);

export default SideBarLayout;
