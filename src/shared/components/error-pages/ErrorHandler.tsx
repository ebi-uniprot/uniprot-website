import { HTMLAttributes } from 'react';

import ResourceNotFoundPage from './ResourceNotFoundPage';
import ServiceUnavailablePage from './ServiceUnavailablePage';

type ErrorHandlerProps = { status?: number } & HTMLAttributes<HTMLDivElement>;

const ErrorHandler = ({ status, ...props }: ErrorHandlerProps) => {
  switch (status) {
    case 400:
      return <ResourceNotFoundPage {...props} />;
    case 404:
      return <ResourceNotFoundPage {...props} />;
    case 500:
    case 503:
    default:
      return <ServiceUnavailablePage {...props} />;
  }
};

export default ErrorHandler;
