import { FC } from 'react';

import ResourceNotFoundPage from './ResourceNotFoundPage';
import ServiceUnavailablePage from './ServiceUnavailablePage';

const ErrorHandler: FC<{ status?: number }> = ({ status }) => {
  switch (status) {
    case 400:
      return <ResourceNotFoundPage />;
    case 404:
      return <ResourceNotFoundPage />;
    case 500:
    case 503:
    default:
      return <ServiceUnavailablePage />;
  }
};

export default ErrorHandler;
