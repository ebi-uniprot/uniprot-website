import { FC } from 'react';

// library context providers
import { HelmetProvider } from 'react-helmet-async';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

// app own context providers
import { MessagesProvider } from '../../shared/contexts/Messages';
import { ToolsProvider } from '../../shared/contexts/Tools';
import { UniProtDataProvider } from '../../shared/contexts/UniProtData';
import { IDMappingDetailsProvider } from '../../shared/contexts/IDMappingDetails';

import ErrorBoundary from '../../shared/components/error-component/ErrorBoundary';

import history from '../../shared/utils/browserHistory';
import { routes } from '../routes/routes';

const router = createBrowserRouter(routes);

const GlobalContext: FC<React.PropsWithChildren<unknown>> = ({ children }) => (
  <RouterProvider router={router} />
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
);

export default GlobalContext;
