import { ReactNode } from 'react';

import UniProtHeader from './UniProtHeader';

import ErrorBoundary from '../error-component/ErrorBoundary';
import MessageManagerContainer from '../../../messages/components/MessageManagerContainer';

import styles from './styles/base-layout.module.scss';

const BaseLayout = ({ children }: { children: ReactNode }) => (
  <div className={styles['base-layout']}>
    <header className={styles['main-header']}>
      <ErrorBoundary fallback={null}>
        <UniProtHeader />
      </ErrorBoundary>
    </header>
    <section className={styles['in-page-messages']}>
      <ErrorBoundary fallback={null}>
        <MessageManagerContainer />
      </ErrorBoundary>
    </section>
    <div className={styles['main-content']}>
      <ErrorBoundary>{children}</ErrorBoundary>
    </div>
  </div>
);

export default BaseLayout;
