import React, { ReactNode, ReactElement } from 'react';

import './styles/error-pages.scss';

const ErrorPage: React.FC<{
  artwork: ReactElement;
  message: ReactNode;
  testid?: string;
}> = ({ artwork, message, testid }) => (
  <div className="error-page-container" data-testid={testid || ''}>
    <artwork.type
      {...artwork.props}
      className="error-page-container__art-work"
    />
    {message}
  </div>
);

export default ErrorPage;
