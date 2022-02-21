import { FC } from 'react';

// library context providers
import { HelmetProvider } from 'react-helmet-async';
import { FranklinSite } from 'franklin-sites';
import { Router } from 'react-router-dom';

// app own context providers
import { MessagesProvider } from '../../shared/contexts/Messages';
import { ToolsProvider } from '../../shared/contexts/Tools';
import { DatabaseInfoMapsProvider } from '../../shared/contexts/DatabaseInfoMaps';

import history from '../../shared/utils/browserHistory';

const GlobalContext: FC = ({ children }) => (
  <HelmetProvider>
    <FranklinSite>
      <Router history={history}>
        <MessagesProvider>
          {/* Order is important, tools needs to be within messages */}
          <ToolsProvider>
            <DatabaseInfoMapsProvider>{children}</DatabaseInfoMapsProvider>
          </ToolsProvider>
        </MessagesProvider>
      </Router>
    </FranklinSite>
  </HelmetProvider>
);

export default GlobalContext;
