import { ReactNode, ReactElement, FC, HTMLAttributes } from 'react';

import './styles/error-pages.scss';

const ErrorPage: FC<
  {
    artwork: ReactElement;
    message: ReactNode;
  } & HTMLAttributes<HTMLDivElement>
> = ({ artwork, message, ...props }) => (
  <div className="error-page-container" {...props}>
    <artwork.type
      {...artwork.props}
      className="error-page-container__art-work"
    />
    {message}
  </div>
);

export default ErrorPage;
