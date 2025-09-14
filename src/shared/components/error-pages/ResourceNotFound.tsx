import { Message } from 'franklin-sites';
import { HTMLAttributes, useEffect } from 'react';

import { CustomError } from '../../hooks/useDataApi';
import * as logging from '../../utils/logging';
import ErrorComponent from './ErrorComponent';
import ArtWork from './svgs/404.img.svg';

const ErrorMessage = ({ error }: { error?: CustomError }) => {
  useEffect(() => {
    logging.error('client-side 404');
  }, []);

  return (
    <Message level="failure">
      <h4>Sorry, this page can&apos;t be found!</h4>
      <div>Please check the address bar for any mistakes</div>
      {error?.response?.data?.messages?.length ? (
        <div>
          Error message: <em>{error.response.data.messages}</em>
        </div>
      ) : null}
    </Message>
  );
};

type ResourceNotFoundProps = {
  error?: CustomError;
} & HTMLAttributes<HTMLDivElement>;

const ResourceNotFound = ({ error, ...props }: ResourceNotFoundProps) => (
  <ErrorComponent
    {...props}
    artwork={<img src={ArtWork} width="400" height="400" alt="" />}
    data-testid="error-page"
  >
    <ErrorMessage error={error} />
  </ErrorComponent>
);

export default ResourceNotFound;
