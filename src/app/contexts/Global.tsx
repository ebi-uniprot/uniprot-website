import { FC } from 'react';

// library context providers
import { HelmetProvider } from 'react-helmet-async';
import { FranklinSite } from 'franklin-sites';
import { Router } from 'react-router-dom';

// app own context providers
import { MessagesProvider } from '../../shared/contexts/Messages';
import { ToolsProvider } from '../../shared/contexts/Tools';
import { UniProtDataProvider } from '../../shared/contexts/UniProtData';
import { IDMappingDetailsProvider } from '../../shared/contexts/IDMappingDetails';
import { IsoformsProvider } from '../../shared/contexts/Isoform';

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
              <UniProtDataProvider>
                <IDMappingDetailsProvider>
                  <IsoformsProvider>{children}</IsoformsProvider>
                </IDMappingDetailsProvider>
              </UniProtDataProvider>
            </ToolsProvider>
          </MessagesProvider>
        </FranklinSite>
      </HelmetProvider>
    </ErrorBoundary>
  </Router>
);

export default GlobalContext;
