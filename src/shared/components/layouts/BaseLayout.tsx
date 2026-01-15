import { type ReactNode } from 'react';
import { Route, Switch } from 'react-router-dom';

import { Location, LocationToPath } from '../../../app/config/urls';
import MessageManagerContainer from '../../../messages/components/MessageManagerContainer';
import ErrorBoundary from '../error-component/ErrorBoundary';
import ApiDocumentationHeader from './ApiDocumentationHeader';
import styles from './styles/base-layout.module.scss';
import UniProtHeader from './UniProtHeader';

const BaseLayout = ({ children }: { children: ReactNode }) => (
  <div className={styles['base-layout']}>
    <header className={styles['main-header']}>
      <ErrorBoundary fallback={null}>
        <Switch>
          <Route
            path={LocationToPath[Location.Documentation]}
            component={ApiDocumentationHeader}
          />
          <Route path="*" component={UniProtHeader} />
        </Switch>
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
