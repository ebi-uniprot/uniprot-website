import { FC } from 'react';

// library context providers
import { HelmetProvider } from 'react-helmet-async';

// app own context providers
import { MessagesProvider } from '../../shared/contexts/Messages';
import { ToolsProvider } from '../../shared/contexts/Tools';
import { UniProtDataProvider } from '../../shared/contexts/UniProtData';
import { IDMappingDetailsProvider } from '../../shared/contexts/IDMappingDetails';

import ErrorBoundary from '../../shared/components/error-component/ErrorBoundary';

import history from '../../shared/utils/browserHistory';

const GlobalContext: FC<React.PropsWithChildren<unknown>> = ({ children }) => (
  <HelmetProvider>
    <MessagesProvider>
      <UniProtDataProvider>
        <IDMappingDetailsProvider>{children}</IDMappingDetailsProvider>
      </UniProtDataProvider>
    </MessagesProvider>
  </HelmetProvider>
);
// * If anything bad happen at the top level, try to display something */}
// <ErrorBoundary>
//   <HelmetProvider>
//     <MessagesProvider>
//       {/* Order is important, tools needs to be within messages */}
//       <ToolsProvider>
//         <UniProtDataProvider>
//           <IDMappingDetailsProvider>{children}</IDMappingDetailsProvider>
//         </UniProtDataProvider>
//       </ToolsProvider>
//     </MessagesProvider>
//   </HelmetProvider>
// </ErrorBoundary>
// </RouterProvider>

export default GlobalContext;
