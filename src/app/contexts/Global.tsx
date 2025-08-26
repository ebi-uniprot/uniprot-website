import { FC } from 'react';
import { HelmetProvider } from 'react-helmet-async';

import ErrorBoundary from '../../shared/components/error-component/ErrorBoundary';
import { IDMappingDetailsProvider } from '../../shared/contexts/IDMappingDetails';
import { MessagesProvider } from '../../shared/contexts/Messages';
import { UniProtDataProvider } from '../../shared/contexts/UniProtData';

const GlobalContext: FC<React.PropsWithChildren<unknown>> = ({ children }) => (
  <ErrorBoundary>
    <HelmetProvider>
      <MessagesProvider>
        <UniProtDataProvider>
          <IDMappingDetailsProvider>{children}</IDMappingDetailsProvider>
        </UniProtDataProvider>
      </MessagesProvider>
    </HelmetProvider>
  </ErrorBoundary>
);

export default GlobalContext;
