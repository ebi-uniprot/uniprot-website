import { FC } from 'react';

import { HelmetProvider } from 'react-helmet-async';
import { Provider as ReduxProvider } from 'react-redux';
import { FranklinSite } from 'franklin-sites';
import { Router } from 'react-router-dom';

import { MessagesProvider } from '../../shared/contexts/Messages';
import { DatabaseInfoMapsProvider } from '../../shared/contexts/DatabaseInfoMaps';

import history from '../../shared/utils/browserHistory';
import store from '../state/store';

const GlobalContext: FC = ({ children }) => (
  <HelmetProvider>
    <ReduxProvider store={store}>
      <FranklinSite>
        <Router history={history}>
          <MessagesProvider>
            <DatabaseInfoMapsProvider>{children}</DatabaseInfoMapsProvider>
          </MessagesProvider>
        </Router>
      </FranklinSite>
    </ReduxProvider>
  </HelmetProvider>
);

export default GlobalContext;
