import { type ReactNode, useRef } from 'react';
import { Route, Switch } from 'react-router-dom';

import { Location, LocationToPath } from '../../../app/config/urls';
import MessageManagerContainer from '../../../messages/components/MessageManagerContainer';
import { ScrollableContainerContext } from '../../contexts/ScrollableContainer';
import ErrorBoundary from '../error-component/ErrorBoundary';
import ApiDocumentationHeader from './ApiDocumentationHeader';
import styles from './styles/base-layout.module.scss';
import UniProtHeader from './UniProtHeader';

const BaseLayout = ({ children }: { children: ReactNode }) => {
  // Published via context so descendants (eg. EntryTabLink) can scroll the
  // page without reaching through `document.querySelector` and depending on
  // this module's class names.
  const mainContentRef = useRef<HTMLDivElement>(null);
  return (
    <ScrollableContainerContext.Provider value={mainContentRef}>
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
        <div ref={mainContentRef} className={styles['main-content']}>
          <ErrorBoundary>{children}</ErrorBoundary>
        </div>
      </div>
    </ScrollableContainerContext.Provider>
  );
};

export default BaseLayout;
