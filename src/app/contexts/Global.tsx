import { FC } from 'react';
import { Router } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { FranklinSite } from 'franklin-sites';

import { DatabaseInfoMapsProvider } from '../../shared/contexts/DatabaseInfoMaps';

import history from '../../shared/utils/browserHistory';
import store from '../state/store';

const GlobalContext: FC = ({ children }) => (
  <ReduxProvider store={store}>
    <FranklinSite>
      <Router history={history}>
        <DatabaseInfoMapsProvider>{children}</DatabaseInfoMapsProvider>
      </Router>
    </FranklinSite>
  </ReduxProvider>
);

export default GlobalContext;
