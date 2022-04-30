import { FC } from 'react';

// library context providers
import { HelmetProvider } from 'react-helmet-async';
import { FranklinSite } from 'franklin-sites';
import { Router } from 'react-router-dom';

// app own context providers
import { MessagesProvider } from '../../shared/contexts/Messages';
import { ToolsProvider } from '../../shared/contexts/Tools';
import { DatabaseInfoMapsProvider } from '../../shared/contexts/DatabaseInfoMaps';
import { IDMappingDetailsProvider } from '../../shared/contexts/IDMappingDetails';

import ErrorBoundary from '../../shared/components/error-component/ErrorBoundary';

import history from '../../shared/utils/browserHistory';

const GlobalContext: FC = ({ children }) => (
  <Router history={history}>
    {/* If anything bad happen at the top level, try to display something */}
    <ErrorBoundary>
      <HelmetProvider>
        <FranklinSite>
          <MessagesProvider>
            {/* Order is important, tools needs to be within messages */}
            <ToolsProvider>
              <DatabaseInfoMapsProvider>
                <IDMappingDetailsProvider>{children}</IDMappingDetailsProvider>
              </DatabaseInfoMapsProvider>
            </ToolsProvider>
          </MessagesProvider>
        </FranklinSite>
      </HelmetProvider>
    </ErrorBoundary>
  </Router>
);

export default GlobalContext;
