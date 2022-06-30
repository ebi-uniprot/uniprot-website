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
      // TODO this could be improved, maybe automatic retries or
      // showing a popup message with a timer saying retrying in n seconds
      return <ServiceUnavailablePage />;
  }
};

export default ErrorHandler;
