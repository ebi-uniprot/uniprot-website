import { HTMLAttributes, lazy, Suspense } from 'react';

import HTMLHead from '../HTMLHead';
import ErrorBoundary from '../error-component/ErrorBoundary';
import ResourceNotFound from './ResourceNotFound';
import ServiceUnavailable from './ServiceUnavailable';
import NordVPNIssue from './NordVPNIssue';

import { CustomError } from '../../hooks/useDataApi';

const UniProtFooter = lazy(
  () => import(/* webpackChunkName: "footer" */ '../layouts/UniProtFooter')
);

type ErrorHandlerProps = {
  status?: number;
  error?: CustomError;
  fullPage?: boolean;
  noReload?: boolean;
} & HTMLAttributes<HTMLDivElement>;

const ErrorHandler = ({
  // response status
  status,
  // response error
  error,
  // render the error handler standalone or as a full page
  fullPage,
  // prevent auto-reload for the ServiceUnavailable component
  noReload,
  // props to pass to the underlying divs containing the messages
  ...props
}: ErrorHandlerProps) => {
  let component = <ServiceUnavailable {...props} noReload={noReload} />;
  if (!status) {
    // No status returned and a syntax error... it's likely to be NordVPN issue
    if (error instanceof SyntaxError) {
      component = <NordVPNIssue {...props} />;
    } // else default error component
  } else if (status >= 400 && status < 500) {
    component = <ResourceNotFound error={error} {...props} />;
  }

  if (fullPage) {
    return (
      <>
        <HTMLHead>
          {/* Don't index error pages */}
          <meta name="robots" content="noindex" />
        </HTMLHead>
        {component}
        <ErrorBoundary>
          <Suspense fallback={null}>
            <UniProtFooter />
          </Suspense>
        </ErrorBoundary>
      </>
    );
  }
  return component;
};

export default ErrorHandler;
