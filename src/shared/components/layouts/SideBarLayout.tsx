import React from 'react';

import './styles/side-bar-layout.scss';
import ErrorBoundary from '../error-component/ErrorBoundary';

type SideBarLayoutProps = {
  title?: JSX.Element;
  sidebar: JSX.Element;
  children: JSX.Element;
  actionButtons?: JSX.Element;
  invert?: boolean;
};

const SideBarLayout: React.FC<SideBarLayoutProps> = ({
  title,
  sidebar,
  actionButtons,
  children,
}) => (
  <div className="sidebar-layout">
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
