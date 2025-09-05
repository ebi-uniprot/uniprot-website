import { ReactNode } from 'react';
import { useMatch } from 'react-router';

import { Location, LocationToPath } from '../../../app/config/urls';
import MessageManagerContainer from '../../../messages/components/MessageManagerContainer';
import ErrorBoundary from '../error-component/ErrorBoundary';
import ApiDocumentationHeader from './ApiDocumentationHeader';
import styles from './styles/base-layout.module.scss';
import UniProtHeader from './UniProtHeader';

const BaseLayout = ({ children }: { children: ReactNode }) => {
  const apiDocMatch = useMatch(LocationToPath[Location.Documentation]);

  return (
    <div className={styles['base-layout']}>
      <header className={styles['main-header']}>
        <ErrorBoundary fallback={null}>
          {apiDocMatch ? <ApiDocumentationHeader /> : <UniProtHeader />}
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
};

export default BaseLayout;
