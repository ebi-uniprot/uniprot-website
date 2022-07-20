import { lazy, Suspense, FC } from 'react';

import UniProtHeader from './UniProtHeader';

import ErrorBoundary from '../error-component/ErrorBoundary';
import MessageManagerContainer from '../../../messages/components/MessageManagerContainer';

import './styles/base-layout.scss';

const UniProtFooter = lazy(
  () => import(/* webpackChunkName: "footer" */ './UniProtFooter')
);

const BaseLayout: FC = ({ children }) => (
  <div className="base-layout">
    <header className="main-header">
      <ErrorBoundary fallback={null}>
        <UniProtHeader />
      </ErrorBoundary>
    </header>
    <section className="in-page-messages">
      <ErrorBoundary fallback={null}>
        <MessageManagerContainer />
      </ErrorBoundary>
    </section>
    <div className="main-content">
      <ErrorBoundary>{children}</ErrorBoundary>
    </div>
    <div className="footer">
      <ErrorBoundary>
        <Suspense fallback={null}>
          <UniProtFooter />
        </Suspense>
      </ErrorBoundary>
    </div>
  </div>
);

export default BaseLayout;
