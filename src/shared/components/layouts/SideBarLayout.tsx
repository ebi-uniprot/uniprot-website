import React, { FC, ReactNode, useRef, cloneElement } from 'react';
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
}) => {
  const contentRef = useRef<HTMLElement>(null);
  return (
    <div className={cn('sidebar-layout', className)}>
      <section className="sidebar-layout__sidebar">
        <ErrorBoundary>{sidebar}</ErrorBoundary>
      </section>
      <section className="sidebar-layout__content" ref={contentRef}>
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
        <ErrorBoundary>{cloneElement(children, { contentRef })}</ErrorBoundary>
      </section>
    </div>
  );
};
export default SideBarLayout;
