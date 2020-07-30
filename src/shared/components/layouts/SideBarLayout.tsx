import React, { FC, ReactNode } from 'react';
import cn from 'classnames';

import ErrorBoundary from '../error-component/ErrorBoundary';

import './styles/side-bar-layout.scss';

type SideBarLayoutProps = {
  title?: ReactNode;
  sidebar: ReactNode;
  actionButtons?: ReactNode;
  invert?: boolean;
  className?: string;
};

const SideBarLayout: React.FC<SideBarLayoutProps> = ({
  title,
  sidebar,
  actionButtons,
  children,
  className,
}) => (
  <div className={cn('sidebar-layout', className)}>
    <ErrorBoundary>
      <section className="sidebar-layout__title">{title}</section>
    </ErrorBoundary>
    {actionButtons && (
      <ErrorBoundary>
        <section className="sidebar-layout__action-buttons">
          {actionButtons}
        </section>
      </ErrorBoundary>
    )}
    <section className="sidebar-layout__sidebar">
      <ErrorBoundary>{sidebar}</ErrorBoundary>
    </section>
    <section className="sidebar-layout__content">
      <ErrorBoundary>{children}</ErrorBoundary>
    </section>
  </div>
);

export default SideBarLayout;
