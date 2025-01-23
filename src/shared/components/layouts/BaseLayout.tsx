import { ReactNode } from 'react';
import { useMatch } from 'react-router';

import UniProtHeader from './UniProtHeader';
import ApiDocumentationHeader from './ApiDocumentationHeader';
import ErrorBoundary from '../error-component/ErrorBoundary';
import MessageManagerContainer from '../../../messages/components/MessageManagerContainer';

import { LocationToPath, Location } from '../../../app/config/urls';

import styles from './styles/base-layout.module.scss';

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
