import React from 'react';

import UniProtHeader from './UniProtHeader';

import ErrorBoundary from '../error-component/ErrorBoundary';
import MessageManagerContainer from '../../../messages/components/MessageManagerContainer';

import './styles/base-layout.scss';

const BaseLayout: React.FC<{ children: JSX.Element }> = ({ children }) => (
  <div className="base-layout">
    <section className="main-header">
      <ErrorBoundary>
        <UniProtHeader />
      </ErrorBoundary>
    </section>
    <section className="in-page-messages">
      <ErrorBoundary fallback={null}>
        <MessageManagerContainer />
      </ErrorBoundary>
    </section>
    <div className="main-content-and-footer">
      <ErrorBoundary>{children}</ErrorBoundary>
    </div>
  </div>
);

export default BaseLayout;
