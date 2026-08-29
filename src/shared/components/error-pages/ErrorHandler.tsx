import { type HTMLAttributes, lazy, Suspense } from 'react';

import { type CustomError } from '../../hooks/useDataApi';
import { isPermanentStatus } from '../../utils/httpStatus';
import ErrorBoundary from '../error-component/ErrorBoundary';
import HTMLHead from '../HTMLHead';
import NordVPNIssue from './NordVPNIssue';
import ResourceNotFound from './ResourceNotFound';
import ServiceUnavailable from './ServiceUnavailable';

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
  const isPermanent = isPermanentStatus(status);

  let component = <ServiceUnavailable {...props} noReload={noReload} />;
  if (!status) {
    // No status returned and a syntax error... it's likely to be NordVPN issue
    if (error instanceof SyntaxError) {
      component = <NordVPNIssue {...props} />;
    } // else default error component
  } else if (isPermanent) {
    component = <ResourceNotFound error={error} {...props} />;
  }

  if (fullPage) {
    return (
      <>
        {isPermanent && (
          <HTMLHead>
            {/* Only tell a crawler to forget a page when the resource
                genuinely is not there: noindex on a transient error asks
                Google to drop a page that is fine, and Google obliges */}
            <meta name="robots" content="noindex" />
          </HTMLHead>
        )}
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
