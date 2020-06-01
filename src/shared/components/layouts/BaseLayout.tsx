import React from 'react';

import UniProtHeader from './UniProtHeader';
import UniProtFooter from './UniProtFooter';

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
      <section className="main-content">
        <ErrorBoundary>{children}</ErrorBoundary>
      </section>

      <section className="footer">
        <ErrorBoundary>
          <UniProtFooter />
        </ErrorBoundary>
      </section>
    </div>
  </div>
);

export default BaseLayout;
